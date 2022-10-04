import { format } from 'date-fns';
import React, { useState } from 'react';
import OutsideAlerter from '../OutsideAlerter/OutsideAlerter';

type Props = {
  close: () => void;
};

export default function TaskForm({ close }: Props) {
  const [title, setTitle] = useState('título');
  const [description, setDescription] = useState('descripción');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [hour, setHour] = useState(format(new Date(), 'HH:mm'));

  function handleSubmitForm(e: React.BaseSyntheticEvent) {
    e.preventDefault();

    setTitle('');
    setDescription('');
    setDate(format(new Date(), 'yyyy-MM-dd'));
    setHour(format(new Date(), 'HH:mm'));
  }

  return (
    <div className="absolute inset-0 w-screen h-screen z-50 bg-zinc-900/80 flex items-center justify-center">
      <OutsideAlerter action={close}>
        <div className="bg-white p-6 rounded-lg relative min-w-[320px] shadow-lg">
          <button onClick={close} className="absolute top-4 right-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h1 className="text-lg font-bold">AGREGAR EVENTO</h1>
          <form
            onSubmit={handleSubmitForm}
            className="font-bold text-sm text-zinc-600 mt-4 flex flex-col gap-3"
          >
            <label className="flex flex-col gap-2">
              Título
              <input
                className="h-8 pl-2 border"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-2">
              Descripción
              <input
                className="h-8 pl-2 border"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <div className="flex gap-4">
              <label className="flex flex-col gap-2">
                Fecha
                <input
                  className="h-8 pl-2 border"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
              <label className="flex flex-col gap-2">
                Hora
                <input
                  className="h-8 pl-2 border"
                  type="time"
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                />
              </label>
            </div>
            <label className="flex flex-col gap-2">
              Participantes
              <input
                className="h-8 pl-2 border"
                type="text"
                placeholder="Solo yo"
              />
            </label>
            <button className="mt-4 font-bold text-sm text-white flex items-center w-fit gap-2 py-3 px-8 bg-emerald-700 rounded-lg shadow-lg">
              AGREGAR
            </button>
          </form>
        </div>
      </OutsideAlerter>
    </div>
  );
}
