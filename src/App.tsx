import { useState } from 'react';
import AddTaskButton from './components/AddTaskButton/AddTaskButton';
import ContactsNav from './components/ContactsNav/ContactsNav';
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu';
import TopNav from './components/TopNav/TopNav';
import Calendar from 'react-calendar';

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState(new Date())

  function toggleMenu() {
    setMenuOpen(prevState => !prevState);
  }

  return (
    <div className="font-manrope">
      <TopNav toggleMenu={toggleMenu} />
      {menuOpen && <HamburgerMenu />}
      <ContactsNav />
      <AddTaskButton />
      <div className='flex flex-col items-center'>
        <Calendar value={selectedDay} onChange={(value: Date) => setSelectedDay(value)} />
        <div className="">{String(selectedDay)}</div>
      </div>
    </div>
  );
}

export default App;
