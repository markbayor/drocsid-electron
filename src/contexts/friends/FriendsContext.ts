import { createContext } from 'react'
import { UserDetailsType } from '../user/UserContext'

export type FriendsContextType = {
  friends: UserDetailsType[];
  incomingRequests: UserDetailsType[];
  sentRequests: UserDetailsType[];
}

export const FriendsContext = createContext({})
