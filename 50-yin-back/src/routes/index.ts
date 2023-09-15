/**
 * @descriptor 路由
 * @author obf1313
 */
import Router from '@koa/router'
import AuthController from './../controllers/auth'
import UserController from './../controllers/user'

const unprotectedRouter = new Router()
const protectedRouter = new Router()

// auth 相关路由
unprotectedRouter.post('/auth/login', AuthController.login)
unprotectedRouter.post('/auth/register', AuthController.register)

// users 相关路由
protectedRouter.get('/user/:id', UserController.showUserDetail)

export { unprotectedRouter, protectedRouter }
