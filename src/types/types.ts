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
  tags: string[];
  email: string;
  bio?: string;
  darkMode?: boolean;
  friends?: string[];
  photoURL: string;
};

export type SelectedUser = {
  id: string;
  name: string;
  photoURL: string;
};

export type Chat = {
  id: string;
  time: Date;
  msg: string;
};
