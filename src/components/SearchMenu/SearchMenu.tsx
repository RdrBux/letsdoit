import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { SelectedUser } from '../../types/types';
import OutsideAlerter from '../OutsideAlerter/OutsideAlerter';

type Props = {
  selectChatUser: (user: SelectedUser) => void;
  close: () => void;
};

export default function SearchMenu({ selectChatUser, close }: Props) {
  const [searchValue, setSearchValue] = useState('');
  const [searchData, setSearchData] = useState<any[]>([]);

  useEffect(() => {
    async function getSearchData() {
      try {
        const usersRef = collection(db, 'users');
        const q = query(
          usersRef,
          where('tags', 'array-contains', searchValue.toLowerCase())
        );
        const querySnapshot = await getDocs(q);
        const data: SelectedUser[] = [];
        querySnapshot.forEach((doc) =>
          data.push({
            name: doc.get('name'),
            photoURL: doc.get('photoURL'),
            id: doc.get('id'),
          })
        );

        setSearchData(data);
      } catch (err) {
        console.log(err);
      }
    }

    if (searchValue.length >= 3) {
      getSearchData();
    } else {
      setSearchData([]);
    }
  }, [searchValue]);

  const dataDisplay = searchData.map((result) => (
    <div
      key={result.id}
      onClick={() => selectChatUser(result)}
      className="flex cursor-pointer items-center gap-4 border-b py-4"
    >
      <img
        className="w-10 rounded-full"
        src={result.photoURL}
        alt=""
        referrerPolicy="no-referrer"
      />
      <p className="font-semibold">{result.name}</p>
    </div>
  ));

  return (
    <OutsideAlerter action={close}>
      <div className="absolute right-0 top-12 w-80 rounded-lg bg-white p-4 text-zinc-800 shadow-lg">
        <label className="flex items-center gap-2 rounded-full bg-zinc-200 px-2">
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
            placeholder="Buscar personas"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </label>
        {dataDisplay.length > 0 && (
          <h2 className="mt-4 text-lg font-bold">Personas</h2>
        )}
        {dataDisplay}
      </div>
    </OutsideAlerter>
  );
}
