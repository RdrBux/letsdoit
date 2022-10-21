import { FriendData } from '../../types/types';

type Props = {
  userFriends: FriendData[];
  participants: FriendData[];
  handleParticipants: (clickedFriend: FriendData) => void;
};

export default function DropdownFriends({
  userFriends,
  participants,
  handleParticipants,
}: Props) {
  const participantsDisplay = userFriends.map((friend) => (
    <div
      key={friend.id}
      onClick={() => handleParticipants(friend)}
      className={`flex cursor-pointer items-center justify-between gap-4 p-2 hover:bg-zinc-200 ${
        participants.includes(friend) ? 'bg-zinc-200' : ''
      }`}
    >
      <div className="flex items-center gap-4">
        <img
          className="h-8 w-8 rounded-full"
          src={friend.photoURL}
          alt=""
          referrerPolicy="no-referrer"
        />
        <p>{friend.name}</p>
      </div>
      <div
        className={`${participants.includes(friend) ? 'mr-2 block' : 'hidden'}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </div>
    </div>
  ));

  return (
    <div className="max-h-36 overflow-y-auto rounded-b border font-normal">
      {participantsDisplay}
    </div>
  );
}
