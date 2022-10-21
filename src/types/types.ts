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
  friends: FriendData[];
};

export type UserData = {
  id: string;
  name: string;
  tags: string[];
  email: string;
  bio?: string;
  darkMode?: boolean;
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

export type FriendData = {
  id: string;
  name: string;
  photoURL: string;
  lastMsg: string;
  status: 'accepted' | 'rejected' | 'send' | 'received';
};

export type Notif = {
  type: 'friendRequest';
  userId?: string;
  id: string;
  name: string;
  photoURL: string;
  time: any;
  seen: boolean;
};
