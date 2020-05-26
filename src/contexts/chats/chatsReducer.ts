import { ChatDetailsType, ChatsState, MessageDetailsType } from './ChatsContext'

export const initialChatsState: ChatsState = {
  selectedChat: null,
  chats: []
}

type getChatsAction = { type: 'GET_CHATS'; chats: ChatDetailsType[] }
type setChatAction = { type: 'SET_CHAT'; chat: ChatDetailsType }
type createChat = { type: 'CREATE_CHAT'; chat: ChatDetailsType }
type deleteChat = { type: 'DELETE_CHAT'; chatId: string }
type addMessage = { type: 'ADD_MESSAGE'; message: MessageDetailsType }
type emptyState = { type: 'EMPTY_STATE' }

export type Action = getChatsAction | setChatAction | createChat | deleteChat | addMessage | emptyState

function chatsReducer(state: ChatsState, action: Action): ChatsState {
  let newState = { ...state }
  switch (action.type) {
    case 'EMPTY_STATE':
      newState = initialChatsState
      return newState
    case 'GET_CHATS':
      newState.chats = action.chats
      return newState;

    case 'SET_CHAT':
      newState.selectedChat = action.chat
      return newState

    case 'CREATE_CHAT':
      newState.chats = [...newState.chats, action.chat]
      return newState

    case 'DELETE_CHAT':
      if (newState.selectedChat && newState.selectedChat.id === action.chatId) {
        newState.selectedChat = null
        return newState
      }

      newState.chats = newState.chats.filter((chat: ChatDetailsType) => chat.id !== action.chatId)
      return newState

    case 'ADD_MESSAGE':
      console.log('ACTION', action)
      if (newState.selectedChat && newState.selectedChat.id === action.message.chatId) {
        newState.selectedChat.messages = [...newState.selectedChat.messages, action.message]
        return newState
      }
      // eslint-disable-next-line no-case-declarations
      const chatIdx = newState.chats.findIndex((chat: ChatDetailsType) => chat.id === action.message.chatId)
      newState.chats[chatIdx].messages = [...newState.chats[chatIdx].messages, action.message]

      return newState

    default:
      return newState
  }
}

export { chatsReducer }