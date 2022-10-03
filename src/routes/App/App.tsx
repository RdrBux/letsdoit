import { useState } from 'react';
import AddTaskButton from '../../components/AddTaskButton/AddTaskButton';
import ContactsNav from '../../components/ContactsNav/ContactsNav';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import TopNav from '../../components/TopNav/TopNav';
import Calendar from 'react-calendar';
import person from '../../data';
import DailyTasksDisplay from '../../components/DailyTasksDisplay/DailyTasksDisplay';
import { Task } from '../../types/types';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedDayTasks, setSelectedDayTasks] = useState<Task[]>([]);
  const [personData, setPersonData] = useState(person);

  function toggleMenu() {
    setMenuOpen((prevState) => !prevState);
  }

  function findTasksByDay(day: string) {
    const tasks = personData[0].tasks.filter((task) => task.day === day);
    return tasks;
  }

  function handleCalendarChange(value: Date) {
    setSelectedDay(value);
    const tasks = findTasksByDay(value.toString());
    setSelectedDayTasks(tasks);
  }

  return (
    <div className="font-manrope min-h-screen">
      <TopNav toggleMenu={toggleMenu} />
      {menuOpen && <HamburgerMenu />}
      <ContactsNav />
      <AddTaskButton />
      <div className="flex flex-col items-center md:flex-row md:justify-center md:items-start md:gap-8">
        <Calendar
          value={selectedDay}
          onChange={handleCalendarChange}
          minDetail="year"
          tileContent={({ activeStartDate, date, view }) =>
            view === 'month' &&
            personData[0].tasks.some((task) => task.day === date.toString()) ? (
              <div className="absolute top-1 right-2 text-xs">⚫</div>
            ) : null
          }
          tileClassName={({ activeStartDate, date, view }) =>
            view === 'month' &&
            personData[0].tasks.some((task) => task.day === date.toString())
              ? 'font-bold'
              : null
          }
        />
        <DailyTasksDisplay tasks={selectedDayTasks} />
      </div>
      {/* <div className="">
        <MonthPicker />
        <MonthDisplay />
      </div> */}
    </div>
  );
}

export default App;
