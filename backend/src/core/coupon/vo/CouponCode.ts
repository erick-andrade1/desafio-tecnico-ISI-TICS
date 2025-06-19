export class CouponCode {
  private readonly value: string;

  constructor(code: string) {
    this.value = this.normalize(code);
  }

  private normalize(code: string): string {
    return code
      .normalize('NFD') // Decompõe caracteres com acento
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/\s+/g, '') // Remove espaços
      .toLowerCase(); // Transforma em minúsculas
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: CouponCode): boolean {
    return this.value === other.getValue();
  }
}
