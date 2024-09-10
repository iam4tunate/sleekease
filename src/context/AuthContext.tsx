import { getCurrentUser } from '@/lib/appwrite/api';
import { IUser } from '@/lib/types';
import { createContext, useContext, useEffect, useState } from 'react';

const INITIAL_USER = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  userLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

type IContextType = {
  user: IUser;
  userLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [userLoading, setUserLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //! checking if there's an authenticated users everytime the page reloads
  const checkAuthUser = async () => {
    try {
      const currentAccount = await getCurrentUser();

      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          firstName: currentAccount.firstName,
          lastName: currentAccount.lastName,
          email: currentAccount.email,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    userLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
