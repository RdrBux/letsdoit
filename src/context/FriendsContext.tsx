import { collection, onSnapshot } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { FriendData } from '../types/types';
import { AuthContext } from './AuthContext';

export const FriendsContext = createContext<FriendData[]>([]);

export const FriendsContextProvider = ({ children }: { children: any }) => {
  const [friends, setFriends] = useState<FriendData[]>([]);
  const user = useContext(AuthContext);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'users', user.id || 'unknown', 'friends'),
      (docs) => {
        const data: any[] = [];
        docs.forEach((doc) => data.push(doc.data()));
        setFriends(data);
      }
    );

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
