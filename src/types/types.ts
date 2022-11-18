export type TaskParticipant = {
  id: string;
  name: string;
  photoURL: string;
  isAccepted?: boolean;
};

export type Task = {
  id: string;
  date: string;
  description: string;
  hour: string;
  title: string;
  creator: TaskParticipant;
  participants: TaskParticipant[];
};

export type SharedTask = {
  taskRef: any;
};

export type User = {
  id: string;
  name: string;
  email: string;
  photoURL: string;
};

export type UserData = {
  id: string;
  name: string;
  tags: string[];
  email: string;
  bio?: string;
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
  lastMsgTime?: any;
  status: 'accepted' | 'rejected' | 'send' | 'received';
};

export type Notif = {
  type: 'friendRequest' | 'newChat' | 'invitation';
  userId?: string;
  taskRef?: any;
  id: string;
  name: string;
  photoURL: string;
  time: any;
  seen: boolean;
};
