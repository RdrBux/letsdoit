import msgIcon from '../../assets/msgIcon.svg';
import { FriendData, SelectedUser } from '../../types/types';

type Props = {
  openMenu: () => void;
  userFriends: FriendData[];
  selectChatUser: (user: SelectedUser) => void;
};

export default function ContactsNav({
  openMenu,
  userFriends,
  selectChatUser,
}: Props) {
  const friendsAvatars = getAvatarButtons();

  function getAvatarButtons() {
    if (!userFriends) return;
    return userFriends.map((friend) => (
      <img
        key={friend.id}
        onClick={() => selectUser(friend)}
        className="h-10 w-10 cursor-pointer rounded-full"
        src={friend.photoURL}
        alt=""
        referrerPolicy="no-referrer"
      />
    ));
  }

  function selectUser(user: FriendData) {
    selectChatUser({
      id: user.id,
      name: user.name,
      photoURL: user.photoURL,
    });
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
