export interface ChaseStamina {
  energy: number
  rest: number
  exhausted: boolean
}

export const CHASE_WALK_SPEED: number
export const STAMINA_RECOVERY_DELAY: number
export function chaseSprintSpeed(mode: 'tag' | 'cops', isIt?: boolean): number
export function createStamina(): ChaseStamina
export function advanceStamina(state: ChaseStamina, wantsSprint: boolean, elapsed: number): boolean
