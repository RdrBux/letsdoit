import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { User, UserData } from '../types/types';
import { generateTags } from '../utils/textSearch';

export const AuthContext = createContext<User | null>(null);

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function addUserToDb(user: any) {
      try {
        const docRef = doc(db, 'users', user.uid);
        const data: UserData = {
          id: user.uid,
          email: user.email,
          name: user.displayName,
          tags: generateTags(user.displayName.toLowerCase()),
          bio: '',
          darkMode: false,
          friends: [],
          photoURL: user.photoURL,
        };

        await setDoc(docRef, data);

        setUser({
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          tasks: [],
        });
      } catch (err) {
        console.log(err);
      }
    }

    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!user.displayName || !user.email || !user.photoURL) {
          throw new Error('Error: missing user data.');
        }
        addUserToDb(user);
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
