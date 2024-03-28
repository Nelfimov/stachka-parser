import { fetchPageData }         from './fetcher.js'
import { parseEventsHtmlToData } from './parsers.js'
import { parseUsersHtmlToData }  from './parsers.js'

export const processPages = async (baseUrl: string, startPage?: number, endPage?: number) => {
  let allData: string[] = []
  let eventsData = null

  if (startPage && endPage) {
    for (let page = startPage; page <= endPage; page++) {
      const url = `${baseUrl}?page=${page}`

      console.log(`Обработка: ${url}`)

      const html = await fetchPageData(url)
      const usersPageData = parseUsersHtmlToData(html)
      allData = allData.concat(usersPageData)
    }
  } else {
    console.log(`Обработка: ${baseUrl}`)

    const html = await fetchPageData(baseUrl)

    eventsData = parseEventsHtmlToData(html)
  }

  return eventsData ?? allData
}
