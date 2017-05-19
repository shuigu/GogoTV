/**
 * Created by zhuguoqing on 2017/5/19.
 */
var {addHistory} = require('./../../../database/gogo/history')
var ErrorCode = require('./../../../constant/errorCode')

const Paths = require('./../../paths')

async function router(ctx, next) {
// body Post 参数
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
  //
  let columns = {
    videoId:params.videoId
  }
  if(params.duration){
    columns.duration = params.duration;
  }
  columns.userId = ctx.userInfo.userId;
  let body = {}
  try {
    await addHistory(columns);
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
  path:Paths.API_HISTORY_ADD,
  methods:["POST"],
}
