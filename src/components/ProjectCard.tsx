type ProjectLink =
  | {
      page: string
      image: string
      imageAlt: string
      text?: never
    }
  | {
      page: string
      text: string
      image?: never
      imageAlt?: never
    }

export default function ({
  title,
  links,
}: {
  title: string
  links: ProjectLink[]
}) {
  return (
    <aside>
      <h2>{title}</h2>
      {links.map(({ page, ...link }) => (
        <a href={page}>
          {link.image ? (
            <img src={link.image} alt={link.imageAlt} />
          ) : (
            <p>{link.text}</p>
          )}
        </a>
      ))}
    </aside>
  )
}
