/**
 * Created by zhuguoqing on 2017/5/18.
 */

var {getUser} = require('./../../../database/gogo/user')
var ErrorCode = require('./../../../constant/errorCode')
var Token     = require('.././../../token')

const Paths   = require('./../../paths')

async function router(ctx, next) {
  let params = ctx.request.body;
  /*
   * 必须参数
   * params:{
   *   userNo,
   *   password,
   * }
   * */
  if (!params.userNo || !params.password){
    ctx.body = {
      code:ErrorCode.paramError.code,
      msg:ErrorCode.paramError.msg,
    }
    return;
  }

  let userInfo = null;
  try {
    let who = {
      no:params.userNo
    }
    userInfo = await getUser(who);
  } catch (error){
    ctx.body = {
      code:ErrorCode.dbError.code,
      msg:ErrorCode.dbError.msg,
      dbCode:error,
    }
    return;
  }
  /*
  * 用户没有注册
  * */
  if (!userInfo){//
    ctx.body = {
      code:ErrorCode.userLoginNoUser.code,
      msg:ErrorCode.userLoginNoUser.msg,
    }
    return;
  }
  /*
   * 密码错误
   * */
  if (userInfo.password != params.password){//
    ctx.body = {
      code:ErrorCode.userLoginPasswordError.code,
      msg:ErrorCode.userLoginPasswordError.msg,
    }
    return;
  }
  let token = Token.getToken(userInfo.userId);
  delete userInfo.password;
  ctx.body = {
    code:ErrorCode.succeed.code,
    msg:ErrorCode.succeed.msg,
    datas:{
      token:token,
      userInfo,
    }
  }
}
module.exports = {
  router,
  path:Paths.API_USER_LOGIN,
  methods:["POST"],
}