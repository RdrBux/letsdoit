export type Task = {
  id: string;
  date: string;
  description: string;
  hour: string;
  title: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  tasks: Task[];
};
