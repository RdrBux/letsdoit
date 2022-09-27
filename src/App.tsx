import { useState } from 'react';
import AddTaskButton from './components/AddTaskButton/AddTaskButton';
import ContactsNav from './components/ContactsNav/ContactsNav';
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu';
import TopNav from './components/TopNav/TopNav';

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  function toggleMenu() {
    setMenuOpen(prevState => !prevState);
  }

  return (
    <div className="font-manrope">
      <TopNav toggleMenu={toggleMenu} />
      {menuOpen && <HamburgerMenu />}
      <ContactsNav />
      <AddTaskButton />
    </div>
  );
}

export default App;
