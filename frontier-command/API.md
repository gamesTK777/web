# Frontier Command engine integration

`engine.mjs` is dependency-free ESM. Rules and AI do not access the DOM, audio, clock, network, or storage.

## State

`createGame({missionId:1,difficulty:'normal',mode:'cpu'})` returns a fresh JSON state. IDs 1–5 accept strings or numbers. Difficulty is `easy | normal | hard`; mode is `cpu | local`. The UI handles which team is human.

- `width`, `height`, flat `tiles[y*width+x]` with `{terrain,building,owner,capture,capturingTeam,capturingUnitId}`. Terrain: `plain,road,forest,mountain,river,bridge,sea`. Building: `null,city,factory,hq,airfield`. Owner: `null,0,1`. `capture` is remaining resistance, normally 20; capturing progress is cleared if that infantry leaves or dies.
- `units`: `{id,type,team,x,y,hp,moved,acted}`; HP is integer 1–10. `turn` is active team 0/1. Team 0 is player/blue. New units are acted and activate next friendly turn.
- `day` starts at 1 and increments when turn returns to 0. `turnNumber` increments every handoff. `funds:[team0,team1]`.
- `winner:null|0|1`, `victoryReason`, `difficulty`, `mode`, `missionId`, `idSeq`, `stats:[{lost,destroyed,captured,spent,income},...]`, `log` (last 70 short Japanese lines), `lastEvent`.

## Queries

- `MISSIONS`: array of `{id,name,subtitle,briefing,objective,hint,width,height,funds,allowedUnits,parDays}`.
- `UNIT_TYPES[type]`: `{name,short,cost,move,movement,range:[min,max],domain:'ground'|'air',description,capture?,indirect?}`.
- `TERRAIN[type]`, `BUILDINGS[type]`: Japanese name and defense (buildings also income).
- `tileAt(state,x,y)` / `unitAt(state,x,y)` return a tile/unit or null.
- `currentTeam(state)` returns `state.turn`.
- `getIncome(state,team)` / `incomeFor(state,team)` return next turn's gross income.
- `getReachable(state,unitId)` returns `[{x,y,cost,path:[{x,y}]}]`, including the origin. Friendly units may be passed, but not occupied as destinations. Enemy ground units block ground paths. Air can cross any terrain or unit but cannot share a destination. Once moved, only the origin is returned; an acted or enemy unit gives `[]`.
- `getAttackTargets(state,unitId)` returns `[{id,targetId,x,y,type,hp,damage,counter,canAttack,defeated}]`.
- `damagePreview(state,attackerId,targetId,{from?,moved?})` returns the same damage fields; use optional `from:{x,y}` for a hypothetical position. Movement and action eligibility are enforced by `applyAction` and `getAttackTargets`.
- `canCapture(state,unitId)` is true only for actionable friendly infantry on a hostile/neutral property.
- `getProduction(state,x,y)` returns an array of permitted types `{type,...UNIT_TYPES[type],available,affordable,blocked,reason}`. Unavailable entries carry Japanese reasons. HQ and factories produce ground units, airfields produce aircraft, and cities return an empty array. Each mission's allowed unit list still applies.
- `getLegalActions(state,unitId)` returns action objects for that unit, including wait.
- `defenseAt(state,x,y,unitType)` returns defense fraction (air gets no terrain cover).
- `scoreFor(state,team=0)` returns campaign result score from victory, efficiency, captures, surviving HP, and days.

## Mutations

`applyAction(state,action)` never mutates its input. It returns `{ok,state,error,event}`. On error, `ok:false`, original state is returned, and `error` is a Japanese string. Convenience `endTurn(state)` returns the same result shape.

Actions:

```js
{type:'move',unitId,x,y}
{type:'attack',unitId,targetId}
{type:'capture',unitId}
{type:'wait',unitId}
{type:'produce',x,y,unitType}
{type:'endTurn'}
```

Move leaves a unit unacted so the UI can next offer attack/capture/wait. It cannot move twice. Attack/capture/wait end that unit's day. Artillery cannot attack after moving. Direct-fire survivors counter once if their weapon can target the attacker. Aircraft remain attackable by correct weapons on any terrain.

On handoff, the next team receives income and owned facilities repair up to 2 HP for cost per HP equal to 10% of the unit's price, if affordable. Ground units repair on owned city/factory/HQ; air repairs only on owned airfields. Capturing an HQ ends the match immediately. An army with no units stays in the game if it still has an available production facility; suppressing all its facilities as well wins.

Events: `move` has `from,to,path`; `attack` has `from,to,damage,counter,destroyed:[id...],winner`; `capture` has `x,y,amount,remaining,captured,building,winner`; `produce` has `unitId,unitType,x,y,cost`; `endTurn` has `from,to,day,income,repairs:[{unitId,amount,cost}],winner`; `wait` has `unitId,x,y`. `team` is included where relevant.

## AI and saves

`planAIAction(state,difficulty=state.difficulty)` returns one legal action, including `{type:'endTurn'}` after all meaningful actions. It returns null only for a finished match. It supports either side, so simulations/hotseat hints can use it. Apply it, animate, then call it again; do not compute a whole turn in one blocking loop in the UI. A defensive UI action cap of 120 per turn is comfortably above the 40-unit global limit.

`serializeGame(state)` returns a versioned JSON string. `deserializeGame(string)` returns a cloned state directly and **throws** a Japanese Error on malformed/incompatible data. It accepts either the serialized envelope or a raw JSON state. `validateGame(object)` returns `{valid,errors}` without mutation. Save strings larger than 250 KB, bad coordinates/HP/types, duplicate IDs/positions, invalid turn/funds/terrain, and incompatible versions are rejected.
