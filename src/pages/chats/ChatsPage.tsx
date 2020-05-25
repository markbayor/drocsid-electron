import React, { useContext, useEffect } from 'react'
import { ChatsContext } from '../../contexts/chats/ChatsContext'

import { Layout } from 'antd'
const { Sider, Content, Footer } = Layout

import { AxiosHttpRequest } from '../../utils'

import { ChatsSidebar } from './components/ChatsSidebar'



function ChatsPage(): JSX.Element {

  // STILL WORKS BITCH
  const { chatsState, chatsDispatch } = useContext(ChatsContext)

  function getChats() {
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
      <Navbar /> {/* Header */}
      <ChatsSidebar /> {/* Sider: SET_CHAT, CREATE_CHAT, DELETE_CHAT*/}
      <ChatComponent /> {/* Content */}
    </Layout>
  )
}

export default ChatsPage


