import React, { createContext } from 'react'
import { UserDetailsType } from '../user/UserContext';
import { Action } from './chatsReducer'

export interface MessageDetailsType {
  id: string;
  chatId: string;
  text: string;
  userId: string;
  user: UserDetailsType;
}

export interface ChatDetailsType {
  id: string;
  messages: MessageDetailsType[];
  name?: string;
  userIds: string;
  users: UserDetailsType[];
}

export interface ChatsState {
  selectedChat: ChatDetailsType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chats: ChatsContextType[] | any;
}

export type ChatsContextType = {
  chatsState: ChatsState;
  chatsDispatch: React.Dispatch<Action>;
}

export const ChatsContext = createContext<Partial<ChatsContextType>>({})
