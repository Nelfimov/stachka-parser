import axios from 'axios'

export const fetchPageData = async (url: string) => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error('Ошибка при получении данных страницы:', error)
    return null
  }
}
