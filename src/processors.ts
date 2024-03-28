import { fetchPageData }         from './fetcher.js'
import { parseEventsHtmlToData } from './parsers.js'
import { parseUsersHtmlToData }  from './parsers.js'

export const processPages = async (
  usersURL: string,
  eventsURL: string,
  startPage: number,
  endPage: number,
) => {
  let usersData: string[] = []

  for (let page = startPage; page <= endPage; page++) {
    const url = `${usersURL}?page=${page}`

    console.log(`Обработка: ${url}`)

    const html = await fetchPageData(url)
    const usersPageData = parseUsersHtmlToData(html)
    usersData = usersData.concat(usersPageData)
  }

  console.log(`Обработка: ${eventsURL}`)

  const html = await fetchPageData(eventsURL)

  // @ts-ignore
  const { firstDay, secondDay, users } = parseEventsHtmlToData(html, usersData)

  return { firstDay, secondDay, users }
}
