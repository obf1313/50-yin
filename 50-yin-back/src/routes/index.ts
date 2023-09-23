/**
 * @descriptor 路由
 * @author obf1313
 */
import Router from '@koa/router'
import AuthController from '@/controllers/auth'
import UserController from '@/controllers/user'
import CheckRecordController from '@/controllers/check-record'
import LetterController from '@/controllers/letter'
import StudyRecordController from '@/controllers/study-record'
import CheckRecordDetailController from '@/controllers/check-record-detail'

const unprotectedRouter = new Router()
const protectedRouter = new Router()

// auth 相关路由
unprotectedRouter.post('/auth/login', AuthController.login)

// users 相关路由
protectedRouter.get('/user', UserController.getUserDetail)

// check-record 相关路由
protectedRouter.post('/check-record/list', CheckRecordController.getCheckRecordList)
protectedRouter.post('/check-record/create', CheckRecordController.createCheckRecord)
protectedRouter.get('/check-record/:id', CheckRecordController.getCheckRecord)
protectedRouter.get('/check-record/result/:id', CheckRecordController.getCheckRecordResult)

// check-record-detail 相关路由
protectedRouter.post('/check-record-detail/update', CheckRecordDetailController.updateCheckRecordDetail)

// letter 相关路由
protectedRouter.post('/letter/list', LetterController.getLetterList)
protectedRouter.post('/letter/init', LetterController.init)

// study-record 相关路由
protectedRouter.post('/study-record/update', StudyRecordController.updateStudyRecord)

export { unprotectedRouter, protectedRouter }
