/**
 * @descriptor 错误处理
 * @author obf1313
 */
export class BaseException extends Error {
  status: number
  message: string
}

export class BusinessException extends BaseException {
  status: number = 777
  constructor(msg?: string) {
    super()
    this.message = msg || '业务错误'
  }
}

export class NotFoundException extends BaseException {
  status = 404
  constructor(msg?: string) {
    super()
    this.message = msg || '无此内容'
  }
}

export class UnauthorizedException extends BaseException {
  status = 401
  constructor(msg?: string) {
    super()
    this.message = msg || '尚未登录'
  }
}

export class ForbiddenException extends BaseException {
  status = 403
  constructor(msg?: string) {
    super()
    this.message = msg || '权限不足'
  }
}
