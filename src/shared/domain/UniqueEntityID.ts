/** @format */

import { v4 as uuid } from 'uuid'

export class UniqueEntityID {
  constructor(private readonly _id?: string) {
    this._id = _id ? _id : uuid()
  }

  public toString(): string {
    return this._id!
  }
}
