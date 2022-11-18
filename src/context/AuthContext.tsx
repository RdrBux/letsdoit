import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { User, UserData } from '../types/types';
import { generateTags } from '../utils/textSearch';

export const AuthContext = createContext<User>({
  id: '',
  name: '',
  email: '',
  photoURL: '',
});

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    photoURL: '',
  });

  useEffect(() => {
    async function addUserToDb(user: any, anon: boolean = false) {
      try {
        const docRef = doc(db, 'users', user.uid || 'unknown');

        const docInDb = await getDoc(docRef);

        if (!docInDb.exists()) {
          const data: UserData = {
            id: user.uid,
            email: anon ? '' : user.email,
            name: anon ? 'Anónimo' : user.displayName,
            tags: anon ? [] : generateTags(user.displayName.toLowerCase()),
            bio: '',
            photoURL: anon
              ? 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
              : user.photoURL,
          };
          await setDoc(docRef, data);

          setUser({
            id: user.uid,
            name: anon ? 'Anónimo' : user.displayName,
            email: anon ? '' : user.email,
            photoURL: anon
              ? 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
              : user.photoURL,
          });
        } else {
          setUser({
            id: user.uid,
            name: anon ? 'Anónimo' : user.displayName,
            email: anon ? '' : user.email,
            photoURL: anon
              ? 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
              : user.photoURL,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }

    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.isAnonymous) {
          addUserToDb(user, true);
        } else if (!user.displayName || !user.email || !user.photoURL) {
          throw new Error('Error: missing user data.');
        }
        addUserToDb(user);
      } else {
        setUser({
          id: '',
          name: '',
          email: '',
          photoURL: '',
        });
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
