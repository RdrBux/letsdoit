import { useContext, useEffect, useState } from 'react';
import AddTaskButton from '../../components/AddTaskButton/AddTaskButton';
import ContactsNav from '../../components/ContactsNav/ContactsNav';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import TopNav from '../../components/TopNav/TopNav';
import Calendar from 'react-calendar';
import DailyTasksDisplay from '../../components/DailyTasksDisplay/DailyTasksDisplay';
import { SelectedUser, SharedTask, Task } from '../../types/types';
import TaskForm from '../../components/TaskForm/TaskForm';
import { collection, onSnapshot } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firebase';
import { format, parseISO } from 'date-fns';
import TaskDisplay from '../../components/TaskDisplay/TaskDisplay';
import ContactsMenu from '../../components/ContactsMenu/ContactsMenu';
import ChatDisplay from '../../components/ChatDisplay/ChatDisplay';
import { FriendsContext } from '../../context/FriendsContext';

function App() {
  const user = useContext(AuthContext);
  const friends = useContext(FriendsContext);

  const userFriends = getFriends();
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [taskDisplayOpen, setTaskDisplayOpen] = useState(false);
  const [contactsMenuOpen, setContactsMenuOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(
    format(new Date(), 'yyyy-MM-dd')
  );
  const [ownTasks, setOwnTasks] = useState<Task[]>([]);
  const [sharedTasks, setSharedTasks] = useState<SharedTask[]>([]);
  const [sharedTasksData, setSharedTasksData] = useState<Task[]>([]);
  const [selectedChatUser, setSelectedChatUser] = useState<SelectedUser | null>(
    null
  );

  const tasks = [
    ...ownTasks,
    ...sharedTasksData.filter((task) =>
      task.participants.some(
        (person) => person.id === user.id && person.isAccepted
      )
    ),
  ];

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'users', user.id || 'unknown', 'tasks'),
      (docs) => {
        const data: any[] = [];
        docs.forEach((doc) => data.push(doc.data()));
        setOwnTasks(data);
      }
    );

    return () => {
      unsub();
    };
  }, [user]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'users', user.id || 'unknown', 'sharedTasks'),
      (docs) => {
        const data: any[] = [];
        docs.forEach((doc) => data.push(doc.data()));
        setSharedTasks(data);
      }
    );

    return () => {
      unsub();
    };
  }, [user]);

  useEffect(() => {
    async function getDocsData() {
      if (sharedTasks.length < 1) return;
      for (const task of sharedTasks) {
        onSnapshot(task.taskRef, (doc: { data: () => any }) => {
          const newTask = doc.data();
          setSharedTasksData((prev) => {
            const filtered = prev.filter((doc) => doc.id !== newTask.id);
            return filtered.concat(newTask);
          });
        });
      }
    }
    getDocsData();
  }, [sharedTasks, user]);

  function getFriends() {
    if (!friends) return [];
    const filteredFriends = friends.filter(
      (friend) => friend.status === 'accepted'
    );
    const sortedFriendByRecentMsg = filteredFriends.sort(
      (a, b) => b.lastMsgTime.toDate() - a.lastMsgTime.toDate()
    );
    return sortedFriendByRecentMsg;
  }

  function toggleMenu() {
    setMenuOpen((prevState) => !prevState);
  }

  function handleCalendarChange(value: Date) {
    setSelectedDay(format(value, 'yyyy-MM-dd'));
  }

  function handleClickTaskButton() {
    setTaskFormOpen(true);
  }

  function selectedTaskBody(id: string) {
    const selected = tasks.find((task) => task.id === id);
    if (!selected) {
      throw new Error('Task not found');
    }

    return selected;
  }

  function selectChatUser(user: SelectedUser) {
    setSelectedChatUser(user);
  }

  return (
    <div className="min-h-screen bg-zinc-100 font-manrope dark:bg-zinc-900">
      {taskFormOpen && (
        <TaskForm
          userFriends={userFriends}
          close={() => setTaskFormOpen(false)}
        />
      )}
      <TopNav
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        selectChatUser={selectChatUser}
        backToHome={() => setSelectedChatUser(null)}
      />
      {menuOpen && (
        <HamburgerMenu
          tasks={tasks}
          handleTaskButton={handleClickTaskButton}
          selectTask={setSelectedTask}
          displayTask={setTaskDisplayOpen}
          close={() => setMenuOpen(false)}
        />
      )}
      {taskDisplayOpen && (
        <TaskDisplay
          task={selectedTaskBody(selectedTask)}
          close={() => setTaskDisplayOpen(false)}
        />
      )}
      {contactsMenuOpen && (
        <ContactsMenu
          userFriends={userFriends}
          close={() => setContactsMenuOpen(false)}
          selectChatUser={selectChatUser}
        />
      )}
      <ContactsNav
        openMenu={() => setContactsMenuOpen(true)}
        userFriends={userFriends}
        selectChatUser={selectChatUser}
      />
      {selectedChatUser ? (
        <ChatDisplay
          selectedChatUser={selectedChatUser}
          close={() => setSelectedChatUser(null)}
        />
      ) : (
        <>
          <AddTaskButton handleClick={handleClickTaskButton} />
          <div className="flex flex-col items-center md:flex-row md:items-start md:justify-center md:gap-8">
            <Calendar
              value={parseISO(selectedDay)}
              onChange={handleCalendarChange}
              minDetail="year"
              tileContent={({ activeStartDate, date, view }) =>
                view === 'month' &&
                tasks.some(
                  (task) => task.date === format(date, 'yyyy-MM-dd')
                ) ? (
                  <div className="absolute top-1 right-2 text-xs text-emerald-700 opacity-50">
                    ⚫
                  </div>
                ) : null
              }
              tileClassName={({ activeStartDate, date, view }) =>
                view === 'month' &&
                tasks.some((task) => task.date === format(date, 'yyyy-MM-dd'))
                  ? 'font-bold'
                  : null
              }
            />
            <DailyTasksDisplay
              date={selectedDay}
              tasks={tasks}
              selectTask={setSelectedTask}
              displayTask={setTaskDisplayOpen}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
