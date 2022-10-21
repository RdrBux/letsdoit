import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import OutsideAlerter from '../OutsideAlerter/OutsideAlerter';
import { doc, setDoc, collection } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firebase';
import DropdownFriends from '../DropdownFriends/DropdownFriends';
import FormInput from '../FormInput/FormInput';
import { FriendData } from '../../types/types';

type Props = {
  userFriends: FriendData[];
  close: () => void;
};

export default function TaskForm({ userFriends, close }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [hour, setHour] = useState(format(new Date(), 'HH:mm'));
  const [openPeople, setOpenPeople] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState<
    FriendData[]
  >([]);

  const user = useContext(AuthContext);

  async function handleSubmitForm(e: React.BaseSyntheticEvent) {
    e.preventDefault();

    try {
      close();
      const docRef = doc(collection(db, 'users', user.id, 'tasks'));
      await setDoc(docRef, {
        id: docRef.id,
        title: title,
        description: description,
        date: date,
        hour: hour,
      });
    } catch (err) {
      console.log(err);
    }
    setTitle('');
    setDescription('');
    setDate(format(new Date(), 'yyyy-MM-dd'));
    setHour(format(new Date(), 'HH:mm'));
  }

  const displayParticipants = selectedParticipants.map((friend) => (
    <img
      key={friend.id}
      className="h-8 w-8 rounded-full"
      src={friend.photoURL}
      alt=""
      referrerPolicy="no-referrer"
    />
  ));

  function handleParticipants(clickedFriend: FriendData) {
    setSelectedParticipants((prevState) =>
      prevState.some((friend) => friend.id === clickedFriend.id)
        ? prevState.filter((friend) => friend.id !== clickedFriend.id)
        : prevState.concat(clickedFriend)
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-zinc-900/80">
      <OutsideAlerter action={close}>
        <div className="flex w-80 flex-col rounded-lg shadow-lg">
          <div className="flex items-center justify-between rounded-t-lg bg-white px-4 pt-4 text-zinc-800">
            <h1 className="text-2xl font-bold">AGREGAR ACTIVIDAD</h1>
            <button onClick={close} className="top-4 right-4">
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
            <form
              onSubmit={handleSubmitForm}
              className="flex flex-col gap-4 font-semibold text-zinc-600"
            >
              <FormInput
                label="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <FormInput
                label="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required={false}
              />

              <div className="flex gap-4">
                <FormInput
                  label="Fecha"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />

                <FormInput
                  label="Hora"
                  type="time"
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                />
              </div>
              <div className="border-y py-4">
                <div
                  className={`flex flex-col gap-1 rounded-t p-2 text-zinc-800 ${
                    openPeople
                      ? 'border-b-2 border-emerald-800 bg-zinc-200'
                      : 'border-b border-zinc-500 bg-zinc-100'
                  }`}
                >
                  Participantes
                  <div className="flex flex-wrap items-center gap-2">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.photoURL}
                      alt=""
                      referrerPolicy="no-referrer"
                    />
                    <div>{displayParticipants}</div>
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
                {openPeople && (
                  <DropdownFriends
                    userFriends={userFriends}
                    participants={selectedParticipants}
                    handleParticipants={handleParticipants}
                  />
                )}
              </div>
              <button className="flex w-fit items-center gap-1 rounded-lg bg-emerald-700 py-2 px-8 font-bold text-white shadow-lg">
                AGREGAR
              </button>
            </form>
          </div>
        </div>
      </OutsideAlerter>
    </div>
  );
}
