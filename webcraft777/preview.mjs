// Standalone localhost preview of the release build. No npm install required.
import { createServer } from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve, sep, extname } from 'node:path'
import { spawn } from 'node:child_process'
import { Readable } from 'node:stream'

const root=fileURLToPath(new URL('./play/',import.meta.url))
if(!existsSync(resolve(root,'index.html'))){console.error('公開用ビルドがありません。先に npm run build を実行してください。');process.exit(1)}
const prefix='/webcraft777/play/'
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon','.txt':'text/plain; charset=utf-8'}
const port=Number(process.env.WEBCRAFT_PORT || 8782)
let gameUrl='http://127.0.0.1:'+port+prefix
const online=process.argv.includes('--online')
let localRooms
if(online){
  try {
    const [{createLocalRoomDb},{handleWebcraft}]=await Promise.all([
      import('./online/sqlite-d1.mjs'), import('./online/room-service.mjs'),
    ])
    const {db,close}=createLocalRoomDb()
    localRooms={db,close,handleWebcraft}
  }catch(error){
    if(error.code==='ERR_UNKNOWN_BUILTIN_MODULE')
      console.error('マルチプレイのローカル起動には Node.js 22.13 以降が必要です。22.12 では node --experimental-sqlite preview.mjs --online を実行してください。')
    else console.error('ルームサーバーの起動に失敗しました。'+error.message)
    process.exit(1)
  }
}

const openWindow=()=>spawn('explorer.exe',[gameUrl],{stdio:'ignore',windowsHide:true}).unref()
async function serveRoom(req,res,path){
  try{
    const headers=new Headers()
    for(const [key,value] of Object.entries(req.headers)){
      if(Array.isArray(value))for(const item of value)headers.append(key,item)
      else if(value!==undefined)headers.set(key,value)
    }
    const body=['GET','HEAD','OPTIONS'].includes(req.method)?undefined:Readable.toWeb(req)
    const url=new URL(path,'http://127.0.0.1:'+req.socket.localPort)
    const request=new Request(url,{method:req.method,headers,body,duplex:'half'})
    const response=await localRooms.handleWebcraft(request,localRooms.db)
    res.writeHead(response.status,Object.fromEntries(response.headers))
    res.end(new Uint8Array(await response.arrayBuffer()))
  }catch{
    if(res.headersSent){res.destroy();return}
    res.writeHead(503,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'})
    res.end(JSON.stringify({error:'ローカルのルームサーバーに接続できません。'}))
  }
}
const server=createServer((req,res)=>{
  const send=(code,body)=>{res.writeHead(code,{'Content-Type':'text/plain; charset=utf-8'});res.end(body)}
  let path
  try{path=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{send(400,'URLが正しくありません');return}
  if(path.startsWith('/api/webcraft/')&&localRooms){void serveRoom(req,res,path);return}
  if(!['GET','HEAD'].includes(req.method)){send(405,'未対応のメソッド');return}
  if(path==='/index.html'){res.writeHead(302,{Location:'https://gamestk777.github.io/web/'});res.end();return}
  if(path==='/'){res.writeHead(302,{Location:prefix});res.end();return}
  if(!path.startsWith(prefix)){send(404,'ページが見つかりません');return}
  const file=resolve(root,path.slice(prefix.length)||'index.html')
  if(!file.startsWith(resolve(root)+sep)||!Object.hasOwn(types,extname(file))){send(404,'ページが見つかりません');return}
  try{
    const stat=statSync(file)
    if(!stat.isFile())throw Error()
    res.writeHead(200,{'Content-Type':types[extname(file)],'Content-Length':stat.size,'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff',
      ...(localRooms?{'X-WebCraft-Local-Online':'1'}:{})})
    if(req.method==='HEAD'){res.end();return}
    createReadStream(file).on('error',()=>res.destroy()).pipe(res)
  }catch{send(404,'ファイルが見つかりません')}
})
server.on('error',async err=>{
  if(err.code==='EADDRINUSE' && process.platform==='win32' && process.argv.includes('--open')){
    try{
      const existing=await fetch(gameUrl,{redirect:'error',signal:AbortSignal.timeout(1600)})
      if(existing.ok && (!online || existing.headers.get('X-WebCraft-Local-Online')==='1') &&
         (await existing.text()).includes('<title>ウェブクラフト777 | TK777 ARCADE</title>')){
        openWindow()
        return
      }
    }catch{}
  }
  console.error(err.code==='EADDRINUSE'?'このポートはすでに使用中です。起動済みのゲーム、または別のWEBCRAFT_PORTを使用してください。':err.message)
  process.exitCode=1
})
server.on('close',()=>localRooms?.close())
server.listen(port,'127.0.0.1',()=>{
  gameUrl='http://127.0.0.1:'+server.address().port+prefix
  console.log('ウェブクラフト777　'+gameUrl+(localRooms?'　マルチプレイ試遊':'')+'　（終了は Ctrl+C）')
  if(process.platform==='win32'&&process.argv.includes('--open'))openWindow()
})
