import AvatarTwo from '../../assets/avatar2.png';
import AvatarThree from '../../assets/avatar3.png';
import AvatarFour from '../../assets/avatar4.png';
import AvatarFive from '../../assets/avatar5.png';
import msgIcon from '../../assets/msgIcon.svg';

type Props = {
  openMenu: () => void;
};

export default function ContactsNav({ openMenu }: Props) {
  return (
    <div className="flex justify-center gap-4 border-t border-emerald-500/10 bg-emerald-900/90 py-2 px-4 shadow-lg">
      <div className="flex gap-2">
        <img className="h-10 w-10" src={AvatarTwo} alt="" />
        <img className="h-10 w-10" src={AvatarThree} alt="" />
        <img className="h-10 w-10" src={AvatarFour} alt="" />
        <img className="h-10 w-10" src={AvatarFive} alt="" />
      </div>

      <button
        onClick={openMenu}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-black/25 p-3"
      >
        <img src={msgIcon} alt="" />
      </button>
    </div>
  );
}
