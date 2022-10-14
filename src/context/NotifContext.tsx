import { doc, onSnapshot } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { Notif } from '../types/types';
import { AuthContext } from './AuthContext';

type NotifContextType = {
  notifs: Notif[];
  seenNotifs: string[];
};

export const NotifContext = createContext<NotifContextType>({
  notifs: [],
  seenNotifs: [],
});

export const NotifContextProvider = ({ children }: { children: any }) => {
  const [notifs, setNotifs] = useState<Notif[]>([]);
  const user = useContext(AuthContext);
  const [seenNotifs, setSeenNotifs] = useState<string[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'users', user?.id || 'unknown'), (doc) => {
      const data = doc.data();
      setNotifs(data?.notifications);
      setSeenNotifs(data?.seenNotifs);
    });

    return () => {
      unsub();
    };
  }, [user]);

  return (
    <NotifContext.Provider value={{ notifs, seenNotifs }}>
      {children}
    </NotifContext.Provider>
  );
};
