import { load } from 'cheerio'

export const parseUsersHtmlToData = (html: unknown) => {
  const $ = load(html)
  const parsedData: string[] = []

  $('table.users-table > tbody > tr')
    .each((_, element) => {
      const tempData: string[] = []

      $(element).children().each((index, tableData) => {
        if (index === 0) return

        const elementData = $(tableData)
        tempData.push(elementData.text().trim())
      })
      // @ts-ignore
      parsedData.push(tempData)
    })

  return parsedData
}
export const parseEventsHtmlToData = (html: unknown) => {
  const $ = load(html)
  const firstDay: string[] = []
  const secondDay: string[] = []

  $('#content_12-04-2024 > div.program__body  > table > tbody > tr')
    .each((_, element) => {
      const tempData: string[] = []

      $(element).children().each((index, tableData) => {
        const elementData = $(tableData)
        tempData.push(elementData.text().trim())
      })
      // @ts-ignore
      firstDay.push(tempData)
    })

  $('#content_13-04-2024 > div.program__body  > table > tbody > tr')
    .each((_, element) => {
      const tempData: string[] = []

      $(element).children().each((index, tableData) => {
        const elementData = $(tableData)
        tempData.push(elementData.text().trim())
      })
      // @ts-ignore
      secondDay.push(tempData)
    })

  return { firstDay, secondDay }
}
