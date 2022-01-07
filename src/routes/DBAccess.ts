import { RouterContext } from '@koa/router'
import { BaseEndpoint, DBUtil } from '../lib'

export class DBEndpoint extends BaseEndpoint {
  getMethod(ctx: RouterContext) {
    const dbUtil = new DBUtil()

    ctx.body = 'OK'
    ctx.status = 200
  }

  build() {
    this.router.get('/db', ctx => this.getMethod(ctx))

    return this.router
  }
}
