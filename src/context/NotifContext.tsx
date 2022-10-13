import { doc, onSnapshot } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { Notif } from '../types/types';
import { AuthContext } from './AuthContext';

export const NotifContext = createContext<Notif[] | null>(null);

export const NotifContextProvider = ({ children }: { children: any }) => {
  const [notifs, setNotifs] = useState<Notif[] | null>(null);
  const user = useContext(AuthContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'users', user?.id || 'unknown'), (doc) => {
      const data = doc.data();
      setNotifs(data?.notifications);
    });

    return () => {
      unsub();
    };
  }, [user]);

  return (
    <NotifContext.Provider value={notifs}>{children}</NotifContext.Provider>
  );
};
