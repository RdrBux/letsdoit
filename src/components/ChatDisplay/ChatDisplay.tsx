import {
  arrayUnion,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { KeyboardEvent, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firebase';
import { FriendData, Notif, SelectedUser } from '../../types/types';
import { nanoid } from 'nanoid';
import { formatDistanceToNowStrict } from 'date-fns';
import { es } from 'date-fns/locale';
import { FriendsContext } from '../../context/FriendsContext';

type Props = {
  selectedChatUser: SelectedUser;
  close: () => void;
};

export default function ChatDisplay({ selectedChatUser, close }: Props) {
  const user = useContext(AuthContext);
  const friends = useContext(FriendsContext);

  const [chatData, setChatData] = useState<DocumentData | undefined>();
  const [message, setMessage] = useState('');
  const messageRef = useRef<null | HTMLDivElement>(null);

  const friendData = friends.find(
    (friend) => friend.id === selectedChatUser.id
  );

  useEffect(() => {
    async function fetchChat() {
      try {
        const combinedId =
          user.id > selectedChatUser.id
            ? user.id + selectedChatUser.id
            : selectedChatUser.id + user.id;
        const chatRef = doc(db, 'chats', combinedId);
        const chat = await getDoc(chatRef);

        if (!chat.exists()) {
          await setDoc(chatRef, { chat: [] });
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchChat();
  }, [user, selectedChatUser]);

  useEffect(() => {
    const combinedId =
      user.id > selectedChatUser.id
        ? user.id + selectedChatUser.id
        : selectedChatUser.id + user.id;
    const unsub = onSnapshot(doc(db, 'chats', combinedId), (doc) => {
      setChatData(doc.data());
    });

    return () => {
      unsub();
    };
  }, [user, selectedChatUser]);

  useEffect(() => {
    async function deleteNewMsgNotif() {
      if (selectedChatUser.id) {
        const q = query(
          collection(db, 'users', user.id, 'notifs'),
          where('userId', '==', selectedChatUser.id),
          where('type', '==', 'friendRequest')
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (document) => {
          try {
            const docRef = doc(db, 'users', user.id, 'notifs', document.id);
            await updateDoc(docRef, {
              seen: true,
            });
          } catch (err) {
            console.log(err);
          }
        });
      }
    }
    deleteNewMsgNotif();
  }, [user, selectedChatUser, chatData]);

  useEffect(() => {
    scrollToBottom();
  }, [chatData]);

  function chatDataToJSX() {
    if (chatData === undefined) return;
    if (chatData === null) return;

    const data = chatData.chat.map((chat: DocumentData) => {
      if (chat.id === user.id) {
        return (
          <div
            key={nanoid()}
            className="relative ml-8 w-fit self-end rounded-2xl rounded-tr-none bg-emerald-200 p-4 shadow-sm"
          >
            {chat.msg}
            <div className="absolute -bottom-4 right-2 whitespace-nowrap text-xs font-semibold text-zinc-500">
              {formatDistanceToNowStrict(chat.time.toDate(), {
                locale: es,
              })}
            </div>
          </div>
        );
      } else {
        return (
          <div
            key={nanoid()}
            className="relative mr-8 w-fit rounded-xl rounded-tl-none bg-white p-4 shadow-sm"
          >
            {chat.msg}
            <div className="absolute -bottom-4 left-2 whitespace-nowrap text-xs font-bold text-zinc-500">
              {formatDistanceToNowStrict(chat.time.toDate(), {
                locale: es,
              })}
            </div>
          </div>
        );
      }
    });
    return data;
  }
  const chatToJSX = chatDataToJSX();

  async function handleSubmit() {
    const msg = message;
    setMessage('');

    // Add msg to array on the doc with combined ids
    const combinedId =
      user.id > selectedChatUser.id
        ? user.id + selectedChatUser.id
        : selectedChatUser.id + user.id;

    try {
      const chatRef = doc(db, 'chats', combinedId);
      await updateDoc(chatRef, {
        chat: arrayUnion({
          id: user.id,
          time: new Date(),
          msg: msg,
        }),
      });
    } catch (err) {
      console.log(err);
    }

    // Update lastMsg element in both users friendslists
    const userRef = doc(db, 'users', user.id, 'friends', selectedChatUser.id);
    const friendRef = doc(db, 'users', selectedChatUser.id, 'friends', user.id);
    try {
      await updateDoc(userRef, {
        lastMsg: 'tú: ' + msg,
        lastMsgTime: new Date(),
      });

      await updateDoc(friendRef, {
        lastMsg: msg,
        lastMsgTime: new Date(),
      });
    } catch (err) {
      console.log(err);
    }

    // Send alert to notify a new msg to friend
    const notifId = nanoid();
    const friendNotifsRef = doc(
      db,
      'users',
      selectedChatUser.id,
      'notifs',
      notifId
    );
    const notif: Notif = {
      type: 'newChat',
      userId: user.id,
      id: notifId,
      name: user.name,
      photoURL: user.photoURL,
      time: new Date(),
      seen: false,
    };
    try {
      await setDoc(friendNotifsRef, notif);
    } catch (err) {
      console.log(err);
    }
  }

  function handleKey(e: KeyboardEvent) {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      handleSubmit();
    }
  }

  function scrollToBottom() {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        block: 'end',
        inline: 'nearest',
      });
    }
  }

  async function handleSendFriendRequest() {
    const notifId = nanoid();
    const selectedUserNotifs = doc(
      db,
      'users',
      selectedChatUser.id,
      'notifs',
      notifId
    );
    const userFriendsRef = doc(
      db,
      'users',
      user.id,
      'friends',
      selectedChatUser.id
    );
    const selectedUserRef = doc(
      db,
      'users',
      selectedChatUser.id,
      'friends',
      user.id
    );

    try {
      const newNotif: Notif = {
        type: 'friendRequest',
        id: notifId,
        userId: user.id,
        name: user.name,
        photoURL: user.photoURL,
        time: new Date(),
        seen: false,
      };
      // update friend notification
      await setDoc(selectedUserNotifs, newNotif);

      const userNewFriendData: FriendData = {
        id: selectedChatUser.id,
        name: selectedChatUser.name,
        lastMsg: '',
        lastMsgTime: new Date(),
        status: 'send',
        photoURL: selectedChatUser.photoURL,
      };
      await setDoc(userFriendsRef, userNewFriendData);

      //update selectedChatUser friends data
      const selectedUserNewFriendData: FriendData = {
        id: user.id,
        name: user.name,
        lastMsg: '',
        lastMsgTime: new Date(),
        status: 'received',
        photoURL: user.photoURL,
      };
      await setDoc(selectedUserRef, selectedUserNewFriendData);
    } catch (err) {
      console.log(err);
    }
  }

  const alertDisplay = handleAlertDisplay();

  function handleAlertDisplay() {
    if (friendData?.status === 'send' || friendData?.status === 'rejected') {
      return <div className="font-bold">Solicitud de amistad enviada.</div>;
    }
    if (friendData?.status === 'received') {
      return (
        <div className="">
          <div className="">Has recibido una solicitud de amistad.</div>
          <div className="font-bold">
            <button
              onClick={() => handleRequest('accept')}
              className="text-emerald-800 underline"
            >
              Aceptar
            </button>
            <button
              onClick={() => handleRequest('reject')}
              className="ml-4 text-red-800 underline"
            >
              Rechazar
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <button
            onClick={handleSendFriendRequest}
            className="self-start pt-2 font-bold text-emerald-800"
          >
            Enviar solicitud de amistad.
          </button>
        </div>
      );
    }
  }

  async function handleRequest(action: 'accept' | 'reject') {
    const newStatus = action === 'accept' ? 'accepted' : 'rejected';

    try {
      const userRef = doc(db, 'users', user.id, 'friends', selectedChatUser.id);
      const friendRef = doc(
        db,
        'users',
        selectedChatUser.id,
        'friends',
        user.id
      );

      await updateDoc(userRef, {
        status: newStatus,
      });

      const friendDoc = await getDoc(friendRef);
      if (friendDoc.exists()) {
        await updateDoc(friendRef, {
          status: newStatus,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col justify-between bg-zinc-100 text-zinc-900 dark:bg-zinc-900">
      <div className="sticky top-14 z-10 flex items-center gap-4 bg-white px-4 py-2 shadow dark:bg-zinc-800 dark:text-zinc-100">
        <button onClick={close} className="py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>

        <img
          className="h-12 w-12 rounded-full"
          src={selectedChatUser.photoURL}
          alt=""
          referrerPolicy="no-referrer"
        />
        <p className="font-semibold leading-5">{selectedChatUser.name}</p>
      </div>

      <div className="mb-20 flex flex-col gap-8 p-4">
        {chatToJSX}
        {selectedChatUser.name === 'Bot Ayudante' && (
          <div>
            <div
              key={nanoid()}
              className="relative mr-8 w-fit rounded-xl rounded-tl-none bg-white p-4 shadow-sm"
            >
              Bienvenido a DO IT, soy Mike el Bot Ayudante.
            </div>
            <div
              key={nanoid()}
              className="relative mr-8 mt-4 w-fit rounded-xl rounded-tl-none bg-white p-4 shadow-sm"
            >
              En esta ventana de chat recibirás avisos sobre todas las nuevas
              actualizaciones.
            </div>
          </div>
        )}
        {friendData?.status !== 'accepted' &&
          selectedChatUser.name !== 'Bot Ayudante' && (
            <div className="flex w-fit flex-col self-center  rounded-lg bg-yellow-100 p-4 shadow">
              <p>
                Tú y{' '}
                <span className="font-semibold">{selectedChatUser.name}</span>{' '}
                actualmente no son amigos.
              </p>
              <div className="pt-2">{alertDisplay}</div>
            </div>
          )}
      </div>
      <div ref={messageRef} className=""></div>
      {friendData?.status === 'accepted' && (
        <div className="fixed bottom-0 flex w-full items-center  bg-white p-4 shadow-sm dark:bg-zinc-800">
          <input
            className="h-10 w-full rounded-l-lg bg-zinc-200 p-4 dark:bg-zinc-600"
            type="text"
            placeholder="Mensaje"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKey}
          />
          <button
            onClick={handleSubmit}
            className="h-10 rounded-r-lg bg-emerald-800 px-3 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 rotate-90"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
