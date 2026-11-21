export const PARK_RIDE_REACH: 5
export type ParkRideId = 'swings' | 'seesaw'
export type ParkRideAnchor = Readonly<{x:number;y:number;z:number;capacity:number}>
export const PARK_RIDES: Readonly<Record<ParkRideId,ParkRideAnchor>>
