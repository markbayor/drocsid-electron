/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect } from 'react';
import { ChatsContext, ChatDetailsType } from '../../../contexts/chats/ChatsContext'
import { FriendsContext } from '../../../contexts/friends/FriendsContext'
import { UserDetailsType, UserContext } from '../../../contexts/user/UserContext';

import { AxiosHttpRequest } from '../../../utils'

import { Layout, Menu, Collapse, Button } from 'antd'
const { Sider } = Layout
const { Panel } = Collapse
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TeamOutlined, CloseSquareOutlined, CheckSquareOutlined, UserOutlined, MailOutlined, MessageOutlined, DeleteOutlined, CommentOutlined } from '@ant-design/icons'



const ChatsSidebar = (): JSX.Element => {

  const { user } = useContext(UserContext)
  const { friendsState, friendsDispatch } = useContext(FriendsContext)
  const { chatsState, chatsDispatch } = useContext(ChatsContext)

  const { friends, sentRequests, incomingRequests } = friendsState
  const { chats } = chatsState

  function getFriendsAndRequests(): void {
    AxiosHttpRequest('GET', 'http://drocsid-web.herokuapp.com/api/friends')
      .then(response => {
        const friends: UserDetailsType[] = response.data
        friendsDispatch({ type: 'GET_FRIENDS', friends })
      })
      .catch(ex => console.log(ex))

    AxiosHttpRequest('GET', 'http://drocsid-web.herokuapp.com/api/friends/requests')
      .then(response => {
        const incomingRequests: UserDetailsType[] = response.data.incomingRequests
        const sentRequests: UserDetailsType[] = response.data.sentRequests
        friendsDispatch({ type: 'GET_REQUESTS', incomingRequests, sentRequests })
      })
      .catch(ex => console.log(ex))
  }

  useEffect(() => {
    getFriendsAndRequests()
  }, [])


  function handleAcceptFriendRequest(requesterId: string): void {
    AxiosHttpRequest('POST', `http://drocsid-web.herokuapp.com/api/friends/requests/accept`, { requesterId })
      .then(response => {
        const friend: UserDetailsType = response.data.friend
        friendsDispatch({ type: 'ACCEPT_REQUEST', friend })
      })
      .catch(ex => console.log(ex))
  }

  function handleRejectFriendRequest(requesterId: string): void {
    AxiosHttpRequest('DELETE', `http://drocsid-web.herokuapp.com/api/friends/requests/reject/${requesterId}`)
    friendsDispatch({ type: 'REJECT_REQUEST', requesterId })
  }

  function handleCancelFriendRequest(friendId: string): void {
    AxiosHttpRequest('DELETE', `http://drocsid-web.herokuapp.com/api/friends/requests/cancel/${friendId}`)
    return friendsDispatch({ type: 'CANCEL_REQUEST', friendId })
  }

  function handleClickOnChatWithFriend(friendId: string): void {
    const existingChat = chats.find((chat: ChatDetailsType) => chat.users.length === 2 && chat.users.find((user: UserDetailsType) => user.id === friendId))

    if (existingChat) {
      chatsDispatch({ type: 'SET_CHAT', chat: existingChat })
      chatsDispatch({ type: 'CREATE_CHAT', chat: existingChat })
    } else {
      AxiosHttpRequest('POST', `http://drocsid-web.herokuapp.com/api/chats/single/new`, { partnerId: friendId })
        .then(response => {
          const chat: ChatDetailsType = response.data
          chatsDispatch({ type: 'SET_CHAT', chat })
          chatsDispatch({ type: 'CREATE_CHAT', chat })
        })
        .catch(ex => console.log(ex))
    }
  }

  function handleDeleteFriend(friendId: string): void {
    AxiosHttpRequest('DELETE', `http://drocsid-web.herokuapp.com/api/friends/delete/${friendId}`)
    friendsDispatch({ type: 'DELETE_FRIEND', friendId })

    AxiosHttpRequest('DELETE', `http://drocsid-web.herokuapp.com/api/chats/single/${friendId}`)
      .then(response => {
        const { chatId } = response.data
        chatsDispatch({ type: 'DELETE_CHAT', chatId })
      })
      .catch(ex => console.log(ex))
  }

  function handleChatClick(chatId: string): void {
    const chat = chats.find((c: ChatDetailsType) => c.id === chatId)
    chatsDispatch({ type: 'SET_CHAT', chat })
  }

  return (
    <Sider style={{
      overflow: 'auto',
      height: '100vh',
      position: 'fixed',
      left: 0,
      paddingTop: 128
    }}>
      <Menu theme="light" mode="inline">
        <Collapse>
          <Panel header={<span><TeamOutlined />{' '}<span>Friends</span></span>} key="1">
            {/* <Button style={{ marginLeft: 19, marginBottom: 12 }} type='primary' icon={<SearchOutlined />} onClick={() => setShowSearch(!showSearch)}>Find friends!</Button> */}
            <Collapse>
              <Panel header={<span><MailOutlined />{' '}<span>Requests</span></span>} key="1">
                <Collapse>
                  <Panel header={<span><span>Sent</span></span>} key="1">
                    {sentRequests.map((request: UserDetailsType) => {
                      return (
                        <div key={request.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'baseline' }}>
                          <h4>{request.username}</h4>{' '}<Button icon={<CloseSquareOutlined />} onClick={(): void => handleCancelFriendRequest(request.id)}></Button>
                        </div>
                      )
                    })}
                  </Panel>
                </Collapse>
                <Collapse>
                  <Panel header={<span><span>Received</span></span>} key="1">
                    {incomingRequests.map((request: UserDetailsType) => {
                      return (
                        <div key={request.id} style={{ display: 'flex', flexDirection: 'column' }}>
                          <h4>{request.username}</h4>
                          <Button onClick={(): void => handleAcceptFriendRequest(request.id)} icon={<CheckSquareOutlined />} />
                          <Button onClick={(): void => handleRejectFriendRequest(request.id)} icon={<CloseSquareOutlined />} />
                        </div>
                      )
                    })}
                  </Panel>
                </Collapse>

              </Panel>
            </Collapse>
            <br />
            {friends.map((friend: UserDetailsType) => {
              return (
                <Collapse key={friend.id}>
                  <Panel header={<span><UserOutlined />{friend.username}</span>} key={friend.id}>
                    <Button onClick={(): void => handleClickOnChatWithFriend(friend.id)} icon={<MessageOutlined />}>Chat!</Button>
                    <Button onClick={(): void => handleDeleteFriend(friend.id)} icon={<DeleteOutlined />}>Delete :(</Button>
                  </Panel>
                </Collapse>
              )
            })
            }
          </Panel>
        </Collapse>
      </Menu>
      <Menu theme="light" mode="vertical" onClick={({ key }): void => handleChatClick(key)}>
        {chats &&
          chats.map((chat: ChatDetailsType) => {
            let name = ''
            if (chat.users.length === 2) {
              const otherUser = chat.users.find(_user => _user.username !== user.username)
              name = otherUser.username
              return <Menu.Item key={chat.id} icon={<MessageOutlined />}>Chat with {name}</Menu.Item>
            } else {
              return <Menu.Item key={chat.id} icon={<CommentOutlined />}>Groupchat "{chat.name}"</Menu.Item>
            }
          })
        }
      </Menu>
    </Sider>
  )
}

export { ChatsSidebar }