import React from 'react';
import UserSidebar from './components/UserSidebar';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
        <div className="flex-1 flex justify-end">
          <UserSidebar />
        </div>
        <div className="w-[200px] p-4">
          <ThemeToggle />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;