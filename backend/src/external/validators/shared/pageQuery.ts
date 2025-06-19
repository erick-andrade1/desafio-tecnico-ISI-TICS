import { z } from 'zod';

export const pageQuery = () =>
  z
    .string()
    .transform(Number)
    .optional()
    .default('1')
    .transform((val) => Math.max(1, Math.floor(val)));
