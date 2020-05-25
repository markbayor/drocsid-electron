import React, { createContext } from 'react'
import { UserDetailsType } from '../user/UserContext';

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

export type ChatsContextType = {
  selectedChat: null | ChatDetailsType;
  chats: ChatsContextType[] | any;
}

export const ChatsContext = createContext({})
