import React from 'react';

export default function TasksSlider() {
  return (
    <fieldset className="p-4 bg-zinc-100 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <legend className="text-xl font-bold text-emerald-700">Vista</legend>
        <button>^</button>
      </div>
      <div className="flex flex-col gap-4">
        <label className="flex items-center gap-3">
          <input
            className="w-5 h-5 appearance-none border border-zinc-400 rounded-full checked:bg-emerald-500"
            type="radio"
            name="view"
            id="calendar"
          />
          Calendario
        </label>
        <label className="flex items-center gap-3">
          <input
            className="w-5 h-5 appearance-none border border-zinc-400 rounded-full checked:bg-emerald-500"
            type="radio"
            name="view"
            id="day"
          />
          Día
        </label>
        <label className="flex items-center gap-3">
          <input
            className="w-5 h-5 appearance-none border border-zinc-400 rounded-full checked:bg-emerald-500"
            type="radio"
            name="view"
            id="week"
          />
          Semana
        </label>
        <label className="flex items-center gap-3">
          <input
            className="w-5 h-5 appearance-none border border-zinc-400 rounded-full checked:bg-emerald-500"
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
