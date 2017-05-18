/**
 * Created by zhuguoqing on 2017/5/18.
 */
var {getUser} = require('./../../../database/gogo/user')
const Paths = require('./../../paths')
var ErrorCode = require('./../../../constant/errorCode')
var Token = require('.././../../token')



async function router(ctx, next) {
  let params = ctx.request.body;
  /*
   * 必须参数
   * params:{
   *   token,
   * }
   * */
  if (!params.token){
    ctx.body = {
      code:ErrorCode.paramError.code,
      msg:ErrorCode.paramError.msg,
    }
    return;
  }
  let userId = Token.verifyToken(params.token);
  if (!userId){
    ctx.body = {
      code:ErrorCode.userInfoNotVerifyError.code,
      msg:ErrorCode.userInfoNotVerifyError.msg,
    }
    return;
  }
  let who = {
    id:userId,
  }
  let userInfo = await getUser(who);

  ctx.body = {
    code:ErrorCode.succeed.code,
    msg:ErrorCode.succeed.msg,
    userInfo:userInfo,
  }

}
module.exports = {
  router,
  path:Paths.API_USER_INFO,
  methods:["POST"],
}