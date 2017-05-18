/**
 * Created by zhuguoqing on 2017/5/18.
 */

var {getUser} = require('./../../../database/gogo/user')
const Paths   = require('./../../paths')
var ErrorCode = require('./../../../constant/errorCode')
var Token     = require('.././../../token')



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
  let who = {
    no:params.userNo
  }
  let userInfo = await getUser(who);
  
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
  ctx.body = {
    code:ErrorCode.succeed.code,
    msg:ErrorCode.succeed.msg,
    token:token,
  }

}
module.exports = {
  router,
  path:Paths.API_USER_LOGIN,
  methods:["POST"],
}