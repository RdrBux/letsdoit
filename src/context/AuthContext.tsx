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
  notifications: [],
});

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    photoURL: '',
    friends: [],
    notifications: [],
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
            darkMode: false,
            friends: [],
            notifications: [],
            photoURL: user.photoURL,
          };
          await setDoc(docRef, data);

          setUser({
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            friends: [],
            notifications: [],
          });
        } else {
          const userData = docInDb.data();
          const friends = userData.friends;
          const notifications = userData.notifications;

          setUser({
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            friends: friends,
            notifications: notifications,
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
          notifications: [],
        });
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
