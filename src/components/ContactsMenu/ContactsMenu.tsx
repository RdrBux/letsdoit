import OutsideAlerter from '../OutsideAlerter/OutsideAlerter';
import AvatarTwo from '../../assets/avatar2.png';
import { useState } from 'react';

type Props = {
  close: () => void;
};

export default function ContactsMenu({ close }: Props) {
  const [searchValue, setSearchValue] = useState('');

  function handleClick() {
    console.log('click');
  }

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-zinc-900/80">
      <OutsideAlerter action={close}>
        <div className="flex w-80 flex-col rounded-lg shadow-lg">
          <div className="flex items-center justify-between rounded-t-lg border-b border-emerald-500/10 bg-gradient-to-b from-emerald-600 to-emerald-700 p-4 text-white">
            <h1 className="text-2xl font-bold">CONTACTOS</h1>
            <button onClick={close} className="">
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
          </div>

          <div className="flex flex-col gap-4 rounded-b-lg bg-white p-4 text-zinc-700">
            <label className="flex items-center gap-2 rounded-full bg-zinc-200 px-4">
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

            <div className="flex flex-col gap-2">
              <div
                onClick={handleClick}
                className="flex cursor-pointer items-center gap-4 rounded-lg py-2 hover:bg-zinc-100"
              >
                <img className="h-12 w-12" src={AvatarTwo} alt="" />
                <div className="w-full">
                  <p className="font-semibold">Rodrigo Rodríguez</p>
                  <div className="flex justify-between text-sm text-zinc-700">
                    <p className="w-44 overflow-hidden text-ellipsis whitespace-nowrap">
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
                <div className="w-full">
                  <p className="font-semibold">Rodrigo Rodríguez</p>
                  <div className="flex justify-between text-sm text-zinc-700">
                    <p className="w-44 overflow-hidden text-ellipsis whitespace-nowrap">
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
                <div className="w-full">
                  <p className="font-semibold">Rodrigo Rodríguez</p>
                  <div className="flex justify-between text-sm text-zinc-700">
                    <p className="w-44 overflow-hidden text-ellipsis whitespace-nowrap">
                      Este es el último mensaje. Y e
                    </p>
                    <p className="font-bold">6/07</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </OutsideAlerter>
    </div>
  );
}
