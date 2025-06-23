import { useState } from 'react';
import { Outlet } from 'react-router';
import { Sider, Navbar } from './components';

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='min-h-screen flex bg-[#F8FBFD]'>
      <aside className='hidden md:block fixed top-0 left-0 w-64 h-screen bg-white shadow-md border-r border-[#f1f5f9] z-30'>
        <Sider />
      </aside>

      <div
        className={`fixed inset-0 z-40 flex md:hidden pointer-events-none`}
        aria-hidden={!sidebarOpen}
      >
        <div
          className={`
            bg-white w-64 shadow-md h-full transform transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            pointer-events-auto
          `}
        >
          <Sider />
        </div>

        <div
          className={` flex-1 transition-opacity duration-300 ${
            sidebarOpen
              ? 'bg-opacity-50 pointer-events-auto'
              : 'bg-opacity-0 pointer-events-none'
          }
          `}
          onClick={() => setSidebarOpen(false)}
        />
      </div>

      <div className='flex flex-col flex-1 min-w-0 md:ml-64'>
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className='flex-1 overflow-auto px-4 md:px-14 py-12'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
