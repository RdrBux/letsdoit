import { format } from 'date-fns';
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useContext,
  useState,
} from 'react';
import OutsideAlerter from '../OutsideAlerter/OutsideAlerter';
import { doc, setDoc, collection } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firebase';
import Avatar from '../../assets/avatar.png';
import DropdownFriends from '../DropdownFriends/DropdownFriends';
import FormInput from '../FormInput/FormInput';

type Props = {
  close: () => void;
};

export default function TaskForm({ close }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [hour, setHour] = useState(format(new Date(), 'HH:mm'));
  const [openPeople, setOpenPeople] = useState(false);

  const user = useContext(AuthContext);

  async function handleSubmitForm(e: React.BaseSyntheticEvent) {
    e.preventDefault();

    try {
      const docRef = doc(
        collection(db, 'users', user?.id || 'unknown', 'tasks')
      );
      close();
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

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-zinc-900/80">
      <OutsideAlerter action={close}>
        <div className="flex w-80 flex-col rounded-lg shadow-lg">
          <div className="flex items-center justify-between rounded-t-lg border-b bg-white p-4 text-zinc-800">
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
              <button className="mt-4 flex w-fit items-center gap-1 rounded-lg bg-emerald-700 py-2 px-8 font-bold text-white shadow-lg">
                AGREGAR
              </button>
            </form>
          </div>
        </div>
      </OutsideAlerter>
    </div>
  );
}
