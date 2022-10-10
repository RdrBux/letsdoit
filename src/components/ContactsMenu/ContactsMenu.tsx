import OutsideAlerter from '../OutsideAlerter/OutsideAlerter';
import AvatarTwo from '../../assets/avatar2.png';
import { useState } from 'react';

type Props = {
  close: () => void;
};

export default function ContactsMenu({ close }: Props) {
  const [searchValue, setSearchValue] = useState('');
  console.log(searchValue);
  function handleClick() {
    console.log('click');
  }

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-zinc-900/80">
      <OutsideAlerter action={close}>
        <div className="relative w-80 rounded-lg bg-white py-6 px-3 text-zinc-800 shadow-lg">
          <button onClick={close} className="absolute top-4 right-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-semibold">CONTACTOS</h1>

          <label className="mt-2 flex items-center gap-2 rounded-lg bg-zinc-200 px-2">
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <input
              className="bg-zinc-200 p-2"
              type="text"
              placeholder="Buscar"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </label>

          <div className="mt-4 flex flex-col gap-2">
            <div
              onClick={handleClick}
              className="flex cursor-pointer items-center gap-4 rounded-lg py-2 hover:bg-zinc-200"
            >
              <img className="h-12 w-12" src={AvatarTwo} alt="" />
              <div>
                <p className="font-semibold">Rodrigo Emmanuel Rodríguez</p>
                <div className="flex justify-between text-sm text-zinc-700">
                  <p className="w-40 overflow-hidden text-ellipsis whitespace-nowrap">
                    Este es el último mensaje. Y e
                  </p>
                  <p className="font-bold">6/07</p>
                </div>
              </div>
            </div>
            <div
              onClick={handleClick}
              className="flex cursor-pointer items-center gap-4 rounded-lg py-2 hover:bg-zinc-200"
            >
              <img className="h-12 w-12" src={AvatarTwo} alt="" />
              <div>
                <p className="font-semibold">Rodrigo Emmanuel Rodríguez</p>
                <div className="flex justify-between text-sm text-zinc-700">
                  <p className="w-40 overflow-hidden text-ellipsis whitespace-nowrap">
                    Este es el último mensaje. Y e
                  </p>
                  <p className="font-bold">6/07</p>
                </div>
              </div>
            </div>
            <div
              onClick={handleClick}
              className="flex cursor-pointer items-center gap-4 rounded-lg py-2 hover:bg-zinc-200"
            >
              <img className="h-12 w-12" src={AvatarTwo} alt="" />
              <div>
                <p className="font-semibold">Rodrigo Emmanuel Rodríguez</p>
                <div className="flex justify-between text-sm text-zinc-700">
                  <p className="w-40 overflow-hidden text-ellipsis whitespace-nowrap">
                    Este es el último mensaje. Y e
                  </p>
                  <p className="font-bold">6/07</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </OutsideAlerter>
    </div>
  );
}
