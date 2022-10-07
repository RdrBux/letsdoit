import { Task } from '../types/types';

export function sortTasksbyHour(arr: Task[]) {
  const newArr = [...arr].sort(
    (a, b) =>
      Number(a.hour.replace(':', '.')) - Number(b.hour.replace(':', '.'))
  );
  return newArr;
}
