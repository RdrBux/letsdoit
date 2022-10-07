import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import { es } from 'date-fns/locale';
import { useState } from 'react';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { Task } from '../../types/types';

type Props = {
  type: 'day' | 'week' | 'month';
  tasks: Task[];
};

export default function TasksSlider({ type, tasks }: Props) {
  const [expanded, setExpanded] = useState(type === 'day' ? true : false);

  const titleByType = {
    day: 'Hoy',
    week: 'Esta semana',
    month: 'Este mes',
  };

  function expandMenu() {
    setExpanded((prev) => !prev);
  }

  function displayByType(task: Task) {
    if (type === 'day') {
      return (
        <p className="w-8 text-sm font-bold uppercase text-zinc-500">
          {task.hour}
        </p>
      );
    }
    if (type === 'week') {
      return (
        <p className="w-8 text-sm font-bold uppercase text-zinc-500">
          {format(parseISO(task.date), 'eee', { locale: es })}
        </p>
      );
    }
    if (type === 'month') {
      return (
        <p className="w-14 text-sm font-bold uppercase text-zinc-500">
          {format(parseISO(task.date), 'eee, dd', { locale: es })}
        </p>
      );
    }
  }

  const tasksDisplay = tasks.map((task) => (
    <div key={task.id} className="flex items-center gap-4">
      {displayByType(task)}
      <p className="font-semibold">{task.title}</p>
    </div>
  ));

  return (
    <div className="rounded-lg bg-white p-4 shadow-lg">
      <div
        onClick={expandMenu}
        className="mb flex cursor-pointer items-center justify-between"
      >
        <legend className="text-xl font-bold text-emerald-700">
          {titleByType[type]}
        </legend>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`h-6 w-6 ${expanded && 'rotate-180'}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      <div className={`${expanded ? 'block' : 'hidden'}`}>
        {tasks.length > 0 ? (
          <div className="mt-4 flex flex-col gap-2">{tasksDisplay}</div>
        ) : (
          <div className="mt-4">Sin actividades.</div>
        )}
      </div>
    </div>
  );
}
