import Avatar from '../../assets/avatar.png';

export default function DropdownFriends() {
  return (
    <div className="mt-2 max-h-36 overflow-y-auto rounded-lg border py-1 font-normal">
      <div className="flex items-center gap-4 p-1 hover:bg-zinc-200">
        <img className="w-8" src={Avatar} alt="" />
        <p>Juan Pérez</p>
      </div>
    </div>
  );
}
