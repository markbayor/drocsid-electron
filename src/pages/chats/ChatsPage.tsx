// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useContext, useEffect } from 'react'
import { AxiosHttpRequest, getUser } from '../../utils'
import { ChatsContext } from '../../contexts/chats/ChatsContext'
import { UserContext } from '../../contexts/user/UserContext'

import { default as socket } from '../../socket'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Layout } from 'antd'



// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ChatsSidebar } from './components/ChatsSidebar'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Navbar } from './components/Navbar'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ChatComponent } from './components/ChatComponent'



function ChatsPage(): JSX.Element {

  const { user, setUser } = useContext(UserContext)
  const { chatsDispatch } = useContext(ChatsContext)
  console.log('USER IN PAGE', user)
  function getChats(): void {
    AxiosHttpRequest('GET', 'http://drocsid-web.herokuapp.com/api/chats/all/populated')
      .then(({ data }) => {
        chatsDispatch({ type: 'GET_CHATS', chats: data })
      })
      .catch(ex => console.log(ex))
  }

  useEffect(() => {
    getChats()
    getUser(setUser)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.on('message', (response: any) => {
      if (response.message.user.id !== user.id) {
        chatsDispatch({ type: 'ADD_MESSAGE', message: response.message })
      }
    })
  }, [])

  return (
    <Layout style={{ width: '100vw' }}>
      <Navbar />
      <ChatsSidebar />
      <ChatComponent />
    </Layout>
  )
}

export default ChatsPage


