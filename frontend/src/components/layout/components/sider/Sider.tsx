import { LogOut } from 'lucide-react';
import logo from '@/assets/images/logo.png';
import { siderItems } from '@/utils';
import { NavItem } from './components';
import { Button } from '@/components';

export function Sider() {
  return (
    <div className='h-screen w-64 bg-white shadow-md flex flex-col justify-between border-r border-r-[#f1f5f9]'>
      <div>
        <div className='py-4 px-8'>
          <img src={logo} alt='Logo' />
        </div>

        <nav className=' space-y-1'>
          {siderItems.map((item) => (
            <div key={item.label}>
              <NavItem icon={item.icon} label={item.label} path={item.path} />
            </div>
          ))}
        </nav>
      </div>

      <div className='p-4 border-t'>
        <Button
          variant={'ghost'}
          className='flex items-center cursor-pointer w-full gap-3 text-red-500 font-medium hover:bg-red-50 px-3 py-2 rounded'
        >
          <LogOut className='w-5 h-5' />
          Sair
        </Button>
      </div>
    </div>
  );
}
