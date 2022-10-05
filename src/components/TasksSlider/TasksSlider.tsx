import React from 'react';

export default function TasksSlider() {
  return (
    <fieldset className="rounded-lg bg-white p-4 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <legend className="text-xl font-bold text-emerald-700">Vista</legend>
        <button>^</button>
      </div>
      <div className="flex flex-col gap-4">
        <label className="flex items-center gap-3">
          <input
            className="h-5 w-5 appearance-none rounded-full border border-zinc-400 checked:bg-emerald-500"
            type="radio"
            name="view"
            id="calendar"
          />
          Calendario
        </label>
        <label className="flex items-center gap-3">
          <input
            className="h-5 w-5 appearance-none rounded-full border border-zinc-400 checked:bg-emerald-500"
            type="radio"
            name="view"
            id="day"
          />
          Día
        </label>
        <label className="flex items-center gap-3">
          <input
            className="h-5 w-5 appearance-none rounded-full border border-zinc-400 checked:bg-emerald-500"
            type="radio"
            name="view"
            id="week"
          />
          Semana
        </label>
        <label className="flex items-center gap-3">
          <input
            className="h-5 w-5 appearance-none rounded-full border border-zinc-400 checked:bg-emerald-500"
            type="radio"
            name="view"
            id="month"
          />
          Mes
        </label>
      </div>
    </fieldset>
  );
}
