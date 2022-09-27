import React from 'react';
import AddTaskButton from './components/AddTaskButton/AddTaskButton';
import ContactsNav from './components/ContactsNav/ContactsNav';
import TopNav from './components/TopNav/TopNav';

function App() {
  return (
    <div className="font-manrope">
      <TopNav />
      <ContactsNav />
      <AddTaskButton />
    </div>
  );
}

export default App;
