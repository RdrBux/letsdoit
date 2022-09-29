import React from 'react';
import AvatarTwo from '../../assets/avatar2.png';
import AvatarThree from '../../assets/avatar3.png';
import AvatarFour from '../../assets/avatar4.png';
import AvatarFive from '../../assets/avatar5.png';
import msgIcon from '../../assets/msgIcon.svg';

export default function ContactsNav() {
  return (
    <div className="flex bg-emerald-900/90 py-2 px-4 gap-4 justify-center">
      <div className="flex gap-4 overflow-x-auto">
        <img className="w-10 h-10" src={AvatarTwo} alt="" />
        <img className="w-10 h-10" src={AvatarThree} alt="" />
        <img className="w-10 h-10" src={AvatarFour} alt="" />
        <img className="w-10 h-10" src={AvatarFive} alt="" />
      </div>

      <button className="w-10 h-10 bg-emerald-900/50 p-3 rounded-full flex items-center justify-center">
        <img src={msgIcon} alt="" />
      </button>
    </div>
  );
}
