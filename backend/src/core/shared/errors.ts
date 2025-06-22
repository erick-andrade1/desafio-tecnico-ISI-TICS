export const Errors = {
  UNEXPECTED: 'Erro inesperado',
  UNAUTHORIZED: 'Você não tem permissão para realizar essa ação',
  OBJECT_NOT_FOUND: 'Entidade não encontrada',
  ID_NOT_FOUND: 'O ID é obrigatório',
  PRODUCT_NOT_FOUND: 'Produto não encontrado',
  PRODUCT_NAME_ALREADY_EXISTS: 'Já existe um produto com esse nome',
  COUPON_NOT_FOUND: 'Cupom não encontrado',
  COUPON_CODE_ALREADY_EXISTS: 'Já existe um cupom com esse código',
  COUPON_INVALID_UNTIL_DATE:
    'A data de validade não pode ser mais que 5 anos após a data de início.',
  COUPON_INVALID_FROM_DATE:
    'A data de validade deve ser posterior à data de início.',
  APPLICATION_NOT_FOUND: 'Aplicação de cupom não encontrada',
  COUPON_USE_NOT_PERMITED:
    'O uso desse cupom não é mais permitido ou esse produto já tem um cupom cadastrado',
  COUPON_OUTDATED: 'O uso do cupom expirou',
  COUPON_EXCEEDED_USAGE: 'O cupom bateu seu limite de uso',
  COUPON_INVALID_TYPE: 'Tipo de cupom inválido',
  PRODUCT_DISCOUNT_INVALID: 'Tipo de desconto inválido',
  DISCOUNT_ALREADY_APPLIED: 'Já existe um desconto aplicado a este produto',
  PRODUCT_FORBIDDEN_FINAL_PRICE:
    'O preço final com o cupom não pode ser inferior a R$ 0,01.',
  PRODUCT_FORBIDDEN_DISCOUNT_PERCENT:
    'O percentual de desconto estar entre 1% e 80%.',
  INVALID_COUPON_FIXED_DISCOUNT: 'Desconto fixo deve ser maior que zero.',
} as const;
