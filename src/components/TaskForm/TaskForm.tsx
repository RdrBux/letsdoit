import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import OutsideAlerter from '../OutsideAlerter/OutsideAlerter';
import { doc, addDoc, collection } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firebase';
import Avatar from '../../assets/avatar.png';
import DropdownFriends from '../DropdownFriends/DropdownFriends';
import { nanoid } from 'nanoid';

type Props = {
  close: () => void;
};

export default function TaskForm({ close }: Props) {
  const [title, setTitle] = useState('título');
  const [description, setDescription] = useState('descripción');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [hour, setHour] = useState(format(new Date(), 'HH:mm'));
  const [openPeople, setOpenPeople] = useState(false);

  const user = useContext(AuthContext);

  async function handleSubmitForm(e: React.BaseSyntheticEvent) {
    e.preventDefault();

    // ACTIONS HERE

    const docRef = doc(db, 'users', user?.id || 'unknown');
    const colRef = collection(docRef, 'tasks');

    await addDoc(colRef, {
      id: nanoid(),
      title: title,
      description: description,
      date: date,
      hour: hour,
    });

    setTitle('');
    setDescription('');
    setDate(format(new Date(), 'yyyy-MM-dd'));
    setHour(format(new Date(), 'HH:mm'));
    close();
  }

  return (
    <div className="absolute inset-0 z-50 flex h-screen w-screen items-center justify-center bg-zinc-900/80">
      <OutsideAlerter action={close}>
        <div className="relative w-80 rounded-lg bg-white p-6 text-zinc-700 shadow-lg">
          <button onClick={close} className="absolute top-6 right-6">
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
          <h1 className="text-lg font-bold">AGREGAR ACTIVIDAD</h1>
          <form
            onSubmit={handleSubmitForm}
            className="mt-4 flex flex-col gap-4 text-sm font-bold text-zinc-600"
          >
            <label className="flex flex-col gap-1">
              Título
              <input
                className="h-10 rounded-lg border p-2 font-normal shadow"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1">
              Descripción
              <input
                className="h-10 rounded-lg border p-2 font-normal shadow"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <div className="flex gap-4">
              <label className="flex flex-col gap-1">
                Fecha
                <input
                  className="h-10 rounded-lg border p-2 font-normal shadow"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
              <label className="flex flex-col gap-1">
                Hora
                <input
                  className="h-10 rounded-lg border p-2 font-normal shadow"
                  type="time"
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                />
              </label>
            </div>
            <div>
              <div className="flex flex-col gap-1">
                Participantes
                <div className="flex items-center gap-2">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user?.photoURL || Avatar}
                    alt=""
                    referrerPolicy="no-referrer"
                  />
                  <button
                    type="button"
                    onClick={() => setOpenPeople((prev) => !prev)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-400 text-white"
                  >
                    {!openPeople && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v12m6-6H6"
                        />
                      </svg>
                    )}
                    {openPeople && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 12H6"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              {openPeople && <DropdownFriends />}
            </div>
            <button className="mt-4 flex w-fit items-center gap-1 rounded-lg bg-emerald-700 py-3 px-8 text-sm font-bold text-white shadow-lg">
              AGREGAR
            </button>
          </form>
        </div>
      </OutsideAlerter>
    </div>
  );
}
