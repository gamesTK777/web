import * as T from 'three'
import { KidsAvatar } from './kids-avatar'
import { createPlayer, type Player } from './physics'
import type { NetPose, RoomPlayer } from './online-client'
import { tagNameVisible } from './tag-visibility'
import type { World } from './world'

type Actor = { avatar:KidsAvatar; body:Player; label:T.Sprite; caption:string; goal:NetPose }

function nameTag(name:string) {
  const canvas=document.createElement('canvas')
  canvas.width=512;canvas.height=96
  const ctx=canvas.getContext('2d')!
  ctx.font='bold 46px system-ui, sans-serif'
  const width=Math.min(490,Math.ceil(ctx.measureText(name).width)+50)
  const left=(canvas.width-width)/2
  ctx.fillStyle='#142e29eb';ctx.beginPath()
  if(ctx.roundRect)ctx.roundRect(left,12,width,72,22)
  else ctx.rect(left,12,width,72)
  ctx.fill()
  ctx.strokeStyle='#eec983';ctx.lineWidth=3;ctx.stroke()
  ctx.fillStyle='#fff6d9';ctx.textAlign='center';ctx.textBaseline='middle'
  ctx.fillText(name,256,49,width-34)
  const texture=new T.CanvasTexture(canvas)
  texture.colorSpace=T.SRGBColorSpace
  const sprite=new T.Sprite(new T.SpriteMaterial({map:texture,transparent:true,depthWrite:false,toneMapped:false}))
  sprite.scale.set(3.35,.63,1)
  return sprite
}

export class OnlineActors {
  private readonly actors=new Map<string,Actor>()
  private readonly sample=new T.Vector3()
  constructor(private readonly scene:T.Scene) {}

  setPlayers(players:RoomPlayer[],it:string|null=null) {
    const seen=new Set<string>()
    for(const peer of players) {
      seen.add(peer.id)
      const caption=peer.id===it?'鬼 '+peer.nickname:peer.nickname
      let actor=this.actors.get(peer.id)
      if(!actor) {
        const avatar=new KidsAvatar(),label=nameTag(caption)
        avatar.group.visible=true
        avatar.group.name='online-player'
        avatar.group.add(label);this.scene.add(avatar.group)
        actor={avatar,label,caption,body:createPlayer({...peer.pose,pitch:0}),goal:peer.pose}
        this.actors.set(peer.id,actor)
      }else if(actor.caption!==caption){
        this.releaseLabel(actor.label)
        actor.label=nameTag(caption)
        actor.caption=caption
        actor.avatar.group.add(actor.label)
      }
      actor.goal=peer.pose
    }
    for(const [id,actor] of this.actors)if(!seen.has(id))this.release(id,actor)
  }

  animate(dt:number,daylight:number,world:World,camera?:T.PerspectiveCamera) {
    for(const {body,goal,avatar,label} of this.actors.values()) {
      const jump=Math.hypot(goal.x-body.x,goal.y-body.y,goal.z-body.z)>12
      const amount=jump||dt===0 ? 1 : 1-Math.exp(-6*dt)
      body.x+=(goal.x-body.x)*amount
      body.y+=(goal.y-body.y)*amount
      body.z+=(goal.z-body.z)*amount
      const turn=goal.yaw-body.yaw
      body.yaw+=Math.atan2(Math.sin(turn),Math.cos(turn))*amount
      body.crouched=goal.crouched
      body.flying=goal.flying
      body.grounded=!goal.flying
      body.vx=goal.moving ? 3.3 : 0
      label.position.y=goal.crouched ? 1.23 : 2.02
      avatar.update(body,dt,false,daylight)
      label.visible=!camera||tagNameVisible(world,camera,body,this.sample)
    }
  }

  dispose() {
    for(const [id,actor] of this.actors)this.release(id,actor)
  }
  private release(id:string,{avatar,label}:Actor) {
    this.releaseLabel(label)
    avatar.dispose()
    this.actors.delete(id)
  }
  private releaseLabel(label:T.Sprite){
    label.removeFromParent();label.material.map?.dispose();label.material.dispose()
  }
}
