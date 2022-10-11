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

export type UserData = {
  id: string;
  name: string;
  bio?: string;
  darkMode?: boolean;
  friends?: string[];
};
