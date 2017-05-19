/**
 * Created by zhuguoqing on 2017/5/19.
 */
var {getVideoDetail} = require('./../../../database/gogo/video')
var ErrorCode = require('./../../../constant/errorCode')

const Paths = require('./../../paths')

async function router(ctx, next) {

  let params = ctx.request.body;
  /*
   * 必须参数
   * params:{
   *   videoId,
   * }
   * */
  if (!params.videoId){
    ctx.body = {
      code:ErrorCode.paramError.code,
      msg:ErrorCode.paramError.msg,
    }
    return;
  }
  let body = {}
  try{
    let list = await getVideoDetail({id:params.videoId});
    body.code  = ErrorCode.succeed.code;
    body.msg   = ErrorCode.succeed.msg;
    body.datas = list;
  }catch (error){
    body.code=ErrorCode.dbError.code;
    body.msg=ErrorCode.dbError.msg;
    body.dbCode=error;
  }
  ctx.body = body;

}
module.exports = {
  router,
  path:Paths.API_VIDEO_DETAIL,
  methods:["POST"],
}