/**
 * Created by zhuguoqing on 2017/5/16.
 */

const Paths = require('./../paths')

function router(ctx, next) {
  ctx.body = "test0"
}
module.exports = {
  router,
  path:Paths.API_TEST,
  methods:["GET","POST"],
}