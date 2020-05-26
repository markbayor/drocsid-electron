// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AxiosHttpRequest } from '../../utils'
import { ChatsContext } from '../../contexts/chats/ChatsContext'
import { UserContext } from '../../contexts/user/UserContext'

import { default as socket } from '../../socket'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Layout, message } from 'antd'



// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ChatsSidebar } from './components/ChatsSidebar'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Navbar } from './components/Navbar'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ChatComponent } from './components/ChatComponent'



function ChatsPage(): JSX.Element {

  const { user } = useContext(UserContext)
  const { chatsState, chatsDispatch } = useContext(ChatsContext)
  const history = useHistory()

  function getChats(): void {
    AxiosHttpRequest('GET', 'http://drocsid-web.herokuapp.com/api/chats/all/populated')
      .then(({ data }) => {
        console.log('CHATS DATA', data)
        chatsDispatch({ type: 'GET_CHATS', chats: data })
      })
      .catch(ex => console.log(ex))
  }

  useEffect(() => {
    getChats()
    socket.on('message', (response: any) => {
      if (response.message.userId !== user.id) {
        chatsDispatch({ type: 'ADD_MESSAGE', message: response.message })
      }
    })
  }, [])

  return (
    <Layout>
      <Navbar />
      <ChatsSidebar />
      <ChatComponent />
    </Layout>
  )
}

export default ChatsPage


