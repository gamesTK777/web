// Presentation state shared by solo play and synchronized online tables.
export function turnIdentity(game) {
  if (!game || game.phase !== 'playing') return '';
  // Drawing a playable card keeps the top card; two-player skips change it.
  return `${game.currentPlayerId}:${game.topCard?.id || ''}`;
}

export function gameFeedback(game, selfId, { armed = false, busy = false, blocked = false } = {}) {
  const playing = game?.phase === 'playing';
  const ownTurn = Boolean(playing && game.currentPlayerId === selfId);
  const count = game?.hand?.length || 0;
  const canAct = ownTurn && !busy && !blocked;
  const unoAvailable = ownTurn && count === 2;
  const selected = Boolean(armed && unoAvailable);
  const currentName = game?.players?.find(player => player.id === game.currentPlayerId)?.name || '相手';
  const turnState = !playing ? 'finished' : blocked ? 'blocked' : busy ? 'updating' : ownTurn ? 'self' : 'waiting';
  const turnTitle = !playing ? 'ゲーム終了' : blocked ? '接続を確認しています' : busy ? '操作を送信しています…' : ownTurn ? 'あなたの番です' : `${currentName}さんの番です`;
  const turnHint = !playing ? 'もう一度、対戦できます。' : blocked ? '再接続すると操作できます。' : busy ? '反映が終わるまでお待ちください。' : !ownTurn ? 'あなたの番になるまでお待ちください。' : unoAvailable ? selected ? '✓ UNO選択済み。カードを出すと宣言します。' : '手札は2枚。UNO!を押してから出そう。' : game.canPass ? '引いたカードを出すか、パスを選んでください。' : game.legalCardIds?.length ? '光っているカードを選んで出そう。' : '出せるカードがありません。山札から1枚引こう。';
  const unoState = selected ? 'armed' : unoAvailable ? 'available' : 'inactive';
  const unoLabel = selected ? '選択済み' : unoAvailable ? '未選択' : !playing ? '対戦終了' : count === 2 ? '相手の番' : count === 1 ? '残り1枚' : '手札2枚で選択';
  const unoHint = selected ? '次の1枚で宣言' : unoAvailable ? '出す前にタップ' : count === 1 && playing ? 'あと1枚で勝利！' : count === 2 && playing ? '自分の番に選べます' : '残り1枚になる前に';
  return { ownTurn, canAct, armed: selected, unoAvailable, turnState, turnTitle, turnHint, unoState, unoLabel, unoHint };
}
