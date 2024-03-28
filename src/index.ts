import { USERS_URL }  from './constants.js'
import { EVENTS_URL } from './constants.js'
import { FILE_PATH }  from './constants.js'
import { createExcelFile }  from './create-excel-file.js'
import { processPages }     from './processors.js'

(async () => {
  const users = await processPages(USERS_URL, 1, 17)
  const events = await processPages(EVENTS_URL)
  // @ts-ignore
  await createExcelFile(users, events, FILE_PATH)
})()
