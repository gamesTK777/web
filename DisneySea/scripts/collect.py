#!/usr/bin/env python3
"""
TDS Wait Time Collector
GitHub Actionsから10分ごとに実行し、Queue-Times APIからデータを収集して
data/YYYY-MM-DD.json に蓄積する。
また data/index.json に利用可能な日付一覧を保持する。
"""

import json
import os
import sys
from datetime import datetime, timezone, timedelta

import requests

# ===== 設定 =====
PARK_ID = 275  # Tokyo DisneySea
API_URL = f"https://queue-times.com/parks/{PARK_ID}/queue_times.json"
JST = timezone(timedelta(hours=9))
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'data')

# 日本語名マッピング（Queue-TimesのAPI名 → 日本語）
NAME_JP = {
    "20,000 Leagues Under the Sea": "海底2万マイル",
    "Anna and Elsa's Frozen Journey": "アナとエルサのフローズンジャーニー",
    "Aquatopia": "アクアトピア",
    "Big City Vehicles": "ビッグシティ・ヴィークル",
    "Blowfish Balloon Race": "ブローフィッシュ・バルーンレース",
    "Caravan Carousel": "キャラバンカルーセル",
    "Fairy Tinker Bell's Busy Buggies": "ティンカーベルのビジーバギー",
    "Flounder's Flying Fish Coaster": "フランダーのフライングフィッシュコースター",
    "Indiana Jones Adventure: Temple of the Crystal Skull": "インディ・ジョーンズ・アドベンチャー",
    "Jasmine's Flying Carpets": "ジャスミンのフライングカーペット",
    "Journey to the Center of the Earth": "センター・オブ・ジ・アース",
    "Jumpin' Jellyfish": "ジャンピン・ジェリーフィッシュ",
    "Mermaid Lagoon Theater": "マーメイドラグーンシアター",
    "Nemo & Friends SeaRider": "ニモ&フレンズ・シーライダー",
    "Peter Pan's Never Land Adventure": "ピーターパンのネバーランドアドベンチャー",
    "Raging Spirits": "レイジングスピリッツ",
    "Rapunzel's Lantern Festival": "ラプンツェルのランタンフェスティバル",
    "Scuttle's Scooters": "スカットルのスクーター",
    "Sindbad's Storybook Voyage": "シンドバッド・ストーリーブック・ヴォヤッジ",
    "Soaring: Fantastic Flight": "ソアリン：ファンタスティック・フライト",
    "The Magic Lamp Theater": "マジックランプシアター",
    "The Whirlpool": "ワールプール",
    "Tower of Terror": "タワー・オブ・テラー",
    "Toy Story Mania!": "トイ・ストーリー・マニア！",
    "Turtle Talk": "タートル・トーク",
    "Venetian Gondolas": "ヴェネツィアン・ゴンドラ",
}

# エリア推定
AREA_KEYWORDS = {
    "ファンタジースプリングス": ["frozen", "rapunzel", "peter pan", "tinker bell", "fairy"],
    "メディテレーニアンハーバー": ["soaring", "venetian", "fortress"],
    "アメリカンウォーターフロント": ["tower of terror", "toy story", "big city", "turtle talk", "electric railway.*american"],
    "ロストリバーデルタ": ["indiana jones", "raging spirits"],
    "アラビアンコースト": ["jasmine", "sindbad", "caravan", "magic lamp"],
    "マーメイドラグーン": ["mermaid", "flounder", "blowfish", "scuttle", "jumpin", "whirlpool"],
    "ミステリアスアイランド": ["center of the earth", "20,000 leagues"],
    "ポートディスカバリー": ["aquatopia", "nemo"],
}


def guess_area(name: str) -> str:
    name_lower = name.lower()
    for area, keywords in AREA_KEYWORDS.items():
        for kw in keywords:
            if kw in name_lower:
                return area
    return ""


def collect():
    now = datetime.now(JST)

    # TDS営業時間外なら収集しない（8:00-22:00 JST）
    hour = now.hour
    if hour < 8 or hour >= 22:
        print(f"[{now.isoformat()}] Outside park hours ({hour}:xx JST), skipping.")
        return

    # Queue-Times API からデータ取得
    print(f"[{now.isoformat()}] Fetching data from Queue-Times API...")
    try:
        resp = requests.get(API_URL, timeout=30, headers={
            "User-Agent": "TDS-Dashboard-Collector/1.0"
        })
        resp.raise_for_status()
        data = resp.json()
    except Exception as e:
        print(f"ERROR: Failed to fetch API: {e}", file=sys.stderr)
        sys.exit(1)

    # ライドデータを抽出
    rides = []
    for land in data.get("lands", []):
        for ride in land.get("rides", []):
            name_en = ride.get("name", "")
            rides.append({
                "name": NAME_JP.get(name_en, name_en),
                "name_en": name_en,
                "area": guess_area(name_en),
                "wait": ride.get("wait_time", 0),
                "open": ride.get("is_open", False),
            })

    # 集計
    open_rides = [r for r in rides if r["open"]]
    waits = [r["wait"] for r in open_rides if r["wait"] > 0]
    avg_wait = round(sum(waits) / len(waits)) if waits else 0
    max_wait = max(waits) if waits else 0

    # スナップショット作成
    snapshot = {
        "timestamp": now.isoformat(),
        "date": now.strftime("%Y-%m-%d"),
        "time": now.strftime("%H:%M"),
        "avgWait": avg_wait,
        "maxWait": max_wait,
        "openCount": len(open_rides),
        "totalCount": len(rides),
        "parkOpen": len(open_rides) > 0 and avg_wait > 0,
        "rides": rides,
    }

    # データディレクトリ確認
    os.makedirs(DATA_DIR, exist_ok=True)
    date_str = now.strftime("%Y-%m-%d")
    filepath = os.path.join(DATA_DIR, f"{date_str}.json")

    # 既存データを読み込みまたは新規作成
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            daily_data = json.load(f)
    else:
        daily_data = []

    # 重複チェック（同じ分のデータがあればスキップ）
    time_str = now.strftime("%H:%M")
    if any(s.get("time") == time_str for s in daily_data):
        print(f"[{now.isoformat()}] Data for {time_str} already exists, skipping.")
        return

    daily_data.append(snapshot)

    # 日次ファイルに保存
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(daily_data, f, ensure_ascii=False, separators=(",", ":"))

    print(f"[{now.isoformat()}] Saved: {len(rides)} rides, avg={avg_wait}min, max={max_wait}min, open={len(open_rides)}/{len(rides)}")
    print(f"  File: {filepath} ({len(daily_data)} snapshots)")

    # index.json を更新（利用可能な日付一覧）
    update_index()


def update_index():
    """data/index.json に利用可能な日付一覧を保存"""
    dates = sorted([
        f.replace(".json", "")
        for f in os.listdir(DATA_DIR)
        if f.endswith(".json") and f != "index.json"
    ])

    index_path = os.path.join(DATA_DIR, "index.json")
    with open(index_path, "w", encoding="utf-8") as f:
        json.dump({"dates": dates, "updated": datetime.now(JST).isoformat()}, f, ensure_ascii=False)

    print(f"  Index updated: {len(dates)} dates available")


if __name__ == "__main__":
    collect()
