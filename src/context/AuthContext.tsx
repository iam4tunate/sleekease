import { getCurrentUser } from '@/lib/appwrite/api';
import { IUser } from '@/lib/types';
import { createContext, useContext, useEffect, useState } from 'react';

const INITIAL_STATE = {
  user: null as IUser | null,
  userLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

type AuthContextType = {
  user: IUser | null;
  userLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType>(INITIAL_STATE);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<IUser | null>(null);
  const [userLoading, setUserLoading] = useState(true);
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
          role: currentAccount.label,
        });
        setIsAuthenticated(true);
        return true;
      } else {
        setUser(null);
      }
      return false;
    } catch {
      setUser(null);
      return false;
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    checkAuthUser();
  }, []);

  if (userLoading) {
    return (
      <div className='flex items-center justify-center h-screen w-full bg-white'>
        <div className='grid grid-cols-3 animate-zoomInOut'>
          <img src='/images/shirt_icon.png' className='w-16' alt='short' />
          <img src='/images/short_icon.png' className='w-16' alt='short' />
          <img src='/images/hoodie_icon.png' className='w-16' alt='short' />
          <img src='/images/pant_icon.png' className='w-16' alt='short' />
          <img src='/images/shirt_long_icon.png' className='w-16' alt='short' />
          <img src='/images/cap_icon.png' className='w-16' alt='short' />
        </div>
      </div>
    );
  }

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

// Create a custom hook to use the AuthContext with proper error handling
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within an AuthProvider');
  }
  return context;
};
