import React from 'react';

export default function TasksSlider() {
  return (
    <fieldset className="p-4 bg-zinc-800 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <legend className="text-xl font-bold text-emerald-200">Vista</legend>
        <button>^</button>
      </div>
      <div className="flex flex-col gap-4">
        <label className="flex items-center gap-3">
          <input
            className="w-5 h-5 appearance-none border rounded-full checked:bg-emerald-500"
            type="radio"
            name="view"
            id="calendar"
          />
          Calendario
        </label>
        <label className="flex items-center gap-3">
          <input
            className="w-5 h-5 appearance-none border rounded-full checked:bg-emerald-500"
            type="radio"
            name="view"
            id="day"
          />
          Día
        </label>
        <label className="flex items-center gap-3">
          <input
            className="w-5 h-5 appearance-none border rounded-full checked:bg-emerald-500"
            type="radio"
            name="view"
            id="week"
          />
          Semana
        </label>
        <label className="flex items-center gap-3">
          <input
            className="w-5 h-5 appearance-none border rounded-full checked:bg-emerald-500"
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
