import React, { useContext, useState, useEffect } from 'react'
import ReactDOM, { useHistory } from 'react-router-dom'
import { AxiosHttpRequest } from '../../../utils'

import { UserContext } from '../../../contexts/user/UserContext'
import { FriendsContext } from '../../../contexts/friends/FriendsContext'
import { ChatsContext } from '../../../contexts/chats/ChatsContext'

import { Layout, Button, Form, Input, List, Avatar } from 'antd'
const { Header } = Layout
import { LogoutOutlined, UserAddOutlined } from '@ant-design/icons'


const Navbar = (): JSX.Element => {
  const [form] = Form.useForm()

  const { user, setUser } = useContext(UserContext)
  const { friendsState, friendsDispatch } = useContext(FriendsContext)
  const { chatsDispatch } = useContext(ChatsContext)

  const { incomingRequests, sentRequests, friends } = friendsState

  const [searchResults, setSearchResults] = useState([])

  const history = useHistory()

  function handleLogout(): void {
    friendsDispatch({ type: 'EMPTY_STATE' })
    chatsDispatch({ type: 'EMPTY_STATE' })
    setUser(null)
    history.push('/auth')
  }

  function handleSearch(searchVal: string): void {
    AxiosHttpRequest('POST', 'http://drocsid-web.herokuapp.com/api/friends/search', { searchVal })
      .then(response => {
        const results = response.data
        setSearchResults(results)
      })
      .catch(ex => console.log(ex))
  }

  function handleSendRequest(id: string): void {
    AxiosHttpRequest('POST', 'http://drocsid-web.herokuapp.com/api/friends/requests/add', { friendId: id })
      .then(response => {
        const request = response.data
        friendsDispatch({ type: 'SEND_REQUEST', request })
        setSearchResults(searchResults.filter(result => result.id !== request.id))
      })
  }

  return (
    <Header>
      <div className='search-form_container'>
        <Form style={{ justifyContent: 'center', marginTop: 12 }} form={form} name="horizontal_send_message" autoComplete='off' layout="inline">
          <Form.Item name="text">
            <Input onChange={(e: any): void => handleSearch(e.target.value)} type='text' allowClear placeholder="Enter user's username" style={{ width: 'calc(100vw - 350px)' }} />
          </Form.Item>
        </Form>
      </div>
      <div className='search-results_container' style={{ position: 'fixed', top: 0 }}>
        <List>
          {searchResults.length && searchResults.filter(result => {
            return result.id !== user.id && !friends.find((f: any) => f.id === result.id) && !incomingRequests.find((r: any) => r.id === result.id) && !sentRequests.find((r: any) => r.id === result.id) // FILTERRING HERE, MUST CHANGE IT. TODO
          }).map(result => {
            return (
              <List.Item key={result.id} style={{ padding: 8, border: 1, borderRadius: 5 }}>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={result.username}
                />
                <Button type='primary' icon={<UserAddOutlined />} onClick={(): void => handleSendRequest(result.id)}>Send friend request</Button>
              </List.Item>
            )
          })}
        </List>
      </div>
      <Button type="primary" onClick={handleLogout} icon={<LogoutOutlined />}>Log out</Button>
    </Header >
  )
}

export { Navbar }