import { load } from 'cheerio'

export const parseUsersHtmlToData = (html: unknown) => {
  const $ = load(html)
  const parsedData: string[] = []

  $('table.users-table > tbody > tr')
    .each((_, element) => {
      const tempData: string[] = []

      $(element).children().each((index: number, tableData) => {
        if (index === 0) return

        const elementData = $(tableData)
        tempData.push(elementData.text().trim())
      })
      // @ts-ignore
      parsedData.push(tempData)
    })

  return parsedData
}
export const parseEventsHtmlToData = (html: unknown, people: [string[]]) => {
  const $ = load(html)
  const firstDay: string[] = []
  const secondDay: string[] = []
  const users = people

  $('#content_12-04-2024 > div.program__body  > table > tbody > tr')
    .each((_, element) => {
      const tempData: string[] = []

      $(element).children().each((_, tableData) => {
        const elementData = $(tableData)
        tempData.push(elementData.text().replace('<br/>', '').trim())

        getNameAndReport($, element, tableData, users)
      })
      // @ts-ignore
      firstDay.push(tempData)
    })

  $('#content_13-04-2024 > div.program__body  > table > tbody > tr')
    .each((_, element) => {
      const tempData: string[] = []

      $(element).children().each((index, tableData) => {
        const elementData = $(tableData)
        tempData.push(elementData.text().replace('<br/>', '').trim())

        getNameAndReport($, element, tableData, users)
      })
      // @ts-ignore
      secondDay.push(tempData)
    })

  return { firstDay, secondDay, users }
}

const getNameAndReport = ($: Function, element: any, context: any, users: any) => {
  const report = $('div.program__item-desc', context).text().replace('<br/>', '').trim()
  const name = $('div.program__item-name', context).text().replace('<br/>', '').trim()

  // @ts-ignore
  users.find((user, index) => {
    const reverseName = user[0].split(' ').reverse().join(' ')

    return user[0].includes(name) || name.includes(user[0]) || reverseName.includes(name) || name.includes(reverseName)
  })?.push(report)
}
