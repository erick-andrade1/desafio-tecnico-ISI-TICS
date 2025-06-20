interface IProps {
  title: string;
  icon?: string;
}

export function PageHeader({ title, icon }: IProps) {
  return (
    <div className='flex gap-4 align-middle items-center'>
      {icon && (
        <span
          className='material-symbols-outlined'
          style={{ fontSize: '38px' }}
        >
          {icon}
        </span>
      )}
      <h1 className='text-3xl font-semibold'>{title}</h1>
    </div>
  );
}
