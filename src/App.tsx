import { useState } from 'react';
import AddTaskButton from './components/AddTaskButton/AddTaskButton';
import ContactsNav from './components/ContactsNav/ContactsNav';
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu';
import TopNav from './components/TopNav/TopNav';
import Calendar from 'react-calendar';
import person from './data';
import DailyTasksDisplay from './components/DailyTasksDisplay/DailyTasksDisplay';
import { Task } from './types/types';

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

  console.log(findTasksByDay(selectedDay.toString()));

  return (
    <div className="font-manrope">
      <TopNav toggleMenu={toggleMenu} />
      {menuOpen && <HamburgerMenu />}
      <ContactsNav />
      <AddTaskButton />
      <div className="flex flex-col items-center">
        <Calendar value={selectedDay} onChange={handleCalendarChange} />
        <DailyTasksDisplay tasks={selectedDayTasks} />
      </div>
    </div>
  );
}

export default App;
