/**
 * Created by zhuguoqing on 2017/5/17.
 */
var {getVideo} = require('./../../../database/gogo/video')

const Paths = require('./../../paths')

async function router(ctx, next) {
  
  ctx.body = await getVideo();

}
module.exports = {
  router,
  path:Paths.API_VIDEO_LIST,
  methods:["POST"],
}