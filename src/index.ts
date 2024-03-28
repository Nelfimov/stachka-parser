import { USERS_URL }  from './constants.js'
import { EVENTS_URL } from './constants.js'
import { FILE_PATH }  from './constants.js'
import { createExcelFile }  from './create-excel-file.js'
import { processPages }     from './processors.js'

(async () => {
  const data = await processPages(USERS_URL, EVENTS_URL,1, 17)
  // @ts-ignore
  await createExcelFile(data, FILE_PATH)
})()
