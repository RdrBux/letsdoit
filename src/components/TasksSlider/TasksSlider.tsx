import React, { useState } from 'react';
import { Task } from '../../types/types';
import { sortTasksbyHour } from '../../utils/date';

type Props = {
  title: string;
  tasks: Task[];
};

export default function TasksSlider({ title, tasks }: Props) {
  const [expanded, setExpanded] = useState(false);

  const sortedTasks = sortTasksbyHour(tasks);

  function expandMenu() {
    setExpanded((prev) => !prev);
  }

  const tasksDisplay = sortedTasks.map((task) => (
    <div key={task.id} className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <p className="text-sm font-bold text-zinc-500">{task.hour}</p>
        <p className="font-semibold">{task.title}</p>
      </div>
    </div>
  ));

  return (
    <div className="rounded-lg bg-white p-4 shadow-lg">
      <div
        onClick={expandMenu}
        className="mb flex cursor-pointer items-center justify-between"
      >
        <legend className="text-xl font-bold text-emerald-700">{title}</legend>
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
      {expanded && (
        <div className="mt-4 flex flex-col gap-4">{tasksDisplay}</div>
      )}
    </div>
  );
}
