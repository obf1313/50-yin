import Application, { BaseContext, Response } from 'koa'
import { IState } from './state'
import { IncomingMessage, ServerResponse } from 'http'
import * as Cookies from 'cookies'
import * as accepts from 'accepts'
import { ParsedUrlQuery } from 'querystring'

interface ExtendableContext<RequestT = unknown> extends BaseContext {
  app: Application
  request: {
    body: RequestT
  }
  response: Response
  req: IncomingMessage
  res: ServerResponse
  originalUrl: string
  cookies: Cookies
  accept: accepts.Accepts
  /**
   * To bypass Koa's built-in response handling, you may explicitly set `ctx.respond = false;`
   */
  respond?: boolean | undefined
  query: RequestT & ParsedUrlQuery
}

export type Context<RequestT = unknown, ResponseBodyT = unknown> = ExtendableContext<RequestT> & {
  state: IState
} & { body: ResponseBodyT; response: { body: ResponseBodyT } }
