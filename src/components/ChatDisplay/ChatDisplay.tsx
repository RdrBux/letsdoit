import {
  arrayUnion,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { KeyboardEvent, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firebase';
import { FriendData, Notif, SelectedUser } from '../../types/types';
import { nanoid } from 'nanoid';
import { formatDistanceToNowStrict } from 'date-fns';
import { es } from 'date-fns/locale';

type Props = {
  selectedChatUser: SelectedUser;
  close: () => void;
};

export default function ChatDisplay({ selectedChatUser, close }: Props) {
  const user = useContext(AuthContext);
  const [chatData, setChatData] = useState<DocumentData | undefined>();
  const [message, setMessage] = useState('');
  const [friendRequestSend, setFriendRequestSend] = useState(false);
  const messageRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    async function fetchChat() {
      try {
        if (!user) return;
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
    if (!user) return;
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
    scrollToBottom();
  }, [chatData]);

  useEffect(() => {
    async function checkFriend() {
      if (!user) return;
      try {
        const userRef = doc(db, 'users', user.id);
        const friendsDoc = await getDoc(userRef);
        if (friendsDoc.exists()) {
          const friendsData = friendsDoc.data();
          if (
            friendsData.friends.some(
              (friend: { id: string; status: string }) =>
                friend.id === selectedChatUser.id &&
                friend.status !== 'accepted'
            )
          ) {
            setFriendRequestSend(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    checkFriend();
  }, [user]);

  function chatDataToJSX() {
    if (chatData === undefined) return;
    if (chatData === null) return;
    if (!user) return;

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
    if (!user) return;
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
          msg: message,
        }),
      });
    } catch (err) {
      console.log(err);
    }
    setMessage('');
  }
  function handleKey(e: KeyboardEvent) {
    if (e.code === 'Enter') {
      handleSubmit();
    }
  }

  function scrollToBottom() {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }

  const isFriend = user?.friends.some(
    (friend) =>
      friend.id === selectedChatUser.id && friend.status === 'accepted'
  );

  async function handleSendFriendRequest() {
    if (!user) return;
    const docRef = doc(db, 'users', selectedChatUser.id);
    const userFriendsRef = doc(db, 'users', user?.id || 'unknown');

    try {
      setFriendRequestSend(true);

      const newNotif: Notif = {
        type: 'friendRequest',
        id: nanoid(),
        userId: user.id,
        name: user.name,
        photoURL: user.photoURL,
        time: new Date(),
        seen: false,
      };
      await updateDoc(docRef, {
        notifications: arrayUnion(newNotif),
      });

      const newFriendData: FriendData = {
        id: selectedChatUser.id,
        name: selectedChatUser.name,
        lastMsg: '',
        status: 'pending',
      };
      await updateDoc(userFriendsRef, {
        friends: arrayUnion(newFriendData),
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col justify-between bg-zinc-100 text-zinc-900">
      <div className="sticky top-14 z-10 flex items-center gap-4 bg-white px-4 py-2 shadow">
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
        {!isFriend && (
          <div className="flex w-fit flex-col self-center  rounded-lg bg-yellow-100 p-4 shadow">
            <p>
              Tú y{' '}
              <span className="font-semibold">{selectedChatUser.name}</span>{' '}
              actualmente no son amigos.
            </p>
            {friendRequestSend ? (
              <p className="pt-2 font-bold">Solicitud de amistad enviada.</p>
            ) : (
              <button
                onClick={handleSendFriendRequest}
                className="self-start pt-2 font-bold text-emerald-800"
              >
                Enviar solicitud de amistad.
              </button>
            )}
          </div>
        )}
      </div>
      <div ref={messageRef} className=""></div>
      {isFriend && (
        <div className="fixed bottom-0 flex w-full items-center  bg-white p-4 shadow-sm">
          <input
            className="h-10 w-full rounded-l-lg bg-zinc-200 p-4"
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
