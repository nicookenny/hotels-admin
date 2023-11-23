/** @format */

export class Result<T> {
  private constructor(
    public readonly value: T,
    public readonly isSuccess: boolean,
    public readonly isFailure: boolean = !isSuccess,
    public readonly error?: string
  ) {}

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(value as U, true)
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(null as any, false, true, error)
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (!result.isSuccess) return result
    }
    return Result.ok()
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error('No se puede obtener el valor de un resultado fallido.')
    }
    return this.value
  }

  public getErrorValue(): string {
    if (this.isSuccess) {
      throw new Error('No se puede retornar el error en un resultado exitoso.')
    }
    return this.error as string
  }
}
