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
  friends: [],
});

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    photoURL: '',
    friends: [],
  });

  useEffect(() => {
    async function addUserToDb(user: any) {
      try {
        const docRef = doc(db, 'users', user.uid || 'unknown');

        const docInDb = await getDoc(docRef);

        if (!docInDb.exists()) {
          const data: UserData = {
            id: user.uid,
            email: user.email,
            name: user.displayName,
            tags: generateTags(user.displayName.toLowerCase()),
            bio: '',
            photoURL: user.photoURL,
          };
          await setDoc(docRef, data);

          setUser({
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            friends: [],
          });
        } else {
          const userData = docInDb.data();
          const friends = userData.friends;

          setUser({
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            friends: friends,
          });
        }
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
        setUser({
          id: '',
          name: '',
          email: '',
          photoURL: '',
          friends: [],
        });
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
