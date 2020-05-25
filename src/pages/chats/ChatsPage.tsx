// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useContext, useEffect } from 'react'
import { ChatsContext } from '../../contexts/chats/ChatsContext'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Layout } from 'antd'

import { AxiosHttpRequest } from '../../utils'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ChatsSidebar } from './components/ChatsSidebar'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Navbar } from './components/Navbar'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ChatComponent } from './components/ChatComponent'


function ChatsPage(): JSX.Element {

  // STILL WORKS BITCH
  const { chatsState, chatsDispatch } = useContext(ChatsContext)

  function getChats(): void {
    AxiosHttpRequest('GET', 'http://drocsid-web.herokuapp.com/api/chats/all/populated')
      .then(({ data }) => {
        chatsDispatch({ type: 'GET_CHATS', chats: data })
      })
      .catch(ex => console.log(ex))
  }

  useEffect(() => {
    getChats()
  }, [])

  return (
    <Layout>
      <Navbar />
      <ChatsSidebar /> {/* Sider: SET_CHAT, CREATE_CHAT, DELETE_CHAT*/}
      <ChatComponent />
    </Layout>
  )
}

export default ChatsPage


