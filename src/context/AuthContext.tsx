import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

export const AuthContext = createContext<User | null>(null);

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user);
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
