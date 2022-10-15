import { doc, onSnapshot } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { FriendData } from '../types/types';
import { AuthContext } from './AuthContext';

export const FriendsContext = createContext<FriendData[]>([]);

export const FriendsContextProvider = ({ children }: { children: any }) => {
  const [friends, setFriends] = useState<FriendData[]>([]);
  const user = useContext(AuthContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'users', user.id || 'unknown'), (doc) => {
      const data = doc.data();
      setFriends(data?.friends);
    });

    return () => {
      unsub();
    };
  }, [user]);

  return (
    <FriendsContext.Provider value={friends}>
      {children}
    </FriendsContext.Provider>
  );
};
