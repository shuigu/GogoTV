/**
 * Created by zhuguoqing on 2017/5/17.
 */
/**
 * Created by zhuguoqing on 2017/5/16.
 */

var {addVideo} = require('./../../../database/gogo/video')
var ErrorCode = require('./../../../constant/errorCode')

const Paths = require('./../../paths')

async function router(ctx, next) {
  // body Post 参数
  let params = ctx.request.body;
  /*
  * 必须参数
  * params:{
  *   videoName,
  *   playUrl,
  * }
  * */
  if (!params.videoName || !params.playUrl){
    ctx.body = {
      code:ErrorCode.paramError.code,
      msg:ErrorCode.paramError.msg,
    }
    return;
  }

  let columns = {
    name:params.videoName,
    playUrl:params.playUrl,
  }

  if(params.logoUrl){
    columns.logoUrl = params.logoUrl;
  }
  if(params.screenShotUrl){
    columns.screenShotUrl = params.screenShotUrl;
  }
  if(params.score){
    columns.score = params.score;
  }
  if(params.describe){
    columns.describe = params.describe;
  }
  if(params.type){
    columns.type = params.type;
  }
  let body = {}
  try {
    await addVideo(columns);
    body.code  = ErrorCode.succeed.code;
    body.msg   = ErrorCode.succeed.msg;
  }catch (error){
    body.code=ErrorCode.dbError.code;
    body.msg=ErrorCode.dbError.msg
    body.dbCode=error;
  }
  ctx.body = body;
}
module.exports = {
  router,
  path:Paths.API_VIDEO_ADD,
  methods:["POST"],
}