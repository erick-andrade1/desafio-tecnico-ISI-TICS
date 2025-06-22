import { z } from 'zod';

export const optionalBooleanString = () =>
  z
    .string()
    .optional()
    .transform((val) =>
      val === '1' || val === 'true'
        ? true
        : val === '0' || val === 'false'
        ? false
        : undefined,
    );
