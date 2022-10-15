import { useContext, useEffect, useState } from 'react';
import AddTaskButton from '../../components/AddTaskButton/AddTaskButton';
import ContactsNav from '../../components/ContactsNav/ContactsNav';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import TopNav from '../../components/TopNav/TopNav';
import Calendar from 'react-calendar';
import DailyTasksDisplay from '../../components/DailyTasksDisplay/DailyTasksDisplay';
import { SelectedUser, Task } from '../../types/types';
import TaskForm from '../../components/TaskForm/TaskForm';
import { collection, getDocs } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firebase';
import { format, parseISO } from 'date-fns';
import TaskDisplay from '../../components/TaskDisplay/TaskDisplay';
import ContactsMenu from '../../components/ContactsMenu/ContactsMenu';
import ChatDisplay from '../../components/ChatDisplay/ChatDisplay';
import { FriendsContext } from '../../context/FriendsContext';

function App() {
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [taskDisplayOpen, setTaskDisplayOpen] = useState(false);
  const [contactsMenuOpen, setContactsMenuOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(
    format(new Date(), 'yyyy-MM-dd')
  );
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedChatUser, setSelectedChatUser] = useState<SelectedUser | null>(
    null
  );

  const user = useContext(AuthContext);
  const friends = useContext(FriendsContext);

  useEffect(() => {
    async function getData() {
      try {
        if (!user) return;
        const collectionRef = collection(db, 'users', user.id, 'tasks');
        const docs = await getDocs(collectionRef);
        const data: any[] = [];
        docs.forEach((doc) => {
          data.push(doc.data());
        });
        setTasks(data);
      } catch (err) {
        console.log(err);
      }
    }
    return () => {
      getData();
    };
  }, [user, taskFormOpen]);

  function toggleMenu() {
    setMenuOpen((prevState) => !prevState);
  }

  function handleCalendarChange(value: Date) {
    setSelectedDay(format(value, 'yyyy-MM-dd'));
  }

  function handleClickTaskButton() {
    setTaskFormOpen(true);
  }

  function removeFromTasksState(id: string) {
    setTasks((prevState) => prevState.filter((task) => task.id !== id));
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
    <div className="min-h-screen bg-zinc-100 font-manrope">
      {taskFormOpen && <TaskForm close={() => setTaskFormOpen(false)} />}
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
        />
      )}
      {taskDisplayOpen && (
        <TaskDisplay
          task={selectedTaskBody(selectedTask)}
          close={() => setTaskDisplayOpen(false)}
          remove={removeFromTasksState}
        />
      )}
      {contactsMenuOpen && (
        <ContactsMenu close={() => setContactsMenuOpen(false)} />
      )}
      <ContactsNav openMenu={() => setContactsMenuOpen(true)} />
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
