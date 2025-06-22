import { z } from 'zod';

export const optionalNumberString = () =>
  z
    .string()
    .optional()
    .transform((val) => {
      if (val === undefined || val.trim() === '') return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    });
