import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import jwt from 'koa-jwt'
import 'reflect-metadata'
import { unprotectedRouter, protectedRouter } from './routes'
import { logger } from './logger'
import { AppDataSource } from './data-source'
import { JSW_SECRET } from './constants'

AppDataSource.initialize()
  .then(() => {
    const app = new Koa()
    app.use(logger())
    app.use(cors())
    app.use(bodyParser())
    app.use(async (ctx, next) => {
      try {
        await next()
      } catch (e) {
        ctx.status = e.status || 500
        ctx.body = { message: e.message, code: ctx.status }
      }
    })
    // 无需 JWT Token 即可访问
    app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods())
    // 注册 JWT 中间件
    // GET 不会吗？
    app.use(jwt({ secret: JSW_SECRET }).unless({ method: 'GET ' }))
    // 需要 JWT Token 才可访问
    app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods())
    app.listen(8000)
  })
  .catch(e => {
    console.error('Error during Data Source initialization', e)
  })
