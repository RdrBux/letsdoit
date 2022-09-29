import React from 'react';

export default function TasksSlider() {
  return (
    <div className="p-4 bg-zinc-800 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-emerald-300">Hoy</h3>
        <button>^</button>
      </div>
      <div className="flex flex-col gap-4">
        <label className="flex items-center gap-3">
          <input
            className="w-5 h-5 appearance-none border rounded checked:bg-emerald-500"
            type="checkbox"
          />
          Diseñar aplicación
        </label>
        <label className="flex items-center gap-3">
          <input
            className="w-5 h-5 appearance-none border rounded checked:bg-emerald-500"
            type="checkbox"
          />
          Diseñar aplicación
        </label>
        <label className="flex items-center gap-3">
          <input
            className="w-5 h-5 appearance-none border rounded checked:bg-emerald-500"
            type="checkbox"
          />
          Diseñar aplicación
        </label>
        <label className="flex items-center gap-3">
          <input
            className="w-5 h-5 appearance-none border rounded checked:bg-emerald-500"
            type="checkbox"
          />
          Diseñar aplicación
        </label>
      </div>
    </div>
  );
}
