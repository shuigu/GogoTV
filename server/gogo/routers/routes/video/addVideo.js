/**
 * Created by zhuguoqing on 2017/5/17.
 */
/**
 * Created by zhuguoqing on 2017/5/16.
 */

var {addVideo} = require('./../../../database/gogo/video')

const Paths = require('./../../paths')

async function router(ctx, next) {
  // body Post 参数
  console.log('body:',ctx.request.body)
  // query GET 参数
  console.log('query:',ctx.query)

  addVideo({name:'videoTest',playUrl:'www.baidu.com'});
  // 返回值
  ctx.body = "addVideo"

}
module.exports = {
  router,
  path:Paths.API_VIDEO_ADD,
  methods:["POST"],
}