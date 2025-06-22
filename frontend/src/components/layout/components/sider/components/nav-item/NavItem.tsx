import type { ISiderItems } from '@/types';
import { useLocation } from 'react-router';

export function NavItem({ icon, label, path }: ISiderItems) {
  const location = useLocation();

  const isActive = location.pathname === path;

  return (
    <a
      href={path}
      className={`flex items-center gap-3 px-6 py-2 rounded-lg mx-2 font-semibold text-black ${
        isActive ? 'bg-gray-100 ' : ' hover:bg-gray-100'
      }`}
    >
      <span className='material-symbols-outlined'>{icon}</span>
      {label}
    </a>
  );
}
