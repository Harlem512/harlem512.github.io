import { AnvilHits, type AnvilMoves } from './anvilTypes'

function offsetFromMoves(moves: AnvilMoves) {
  return (
    moves[0] * AnvilHits.SHRINK +
    moves[1] * AnvilHits.UPSET +
    moves[2] * AnvilHits.BEND +
    moves[3] * AnvilHits.PUNCH +
    moves[4] * AnvilHits.LIGHT_HIT +
    moves[5] * AnvilHits.MEDIUM_HIT +
    moves[6] * AnvilHits.HARD_HIT +
    moves[7] * AnvilHits.DRAW
  )
}

function calculateBest(end: number): AnvilMoves {
  console.log(end)

  const modifiedEnd = end

  let best: undefined | AnvilMoves = undefined
  let bestLen = -1
  const current: AnvilMoves = [0, 0, 0, 0, 0, 0, 0, 0]

  // loop over every possible combination
  while (true) {
    // const currentOffset = offsetFromMoves(current)

    // increment
    current[7]++
    // -15
    if (current[7] > 4) {
      current[7] = 0
      current[6]++
    }
    // -9
    // 5*-9 = 3*-15
    if (current[6] > 5) {
      current[6] = 0
      current[5]++
    }
    // -6
    // 3*-6 = 2*-9
    if (current[5] > 3) {
      current[5] = 0
      current[4]++
    }
    // -3
    // 2*-3 = 1*-6
    if (current[4] > 2) {
      current[4] = 0
      current[3]++
    }
    // 2
    // 8*2 = 1*16
    if (current[3] > 8) {
      current[3] = 0
      current[2]++
    }
    // 7
    // 150/7 = 22
    if (current[2] > 22) {
      current[2] = 0
      current[1]++
    }
    // 13
    // 150/13 = 12
    if (current[1] > 12) {
      current[1] = 0
      current[0]++
    }
    // 16
    // 150/16 = 12
    if (current[0] > 10) {
      break
    }

    if (offsetFromMoves(current) !== modifiedEnd) continue

    const newLen = current.reduce((acc, n) => acc + n, 0)
    if (best === undefined || bestLen > newLen) {
      best = [...current]
      bestLen = newLen
    }
  }

  return best ?? [0, 0, 0, 0, 0, 0, 0, 0]
}

export function TFC_BUILD_BEST() {
  console.log('start')
  // -48 -> 184
  const bestMoves = new Array(145 + 15 * 3 + 16 * 3)
    .fill(0)
    .map((_, index) => calculateBest(index - 48))
  console.log('end')
  console.log(JSON.stringify(bestMoves))
}
