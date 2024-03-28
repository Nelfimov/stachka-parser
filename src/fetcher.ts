import axios from 'axios'

export const fetchPageData = async (url: string) => {
  try {
    const { data } = await axios.get(url)

    return data
  } catch (error) {
    console.error('Ошибка при получении данных страницы: ', error)
  }
}
