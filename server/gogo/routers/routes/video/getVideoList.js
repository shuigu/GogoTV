/**
 * Created by zhuguoqing on 2017/5/17.
 */
var {getVideoList} = require('./../../../database/gogo/video')
var ErrorCode = require('./../../../constant/errorCode')

const Paths = require('./../../paths')

async function router(ctx, next) {

  let body = {}
  try{
    let list = await getVideoList();
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
  path:Paths.API_VIDEO_LIST,
  methods:["POST"],
}