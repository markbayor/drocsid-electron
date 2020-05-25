import axios from 'axios'

export const AxiosHttpRequest = async (method: string, url: string, data: object | undefined): Promise<Record<string, any>> => {
  switch (method) {
    case 'GET':
      return axios.get(url, {
        headers: {
          'Authorization': `Bearer FAKEJWTTOKEN`
        }
      })
    case 'POST':
      return axios.post(url, data, {
        headers: {
          'Authorization': `Bearer FAKEJWTTOKEN`,
        }
      })
    case 'DELETE':
      return axios.delete(url,
        {
          headers: {
            'Authorization': `Bearer FAKEJWTTOKEN`
          }
        })
  }
}