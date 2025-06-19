export class Environment {
  public static getPort(): number {
    return Environment.getEnvNumber('PORT', 8000);
  }

  public static getDBUrl(): string {
    return Environment.getEnv('DB');
  }

  private static getEnv(
    name: string,
    defaultValue: string | null = null,
  ): string {
    if (!process.env[name] && !defaultValue) {
      throw new Error(`Variável de ambiente ${name} não definida`);
    }
    return (process.env[name] ?? defaultValue)!;
  }

  private static getEnvNumber(
    name: string,
    defaultValue: number | null = null,
  ): number {
    return parseInt(
      Environment.getEnv(
        name,
        defaultValue !== null ? defaultValue.toString() : null,
      ),
    );
  }
}
