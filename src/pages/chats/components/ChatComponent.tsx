/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useRef, useEffect, useState } from 'react'
import { AxiosHttpRequest } from '../../../utils';

import { UserContext, UserDetailsType } from '../../../contexts/user/UserContext'
import { ChatsContext, MessageDetailsType } from '../../../contexts/chats/ChatsContext'

import { Empty, Form, Layout, List, Avatar, Input, Button } from 'antd';
const { Header, Content, Footer } = Layout;

const ChatComponent = (): JSX.Element => {
  const [form] = Form.useForm()
  const [text, setText] = useState('')
  const messagesEndRef = useRef(null)
  const scrollToBottom = (): void => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }


  const { user } = useContext(UserContext)
  const { chatsState, chatsDispatch } = useContext(ChatsContext)
  const { selectedChat } = chatsState

  useEffect(() => {
    scrollToBottom()
  }, [selectedChat])


  function send(): void {
    AxiosHttpRequest('POST', 'http://drocsid-web.herokuapp.com/api/messages/new', { chatId: selectedChat.id, text, username: user.username })
      .then((response) => {
        const { message } = response.data
        chatsDispatch({ type: 'ADD_MESSAGE', message })
        scrollToBottom()
      })
  }

  const selectedChatUsers = selectedChat && selectedChat.users && selectedChat.users.filter((u: UserDetailsType) => u.username !== user.username).map((u: UserDetailsType) => u.username).join(', ')

  return (
    <Layout className="site-layout" style={{ height: '100vh' }}>
      <Header className="site-layout-background" style={{ zIndex: 1000, padding: 0, color: 'white', position: 'fixed', top: 64, right: 0, width: 'calc(100vw - 200px)', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 5px -5px #333;' }}>
        <h1 style={{ marginLeft: 30, color: 'white' }}>Chat with {selectedChatUsers} </h1>
      </Header>
      <Content style={{ margin: '90px 16px 65px ', overflow: 'initial', top: 0 }}>

        <div className="site-layout-background" style={{ padding: '50px 22px 100px 22px', minHeight: 400, backgroundColor: 'white', boxShadow: '0px 0px 8px 1px rgba(138,135,138,1)', marginLeft: 200 }}>
          <List itemLayout="horizontal">
            {selectedChat && selectedChat.messages && selectedChat.messages.length ? selectedChat.messages.map((message: MessageDetailsType) => {
              const isSentByMe = message.userId === user.id

              return (
                <List.Item key={message.id} style={{ marginRight: isSentByMe ? 7 : 'auto', justifyContent: isSentByMe ? 'flex-end' : 'flex-start', margin: 7, backgroundColor: isSentByMe ? '#69c0ff' : '#e6f7ff', padding: 8, border: 1, borderRadius: 5 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {!isSentByMe && <Avatar style={{ marginRight: 10 }} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    <div>
                      <h4 style={{ textAlign: isSentByMe ? 'right' : 'left' }}>{message.user.username}</h4>
                      <div style={{ textAlign: isSentByMe ? 'right' : 'left', color: isSentByMe ? 'white' : '#595959' }}>{message.text}</div>
                    </div>
                    {isSentByMe && <Avatar style={{ marginLeft: 10 }} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  </div>
                </List.Item>
              )

            }) : <Empty description='No messages yet!' />}
            <div ref={messagesEndRef} />
          </List>
        </div>

      </Content>
      {selectedChat && selectedChat.id && <Footer style={{ textAlign: 'center', position: 'fixed', bottom: 0, width: '100%', marginLeft: 200 }}>
        <Form form={form} name="horizontal_send_message" autoComplete='off' layout="inline" onFinish={send}>
          <Form.Item
            name="text"
          >
            <Input type='text' allowClear value={text} onChange={(e: any): void => setText(e.target.value)} placeholder="Message" style={{ width: 'calc(100vw - 350px)' }} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
            >
              Send
              </Button>
          </Form.Item>
        </Form>
      </Footer>}
    </Layout>
  )
}

export { ChatComponent }