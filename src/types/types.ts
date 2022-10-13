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
  notifications: Notif[];
};

export type UserData = {
  id: string;
  name: string;
  tags: string[];
  email: string;
  bio?: string;
  darkMode?: boolean;
  friends?: FriendData[];
  photoURL: string;
  notifications: Notif[];
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
  lastMsg: string;
  status: 'accepted' | 'rejected' | 'pending';
};

export type Notif = {
  type: 'friendRequest';
  id: string;
  name: string;
  photoURL: string;
  time: any;
  seen: boolean;
};
