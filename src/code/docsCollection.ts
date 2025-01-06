import { getCollection, getEntry } from 'astro:content'

const docsCollection = await getCollection('modDocs')

const rawTopics = docsCollection
  // get the index.md files
  .filter(({ id }) => !id.includes('/'))
  // sort by order
  .sort((a, b) => a.data.order - b.data.order)

const rawArticlesByTopic = Object.fromEntries(
  rawTopics.map((topic) => [
    topic.id,
    // articles for the topic
    docsCollection
      .filter(
        ({ id: articleId }) =>
          articleId.startsWith(topic.id) && articleId.includes('/'),
      )
      // sort by order
      .sort((a, b) => a.data.order - b.data.order),
  ]),
)

export const sortedArticles = rawTopics.map((topic) => ({
  topic,
  articles: rawArticlesByTopic[topic.id] ?? [],
}))

export async function getArticle(id: string) {
  const article = await getEntry('modDocs', id)

  if (!article) throw new Error(`Missing ${id}`)

  return article
}

export function getArticlesForTopic(topic: string) {
  const articles = sortedArticles.find(({ topic: { id } }) => id === topic)

  if (!articles) throw new Error(`Missing ${topic}`)

  return articles.articles
}
