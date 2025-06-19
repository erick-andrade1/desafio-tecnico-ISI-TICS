export interface EntityProps {
  id?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export abstract class Entity<T extends EntityProps = any> {
  readonly id: number | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;

  constructor(props: T) {
    this.id = props.id ?? null;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.deletedAt = props.deletedAt ?? null;
  }

  equals(entity: Entity): boolean {
    return this.id === entity.id;
  }

  notEquals(entity: Entity): boolean {
    return !this.equals(entity);
  }

  copyWith<U extends Entity<T>>(this: U, updates: Partial<T>): U {
    // Filtra updates para remover chaves com valores undefined
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([, value]) => value !== undefined),
    ) as Partial<T>;

    const customPropsFunctions = this.getCopyWithPropsFunctions();
    // Aplica funções personalizadas para propriedades específicas, se existirem
    const fixedUpdates: Partial<T> = {};
    for (const [key, func] of Object.entries(customPropsFunctions)) {
      fixedUpdates[key] = func(this[key]);
    }

    // Cria um novo objeto com as alterações e usa 'structuredClone' para garantir imutabilidade
    const newProps = {
      ...(this.safeClone({
        ...this,
        ...fixedUpdates,
        ...filteredUpdates,
      }) as unknown as T),
    };

    return new (this.constructor as { new (props: T): U })(newProps);
  }

  protected getCopyWithPropsFunctions(): Record<string, (value: any) => any> {
    return {};
  }

  private safeClone<V>(obj: V): V {
    try {
      return structuredClone(obj);
    } catch {
      return JSON.parse(JSON.stringify(obj));
    }
  }
}
