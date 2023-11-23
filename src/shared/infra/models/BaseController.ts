/** @format */

import { FastifyReply, FastifyRequest } from 'fastify'

export abstract class BaseController {
  protected abstract exec(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<void | any>

  public async execute(req: FastifyRequest, res: FastifyReply): Promise<void> {
    try {
      await this.exec(req, res)
    } catch (err) {
      console.log(`[BaseController]: Uncaught controller error`)
      console.log(err)
      this.fail(res, 'An unexpected error occurred')
    }
  }

  public static jsonResponse(
    res: FastifyReply,
    code: number,
    message: string
  ): FastifyReply {
    return res.status(code).send({
      message,
    })
  }

  public fail(res: FastifyReply, error: Error | string): FastifyReply {
    console.log(error)
    return res.status(500).send({
      message: error.toString(),
    })
  }

  public ok<T>(res: FastifyReply, dto: T): FastifyReply {
    return res.status(200).send(dto)
  }

  public unauthorized(res: FastifyReply, error: Error | string): FastifyReply {
    console.log(error)
    return res.status(401).send({
      message: error.toString(),
    })
  }

  public notFound(res: FastifyReply, error: Error | string): FastifyReply {
    console.log(error)
    return res.status(404).send({
      message: error.toString(),
    })
  }
}
