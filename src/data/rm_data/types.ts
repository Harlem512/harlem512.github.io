/** A point on the map */
export type Point = [x: number, y: number]

/** A rectangle on the map */
export type BBox = [...Point, w: number, h: number]

/** Room borders. dw and dh are the tile dimension - room dimension */
export type RoomBox = [
  ...BBox,
  dw: number,
  dh: number,
  color: number,
  popup: string,
]

/** Custom marker, `u` is a partial image url (ie `user`) */
export type UrlMarker = [...Point, u: string]

export type AllData = {
  rooms: RoomBox[]
  transition: BBox[]
  arena: BBox[]
  pit: BBox[]
  lore: Point[]
  hp: Point[]
  mp: Point[]
  flag: Point[]
  dmg: Point[]
  backpack: Point[]
  chest: Point[]
  save: Point[]
  warp: Point[]
  other: UrlMarker[]
  trinket: Point[]
  upgrade: UrlMarker[]
  boss: UrlMarker[]
  colors: string[]
}

export type CustomData = {
  x: number
  y: number
  img: string
  layer: keyof AllData
}
