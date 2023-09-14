import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import router from './routes'
import { logger } from './logger'
import { AppDataSource } from './data-source'

AppDataSource.initialize()
  .then(() => {
    const app = new Koa()

    app.use(logger())
    app.use(cors())
    app.use(bodyParser())

    app.use(router.routes()).use(router.allowedMethods())

    app.listen(3000)
  })
  .catch(e => {
    console.error('Error during Data Source initialization', e)
  })
