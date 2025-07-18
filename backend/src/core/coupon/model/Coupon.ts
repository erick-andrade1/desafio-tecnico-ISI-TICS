import AppError from '../../../errors/AppError';
import { AppValidationError } from '../../../errors';
import { Entity, EntityProps, Errors } from '../../shared';
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

    this.validateCouponDates();
  }

  public isCouponValid() {
    const now = new Date();

    const isInValidDateRange =
      now >= this.valid_from && now <= this.valid_until;
    const isNotDeleted = !this.deletedAt;
    const hasRemainingUses = this.one_shot
      ? this.uses_count === 0
      : this.uses_count < this.max_uses;

    if (!isInValidDateRange) {
      throw new AppError(Errors.COUPON_OUTDATED);
    }

    if (!isNotDeleted) {
      throw new AppValidationError(Errors.COUPON_USE_NOT_PERMITED);
    }

    if (!hasRemainingUses) {
      throw new AppValidationError(Errors.COUPON_EXCEEDED_USAGE);
    }
  }

  public useCoupon(): Coupon {
    this.isCouponValid();

    let uses_count = this.uses_count + 1;
    let deletedAt: any = null;

    if (this.max_uses === uses_count || this.one_shot) {
      deletedAt = new Date();
    }

    return this.copyWith({
      uses_count: uses_count,
      deletedAt: deletedAt,
    });
  }

  private validateCouponDates() {
    if (this.valid_from >= this.valid_until) {
      throw new AppValidationError(Errors.COUPON_INVALID_FROM_DATE);
    }

    const maxValidUntil = new Date(this.valid_from);
    maxValidUntil.setFullYear(maxValidUntil.getFullYear() + 5);

    if (this.valid_until > maxValidUntil) {
      throw new AppValidationError(Errors.COUPON_INVALID_UNTIL_DATE);
    }
  }

  copyWith(props: Partial<CouponProps>) {
    const coupon = new Coupon({
      id: props.id ?? this.id,
      code: props.code ?? this.code.getValue(),
      type: props.type ?? this.type.value,
      value: props.value ?? this.value.getValue(),
      one_shot: props.one_shot ?? this.one_shot,
      max_uses: props.max_uses ?? this.max_uses,
      uses_count: props.uses_count ?? this.uses_count,
      valid_from: props.valid_from ?? this.valid_from,
      valid_until: props.valid_until ?? this.valid_until,
      createdAt: props.createdAt ?? this.createdAt,
      updatedAt: props.updatedAt ?? this.updatedAt,
      deletedAt: props.deletedAt ?? this.deletedAt,
    });

    return coupon;
  }
}
