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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUser = (setUser: any): void => {
  AxiosHttpRequest('GET', 'http://drocsid-web.herokuapp.com/auth/me')
    .then((response) => {
      setUser(response.data)
    })
    .catch(ex => {
      console.log(ex)
    })
}
