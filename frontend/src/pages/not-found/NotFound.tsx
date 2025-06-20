import { Link } from 'react-router';

export function NotFound() {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center bg-gray-50 text-center p-6'>
      <div className='text-[120px] leading-none'>😕</div>

      <h1 className='text-4xl font-bold text-gray-800 mt-4'>
        404 - Página não encontrada
      </h1>
      <p className='mt-2 text-gray-600 max-w-md'>
        Opa! Parece que você tentou acessar uma página que não existe ou foi
        movida.
      </p>

      <Link
        to='/produtos'
        className='mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition'
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
}
