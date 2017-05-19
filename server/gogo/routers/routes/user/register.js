/**
 * Created by zhuguoqing on 2017/5/19.
 */
var {getUser,registerUser} = require('./../../../database/gogo/user')
var ErrorCode = require('./../../../constant/errorCode')
var Token     = require('.././../../token')

const Paths   = require('./../../paths')



async function router(ctx, next) {
  let params = ctx.request.body;
  /*
   * 必须参数
   * params:{
   *   userNo,
   *   userName,
   *   password,
   * }
   * */
  // 参数错误
  if (!params.userNo || !params.userName || !params.password){
    ctx.body = {
      code:ErrorCode.paramError.code,
      msg:ErrorCode.paramError.msg,
    }
    return;
  }

  try {
    let who = {
      no:params.userNo
    }
    let userInfo = await getUser(who);
    // 已经注册
    if (userInfo){//
      ctx.body = {
        code:ErrorCode.userRegisterDupError.code,
        msg:ErrorCode.userRegisterDupError.msg,
      }
      return;
    }
  } catch (error){
    // 数据库错误
    ctx.body = {
      code:ErrorCode.dbError.code,
      msg:ErrorCode.dbError.msg,
      dbCode:error,
    }
    return;
  }

  // 去注册
  try {
    let columns = {
      no:params.userNo,
      name:params.name,
      password:params.password,
    }
    if (params.sex){
      columns.sex = params.sex;
    }
    let userInfo = await registerUser(columns);
    let token = Token.getToken(userInfo.userId);
    ctx.body = {
      code:ErrorCode.succeed.code,
      msg:ErrorCode.succeed.msg,
      datas:{
        token:token,
        userInfo,
      }
    }
  }catch (error){
    // 数据库错误
    ctx.body = {
      code:ErrorCode.dbError.code,
      msg:ErrorCode.dbError.msg,
      dbCode:error,
    }
    return;
  }
}
module.exports = {
  router,
  path:Paths.API_USER_REGISTER,
  methods:["POST"],
}