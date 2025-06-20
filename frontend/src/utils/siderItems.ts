import type { ISiderItems } from '@/types/shared/siderItems/SiderItems';

export const siderItems: ISiderItems[] = [
  {
    icon: 'home',
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    icon: 'shopping_bag',
    label: 'Produtos',
    path: '/produtos',
  },
  {
    icon: 'article',
    label: 'Relatórios',
    path: '/relatorios',
  },
  {
    icon: 'settings',
    label: 'Administração',
    path: '/admin',
  },
];
