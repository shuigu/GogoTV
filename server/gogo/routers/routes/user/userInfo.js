/**
 * Created by zhuguoqing on 2017/5/18.
 */
var {getUser} = require('./../../../database/gogo/user')
var ErrorCode = require('./../../../constant/errorCode')
var Token     = require('.././../../token')

const Paths = require('./../../paths')
  
async function router(ctx, next) {

  let userId = ctx.userInfo.userId;
  if (!userId){
    ctx.body = {
      code:ErrorCode.userInfoNotVerifyError.code,
      msg:ErrorCode.userInfoNotVerifyError.msg,
    }
    return;
  }

  let body = {}
  try {
    let who = {
      id:userId,
    }
    let userInfo = await getUser(who);
    delete userInfo.password;
    body.code  = ErrorCode.succeed.code;
    body.msg   = ErrorCode.succeed.msg;
    body.datas = {
      userInfo
    }
  }catch (error){
    body.code=ErrorCode.dbError.code;
    body.msg=ErrorCode.dbError.msg
    body.dbCode=error;
  }
  ctx.body = body;
}
module.exports = {
  router,
  path:Paths.API_USER_INFO,
  methods:["POST"],
}