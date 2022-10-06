import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { User } from '../types/types';

export const AuthContext = createContext<User | null>(null);

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!user.displayName || !user.email || !user.photoURL) {
          throw new Error('Error: missing user data.');
        }
        setUser({
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          tasks: [],
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
