import type { AxiosError } from 'axios';
import { toast } from 'sonner';

export function errorToast(err: AxiosError) {
  const message =
    (err.response?.data as { message?: string })?.message ||
    'Ocorreu um erro inesperado';
  toast.error(message);
}
