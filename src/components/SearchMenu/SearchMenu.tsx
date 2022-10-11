import { useState } from 'react';
import OutsideAlerter from '../OutsideAlerter/OutsideAlerter';

type Props = {
  close: () => void;
};

export default function SearchMenu({ close }: Props) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <OutsideAlerter action={close}>
      <div className="absolute right-0 top-12 w-80 rounded-lg bg-white px-4 text-zinc-800 shadow-lg">
        <label className="mt-2 flex items-center gap-2 rounded-full bg-zinc-200 px-2">
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
      </div>
    </OutsideAlerter>
  );
}
