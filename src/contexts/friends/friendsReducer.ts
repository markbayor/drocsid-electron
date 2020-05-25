import { useReducer } from 'react'
import { FriendsContextType } from './FriendsContext'

const initialState: FriendsContextType = {
  friends: [],
  incomingRequests: [],
  sentRequests: []
}

const GET_FRIENDS = 'GET_FRIENDS'
const SEND_REQUEST = 'SEND_REQUEST'
const DELETE_FRIEND = 'DELETE_FRIEND'

const GET_REQUESTS = 'GET_REQUESTS'
const ACCEPT_REQUEST = 'ACCEPT_REQUEST'
const REJECT_REQUEST = 'REJECT_REQUEST'
const CANCEL_REQUEST = 'CANCEL_REQUEST'

const EMPTY_STATE = 'EMPTY_STATE'

export default function (state = initialState, action: any): FriendsContextType {
  let newState = { ...state }
  switch (action.type) {
    case EMPTY_STATE:
      newState = initialState
      return newState
    case GET_FRIENDS:
      newState.friends = action.friends
      return newState

    case DELETE_FRIEND:
      newState.friends = newState.friends.filter(friend => friend.id !== action.friendId)
      return newState

    case SEND_REQUEST:
      newState.sentRequests = [...newState.sentRequests, action.request]
      return newState

    case GET_REQUESTS:
      newState.incomingRequests = action.incomingRequests
      newState.sentRequests = action.sentRequests
      return newState

    case ACCEPT_REQUEST:
      newState.friends = [...newState.friends, action.friend]
      newState.incomingRequests = newState.incomingRequests.filter(request => request.id !== action.friend.id)
      return newState

    case REJECT_REQUEST:
      newState.incomingRequests = newState.incomingRequests.filter(request => request.id !== action.requesterId)
      return newState

    case CANCEL_REQUEST:
      newState.sentRequests = newState.sentRequests.filter(request => request.id !== action.friendId)
      return newState

    default:
      return newState
  }
}