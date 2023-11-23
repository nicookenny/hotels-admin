/** @format */

import { UniqueEntityID } from './UniqueEntityID'

export abstract class Entity<T> {
  constructor(
    public readonly props: T,
    protected readonly _id?: UniqueEntityID
  ) {
    this._id = _id ?? new UniqueEntityID()
    this.props = props
  }

  
}
