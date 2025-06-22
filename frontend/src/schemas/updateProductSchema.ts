import { z } from 'zod';

export const updateProductSchema = z.object({
  name: z
    .string({
      required_error: 'O nome do produto é obrigatório',
      invalid_type_error: 'O nome do produto é obrigatório',
    })
    .min(3, 'O tamanho mínimo do nome é de 3 caracteres')
    .max(100, 'O tamanho máximo do nome é de 100 caracteres'),
  description: z
    .string()
    .max(300, 'O tamanho máximo da descrição é de 300 caracteres')
    .optional(),
  price: z
    .number({ required_error: 'O preço é obrigatório' })
    .min(0.01, 'O valor do produto deve ser maior ou igual a R$0,01')
    .max(
      1000000,
      'O valor do produto deve ser menor ou igual a R$1.000.000,00',
    ),
  stock: z.coerce
    .number({
      required_error: 'Informa a quantidade no estoque',
      invalid_type_error: 'O tipo do valor é inválido',
    })
    .min(0, 'O estoque não pode ser negativo')
    .max(999999, 'O estoque deve ser menor ou igual a 999999'),
});

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
