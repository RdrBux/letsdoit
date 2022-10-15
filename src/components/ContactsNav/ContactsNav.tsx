import { useContext } from 'react';
import msgIcon from '../../assets/msgIcon.svg';
import { FriendsContext } from '../../context/FriendsContext';
import { FriendData } from '../../types/types';

type Props = {
  openMenu: () => void;
  userFriends: FriendData[];
};

export default function ContactsNav({ openMenu, userFriends }: Props) {
  const friendsAvatars = getAvatarButtons();

  function getAvatarButtons() {
    if (!userFriends) return;
    return userFriends.map((friend) => (
      <img
        key={friend.id}
        className="h-10 w-10 rounded-full"
        src={friend.photoURL}
        alt=""
        referrerPolicy="no-referrer"
      />
    ));
  }

  return (
    <div className="flex justify-center gap-4 border-t border-emerald-500/10 bg-emerald-900/90 py-2 px-4 shadow-lg">
      <div className="flex gap-2">{friendsAvatars}</div>

      <button
        onClick={openMenu}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-black/25 p-3"
      >
        <img src={msgIcon} alt="" />
      </button>
    </div>
  );
}
