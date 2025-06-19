// E = Entrada do método
// S = Saída do método
export interface UseCase<E, S> {
  execute(entry: E): Promise<S>;
}
