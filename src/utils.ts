import axios from 'axios'

export const getJwt = (): string => {
  return window.localStorage.getItem('accessToken')
}

export const setJwt = (jwt: string): void => {
  window.localStorage.setItem('accessToken', jwt)
}

export const removeJwt = (): void => {
  window.localStorage.removeItem('accessToken')
}

export const AxiosHttpRequest = async (method: string, url: string, data?: object | undefined): Promise<Record<string, any>> => {
  switch (method) {
    case 'GET':
      return axios.get(url, {
        headers: {
          'Authorization': `Bearer ${getJwt()}`
        }
      })
    case 'POST':
      return axios.post(url, data, {
        headers: {
          'Authorization': `Bearer ${getJwt()}`,
        }
      })
    case 'DELETE':
      return axios.delete(url,
        {
          headers: {
            'Authorization': `Bearer ${getJwt()}`
          }
        })
  }
}

export const getUser = (setUser: any): void => {
  AxiosHttpRequest('GET', 'http://drocsid-web.herokuapp.com/auth/me')
    .then((response) => {
      setUser(response.data)
    })
    .catch(ex => {
      console.log(ex)
    })
}
