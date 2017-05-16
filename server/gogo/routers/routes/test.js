/**
 * Created by zhuguoqing on 2017/5/16.
 */

const Paths = require('./../paths')

async function router(ctx, next) {
  // body Post 参数
  console.log('body:',ctx.request.body)
  // query GET 参数
  console.log('query:',ctx.query)

  // 返回值
  ctx.body = "test"

}
module.exports = {
  router,
  path:Paths.API_TEST,
  methods:["GET","POST"],
}