import type { AnvilHits, AnvilMoves } from '@/data/tfc/anvilTypes'
import { useEffect, useMemo, useRef, useState } from 'react'
import AnvilButtons from './AnvilButtons'

type LastHits = [AnvilHits | 0, AnvilHits | 0, AnvilHits | 0]

const sprites = [
  '/tfc-icons/shrink.png',
  '/tfc-icons/upset.png',
  '/tfc-icons/bend.png',
  '/tfc-icons/punch.png',
  '/tfc-icons/light_hit.png',
  '/tfc-icons/medium_hit.png',
  '/tfc-icons/hard_hit.png',
  '/tfc-icons/draw.png',
]

const spritesFromHits: { [hit in AnvilHits]: string } = {
  16: '/tfc-icons/shrink.png',
  13: '/tfc-icons/upset.png',
  7: '/tfc-icons/bend.png',
  2: '/tfc-icons/punch.png',
  '-3': '/tfc-icons/light_hit.png',
  '-6': '/tfc-icons/medium_hit.png',
  '-9': '/tfc-icons/hard_hit.png',
  '-15': '/tfc-icons/draw.png',
}

function asyncImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export default function TFCAnvil({
  optimalPattern,
}: {
  optimalPattern: AnvilMoves[]
}) {
  const [lastHit, setLastHit] = useState<LastHits>([0, 0, 0])
  const [target, setTarget] = useState(0)
  const [hoverTarget, setHoverTarget] = useState<null | number>(null)

  const canvas = useRef<HTMLCanvasElement>(null)
  const board = useRef<HTMLImageElement>(null)
  const marker = useRef<HTMLImageElement>(null)

  // initialize canvas
  useEffect(() => {
    if (!canvas.current) return
    const ctx = canvas.current.getContext('2d')
    if (!ctx) return

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(6, 6)
    ctx.imageSmoothingEnabled = false
  }, [canvas])

  // canvas update function
  async function renderCanvas() {
    if (!canvas.current) return
    const ctx = canvas.current.getContext('2d')
    if (!ctx) return

    if (!board.current) {
      board.current = await asyncImage('/tfc-icons/board.png')
    }
    if (!marker.current) {
      marker.current = await asyncImage('/tfc-icons/marker.png')
    }

    ctx.drawImage(board.current, 0, 0, 152, 32)

    if (hoverTarget && target !== hoverTarget) {
      ctx.drawImage(marker.current, hoverTarget + 1, 7, 5, 5)
      ctx.drawImage(marker.current, target + 1, 5, 5, 5)
    } else {
      ctx.drawImage(marker.current, target + 1, 7, 5, 5)
    }
  }

  useEffect(() => {
    renderCanvas()
  }, [target, hoverTarget])

  const hits = useMemo<AnvilMoves>(() => {
    const offset = lastHit[0] + lastHit[1] + lastHit[2]
    const offsetTarget = target - offset
    return optimalPattern[offsetTarget + 48] ?? [0, 0, 0, 0, 0, 0, 0, 0]
  }, [lastHit, target])

  return (
    <div style={{ margin: 'auto', width: 'fit-content' }}>
      <div
        style={{
          background: '#c6c6c6',
          padding: 4,
          paddingTop: 16,
          paddingBottom: 16,
          marginBottom: 8,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <AnvilButtons
            selected={lastHit[2]}
            onPress={(hit) => setLastHit([lastHit[0], lastHit[1], hit])}
            bottomIcon="/tfc-icons/last.png"
          />
          <AnvilButtons
            selected={lastHit[1]}
            onPress={(hit) => setLastHit([lastHit[0], hit, lastHit[2]])}
            bottomIcon="/tfc-icons/second.png"
          />
          <AnvilButtons
            selected={lastHit[0]}
            onPress={(hit) => setLastHit([hit, lastHit[1], lastHit[2]])}
            bottomIcon="/tfc-icons/first.png"
          />
        </div>
        <div style={{ marginTop: 16, position: 'relative' }}>
          <canvas
            ref={canvas}
            width={152 * 6}
            height={32 * 6}
            style={{ imageRendering: 'pixelated' }}
            onMouseLeave={() => setHoverTarget(null)}
            onMouseMove={(e) => {
              if (!canvas.current) return
              const bounding = canvas.current.getBoundingClientRect()
              const x = (e.clientX - bounding.left) / 6
              const newTarget = Math.floor(x - 3)
              setHoverTarget(newTarget)
              if (e.buttons & 1) setTarget(newTarget)
            }}
            onClick={(e) => {
              if (!canvas.current) return
              const bounding = canvas.current.getBoundingClientRect()
              const x = (e.clientX - bounding.left) / 6
              setTarget(Math.floor(x - 3))
            }}
          />
          <div
            style={{
              display: 'flex',
              gap: 8,
              width: 152 * 6 - 32,
              margin: 'auto',
            }}
          >
            <input
              type="range"
              value={String(target)}
              onChange={(e) => setTarget(Number(e.target.value))}
              max="145"
              style={{ width: '100%' }}
            />
            <input
              type="number"
              value={String(target)}
              onChange={(e) => {
                const n = Number(e.target.value)
                if (Number.isNaN(n)) return
                if (n < 0) {
                  setTarget(0)
                } else if (n > 145) {
                  setTarget(145)
                } else {
                  setTarget(n)
                }
              }}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: 16,
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            justifyContent: 'center',
            color: 'black',
            fontSize: 24,
          }}
        >
          {hits.map((count, index) =>
            count == 0 ? undefined : (
              <>
                <img key={index} src={sprites[index]} width={64} />
                {count > 1 && (
                  <div
                    style={{
                      width: 32,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <div>x{count}</div>
                  </div>
                )}
              </>
            ),
          )}
          {lastHit.map((hit, index) =>
            hit === 0 ? undefined : (
              <img key={index} src={spritesFromHits[hit]} width={64} />
            ),
          )}
        </div>
      </div>
      <section>
        <aside style={{ width: '100%', maxWidth: '100%' }}>
          <p>
            Input the 3 final hits (if required), the red target position (by
            clicking on the bar, the slider, or manual input), and hammer the
            sequence on the bottom from left to right.
          </p>
          <p>
            Assets "borrowed" from{' '}
            <a href="https://www.curseforge.com/minecraft/texture-packs/tfc-anvil-helper">
              absolutespiceball
            </a>
            .
          </p>
        </aside>
      </section>
    </div>
  )
}
