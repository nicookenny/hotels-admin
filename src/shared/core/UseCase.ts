/** @format */

export interface BaseUseCase<IInput, IOutput> {
  execute(input: IInput): Promise<IOutput>
}
