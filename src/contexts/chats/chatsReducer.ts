import { useReducer } from 'react'
import { ChatsContext, ChatsContextType, ChatDetailsType } from './ChatsContext'


const GET_CHATS = 'GET_CHATS'
const SET_CHAT = 'SET_CHAT'
const CREATE_CHAT = 'CREATE_CHAT'
const DELETE_CHAT = 'DELETE_CHAT'
const ADD_MESSAGE = 'ADD_MESSAGE'

const initialState: ChatsContextType = {
  selectedChat: null,
  chats: [],
}

function chatsReducer(state = initialState, action: any): ChatsContextType {
  const newState = { ...state }
  switch (action.type) {
    case GET_CHATS:
      newState.chats = action.chats
      console.log('NEWSTATE', newState)
      return newState;


    case SET_CHAT:
      newState.selectedChat = action.chat
      return newState

    case CREATE_CHAT:
      newState.chats = [...newState.chats, action.chat]
      return newState

    case DELETE_CHAT:
      if (newState.selectedChat && newState.selectedChat.id === action.chatId) {
        newState.selectedChat = null
      }

      newState.chats = newState.chats.filter((chat: ChatDetailsType) => chat.id !== action.chatId)
      return newState

    case ADD_MESSAGE:
      if (newState.selectedChat && newState.selectedChat.id === action.message.id) {
        newState.selectedChat.messages = [...newState.selectedChat.messages, action.message]
      }
      // eslint-disable-next-line no-case-declarations
      const chatIdx = newState.chats.findIndex((chat: ChatDetailsType) => chat.id === action.message.id)
      newState.chats[chatIdx].messages = [...newState.chats[chatIdx].messages, action.message]

      return newState

    default:
      return newState
  }
}

export { chatsReducer }