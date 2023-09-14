import Router from '@koa/router'
import AuthController from './../controllers/auth'
import UserController from './../controllers/user'

const router = new Router()

// auth 相关路由
router.post('/auth/login', AuthController.login)
router.post('/auth/register', AuthController.register)

// users 相关路由
router.get('/user/:id', UserController.showUserDetail)

export default router
