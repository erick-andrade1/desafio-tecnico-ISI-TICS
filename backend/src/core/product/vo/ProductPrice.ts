import { AppValidationError } from '../../../errors';

export class ProductPrice {
  private readonly price: number;

  private constructor(price: number) {
    this.price = price;
  }

  static create(input: string | number): ProductPrice {
    if (input === null || input === undefined) {
      throw new AppValidationError('Preço é obrigatório.');
    }

    let numericValue: number;

    if (typeof input === 'number') {
      numericValue = input;
    } else if (typeof input === 'string') {
      numericValue = ProductPrice.parsePriceString(input);
    } else {
      throw new AppValidationError('Preço inválido.');
    }

    if (isNaN(numericValue)) {
      throw new AppValidationError('Preço inválido.');
    }

    if (numericValue < 0.01) {
      throw new AppValidationError('Preço deve ser no mínimo 0.01.');
    }

    if (numericValue > 1000000) {
      throw new AppValidationError('Preço deve ser no máximo 1.000.000,00.');
    }

    return new ProductPrice(numericValue);
  }

  private static parsePriceString(priceStr: string): number {
    const trimmed = priceStr.trim();

    // Detecta formato brasileiro (ex: tem vírgula e ponto)
    const hasComma = trimmed.includes(',');
    const hasDot = trimmed.includes('.');

    let normalized = trimmed;

    if (hasComma && hasDot) {
      // Formato brasileiro: remove os pontos e troca a vírgula por ponto
      normalized = trimmed.replace(/\./g, '').replace(',', '.');
    } else if (hasComma && !hasDot) {
      // Só tem vírgula, troca por ponto
      normalized = trimmed.replace(',', '.');
    } else {
      // Formato internacional ou apenas números, mantém
      normalized = trimmed;
    }

    const parsed = parseFloat(normalized);

    return parsed;
  }

  public getPrice(): number {
    return this.price;
  }

  brazilCurrencyFormat(): string {
    return this.price.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
