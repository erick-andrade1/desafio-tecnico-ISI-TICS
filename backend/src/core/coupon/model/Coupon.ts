import { Entity, EntityProps } from '../../shared';
import { CouponType, CouponCode, CouponValue } from '../vo';

export interface CouponProps extends EntityProps {
  code: string; // Código único do cupom (ex: "SAVE10"). Deve ser normalizado (lowercase, sem acentos ou espaços).
  type: string; // Tipo de desconto: "percent" ou "fixed".
  value: number; // Valor do desconto: Percentual (1–80) ou fixo (> 0).
  one_shot: boolean; // Se true, só pode ser usado uma única vez por produto.
  max_uses: number; // Número máximo de usos permitidos (quando one_shot = false).
  uses_count: number; // Contador de quantas vezes o cupom já foi aplicado.
  valid_from: Date; // Data/hora em que o cupom se torna válido.
  valid_until: Date; // Data/hora de expiração do cupom (máx. 5 anos após valid_from).
}

export class Coupon extends Entity<CouponProps> {
  readonly code: CouponCode;
  readonly type: CouponType;
  readonly value: CouponValue;
  readonly one_shot: boolean;
  readonly max_uses: number;
  readonly uses_count: number;
  readonly valid_from: Date;
  readonly valid_until: Date;

  constructor(data: CouponProps) {
    super(data);
    this.code = new CouponCode(data.code);
    this.type = new CouponType(data.type);
    this.value = new CouponValue(this.type, data.value);
    this.one_shot = data.one_shot;
    this.max_uses = data.max_uses;
    this.uses_count = data.uses_count;
    this.valid_from = data.valid_from;
    this.valid_until = data.valid_until;
  }
}
