import { createContext } from 'react';

export interface UserDetailsType {
  id: string;
  username: string;
  email: string;
}

type UserContextType = {
  user: UserDetailsType;
  setUser: (newUser: UserDetailsType) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);
