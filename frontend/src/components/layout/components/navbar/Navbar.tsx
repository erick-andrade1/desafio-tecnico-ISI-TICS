import { Avatar, AvatarFallback, AvatarImage, Button } from '@/components';

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className='w-full border-b border-b-[#f1f5f9] bg-white flex p-4 justify-between items-center gap-4 px-4 md:px-12'>
      <Button
        variant={'ghost'}
        onClick={onMenuClick}
        className='md:hidden p-2 rounded-md hover:bg-gray-100'
      >
        <span className='material-symbols-outlined text-[#64748b]'>menu</span>
      </Button>

      <div className='flex items-center gap-2 ml-auto'>
        <Avatar>
          <AvatarImage />
          <AvatarFallback className='bg-neutral-300 font-sans text-[16px] font-normal'>
            EV
          </AvatarFallback>
        </Avatar>
        <label htmlFor='avatar' className='font-sans text-[16px] font-normal'>
          Erick Veríssimo
        </label>
      </div>
    </header>
  );
}
