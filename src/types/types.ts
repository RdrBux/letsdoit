export type Task = {
  id: string;
  day: string;
  time: number;
  title: string;
  description: string;
  people: string[];
  sendMsg: null | string;
};

export type Person = {
  id: string;
  tasks: Task[];
};
