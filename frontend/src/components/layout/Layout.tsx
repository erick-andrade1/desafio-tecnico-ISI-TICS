import { useState } from 'react';
import { Outlet } from 'react-router';
import { Sider, Navbar } from './components';

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='flex min-h-screen w-full relative'>
      <div className='hidden md:block'>
        <Sider />
      </div>

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

      <div className='flex flex-col w-full'>
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <div className='flex-1 w-full bg-[#F8FBFD] overflow-auto px-4 md:px-14 py-12'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
