export const formatToCurrency = (val: string | number) => {
  const num =
    typeof val === 'number'
      ? val
      : Number(val.toString().replace(/\D/g, '')) / 100;
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};
