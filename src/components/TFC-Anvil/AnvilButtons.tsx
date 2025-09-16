import { AnvilHits } from '../../data/tfc/anvilTypes'

export default function AnvilButtons({
  selected,
  onPress,
  bottomIcon,
}: {
  selected: AnvilHits | 0
  onPress: (hit: AnvilHits | 0) => void
  bottomIcon: string
}) {
  function AnvilButton({ src, hit }: { src: string; hit: AnvilHits }) {
    return (
      <button onClick={() => onPress(hit === selected ? 0 : hit)} type="button">
        <img
          style={{
            filter: hit === selected ? '' : 'brightness(0.6)',
          }}
          src={src}
          width={64}
        />
      </button>
    )
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        width: 'fit-content',
        gap: 8,
        rowGap: 0,
      }}
    >
      <AnvilButton src="/tfc-icons/light_hit.png" hit={AnvilHits.LIGHT_HIT} />
      <AnvilButton src="/tfc-icons/medium_hit.png" hit={AnvilHits.MEDIUM_HIT} />
      <AnvilButton src="/tfc-icons/punch.png" hit={AnvilHits.PUNCH} />
      <AnvilButton src="/tfc-icons/bend.png" hit={AnvilHits.BEND} />
      <AnvilButton src="/tfc-icons/hard_hit.png" hit={AnvilHits.HARD_HIT} />
      <AnvilButton src="/tfc-icons/draw.png" hit={AnvilHits.DRAW} />
      <AnvilButton src="/tfc-icons/upset.png" hit={AnvilHits.UPSET} />
      <AnvilButton src="/tfc-icons/shrink.png" hit={AnvilHits.SHRINK} />
      <div
        style={{
          gridColumn: 'span 4',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        <img src={bottomIcon} width={128} />
      </div>
    </div>
  )
}
