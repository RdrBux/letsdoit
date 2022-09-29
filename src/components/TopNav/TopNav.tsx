import hamburger from '../../assets/hamburger.svg';
import notificationIcon from '../../assets/notificationIcon.svg';
import avatar from '../../assets/avatar.png';

type TopNavProps = {
  toggleMenu: any;
};

export default function TopNav({ toggleMenu }: TopNavProps) {
  return (
    <div className="sticky top-0 z-10 bg-emerald-900 p-4 text-white flex items-center justify-between">
      <div className="flex items-center gap-6">
        <button onClick={toggleMenu}>
          <img className="w-6" src={hamburger} alt="" />
        </button>
        <h1 className="text-2xl font-bold">LET'S DO IT</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 flex items-center justify-center bg-emerald-800/75 rounded-full">
          <img className="w-4" src={notificationIcon} alt="" />
        </button>
        <button>
          <img className="w-10" src={avatar} alt="" />
        </button>
      </div>
    </div>
  );
}
