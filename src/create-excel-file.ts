import ExcelJS                              from 'exceljs'
import { USERS_WORKSHEET_NAME }             from './constants.js'
import { EVENTS_FIRST_DAY_WORKSHEET_NAME }  from './constants.js'
import { EVENTS_SECOND_DAY_WORKSHEET_NAME } from './constants.js'
import { EVENTS_COLUMNS }                   from './constants.js'
import { USERS_COLUMNS }                    from './constants.js'

export const createExcelFile = async (data: {
  users: string[],
  firstDay: string[],
  secondDay: string[]
}, filePath: string) => {
  const { users, firstDay, secondDay } = data

  const workbook = new ExcelJS.Workbook()
  const usersWorksheet = workbook.addWorksheet(USERS_WORKSHEET_NAME)

  usersWorksheet.columns = USERS_COLUMNS
  users.forEach(item => usersWorksheet.addRow(item))

  const eventsFirstDayWorksheet = workbook.addWorksheet(EVENTS_FIRST_DAY_WORKSHEET_NAME)
  const eventsSecondDayWorksheet = workbook.addWorksheet(EVENTS_SECOND_DAY_WORKSHEET_NAME)

  eventsFirstDayWorksheet.columns = EVENTS_COLUMNS
  eventsSecondDayWorksheet.columns = EVENTS_COLUMNS

  firstDay.forEach(item => eventsFirstDayWorksheet.addRow(item))
  secondDay.forEach(item => eventsSecondDayWorksheet.addRow(item))

  await workbook.xlsx.writeFile(filePath)
  console.info(`Файл успешно сохранен: ${filePath}`)
}
