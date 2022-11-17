import { collection, onSnapshot } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { Notif } from '../types/types';
import { AuthContext } from './AuthContext';

export const NotifContext = createContext<Notif[]>([]);

export const NotifContextProvider = ({ children }: { children: any }) => {
  const [notifs, setNotifs] = useState<Notif[]>([]);
  const user = useContext(AuthContext);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'users', user.id || 'unknown', 'notifs'),
      (docs) => {
        const data: any[] = [];
        docs.forEach((doc) => data.push(doc.data()));
        data.sort((a, b) => b.time.seconds - a.time.seconds);
        setNotifs(data);
      }
    );

    return () => {
      unsub();
    };
  }, [user]);

  return (
    <NotifContext.Provider value={notifs}>{children}</NotifContext.Provider>
  );
};
