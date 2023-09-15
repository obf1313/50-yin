/**
 * @descriptor 日志中间件
 * @author obf1313
 */
import { Context } from 'koa'

export function logger() {
  return async (ctx: Context, next: () => Promise<void>) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    console.log(`${ctx.method} ${ctx.url} ${ctx.status} - ${ms}ms`)
  }
}
