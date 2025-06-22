import { PageHeader, CreateProductForm } from '@/components';

export function CreateProduct() {
  return (
    <div className='flex flex-col gap-12'>
      <PageHeader title={'Cadastro de Produto'} icon='note_add' />

      <CreateProductForm />
    </div>
  );
}
