export enum AnvilHits {
  SHRINK = 16,
  UPSET = 13,
  BEND = 7,
  PUNCH = 2,
  LIGHT_HIT = -3,
  MEDIUM_HIT = -6,
  HARD_HIT = -9,
  DRAW = -15,
}

export type AnvilMoves = [
  shrink: number,
  upset: number,
  bend: number,
  punch: number,
  light_hit: number,
  medium_hit: number,
  hard_hit: number,
  draw: number,
]
