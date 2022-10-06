import { useContext, useState } from 'react';
import AddTaskButton from '../../components/AddTaskButton/AddTaskButton';
import ContactsNav from '../../components/ContactsNav/ContactsNav';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import TopNav from '../../components/TopNav/TopNav';
import Calendar from 'react-calendar';
import DailyTasksDisplay from '../../components/DailyTasksDisplay/DailyTasksDisplay';
import { Task } from '../../types/types';
import TaskForm from '../../components/TaskForm/TaskForm';
import { collection, getDocs } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firebase';
import { format, parseISO } from 'date-fns';

function App() {
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(
    format(new Date(), 'yyyy-MM-dd')
  );
  const [selectedDayTasks, setSelectedDayTasks] = useState<Task[]>([]);

  const user = useContext(AuthContext);

  console.log(parseISO(selectedDay));
  console.log(user);

  async function getData() {
    const docs = await getDocs(
      collection(db, 'users', user?.id || '', 'tasks')
    );

    const data: any[] = [];
    docs.forEach((doc) => data.push(doc.data()));
    console.log(data);
  }
  getData();

  function toggleMenu() {
    setMenuOpen((prevState) => !prevState);
  }

  function findTasksByDay(day: string) {
    if (!user) throw new Error('Invalid User');
    const tasks = user.tasks.filter((task) => task.date === day);
    return tasks;
  }

  function handleCalendarChange(value: Date) {
    setSelectedDay(format(value, 'yyyy-MM-dd'));
    const tasks = findTasksByDay(value.toString());
    setSelectedDayTasks(tasks);
  }

  function handleClickTaskButton() {
    setTaskFormOpen(true);
  }

  return (
    <div className="min-h-screen font-manrope">
      {taskFormOpen && <TaskForm close={() => setTaskFormOpen(false)} />}
      <TopNav toggleMenu={toggleMenu} />
      {menuOpen && <HamburgerMenu />}
      <ContactsNav />
      <AddTaskButton handleClick={handleClickTaskButton} />
      <div className="flex flex-col items-center md:flex-row md:items-start md:justify-center md:gap-8">
        <Calendar
          value={parseISO(selectedDay)}
          onChange={handleCalendarChange}
          minDetail="year"
          tileContent={({ activeStartDate, date, view }) =>
            view === 'month' &&
            user?.tasks.some(
              (task) => task.date === format(date, 'yyyy-MM-dd')
            ) ? (
              <div className="absolute top-1 right-2 text-xs text-emerald-700 opacity-50">
                ⚫
              </div>
            ) : null
          }
          /* tileClassName={({ activeStartDate, date, view }) =>
            view === 'month' &&
            personData[0].tasks.some((task) => task.day === date.toString())
              ? 'font-bold'
              : null
          } */
        />
        <DailyTasksDisplay tasks={selectedDayTasks} />
      </div>
    </div>
  );
}

export default App;
