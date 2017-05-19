/**
 * Created by zhuguoqing on 2017/5/18.
 */

var redList = require('./redList').redList;
var jwt = require('jsonwebtoken');
var ErrorCode = require('./../constant/errorCode')
const PRIVATE_KEY = 'ssh'


class Token {
  /*
   * 验证token,验证成功返回useId
   * */
  static getToken(userId){
    var token = jwt.sign({ userId: userId }, PRIVATE_KEY);
    return token;
  }
  /*
   * 验证token,验证成功返回useId
   * */
  static verifyToken(token){
    try {
      var decoded = jwt.verify(token, PRIVATE_KEY);
      console.log('decoded:',decoded)
      if (decoded){
        return decoded.userId;
      }
    } catch(err) {
      // err
    }
    return null;
  }

  // 构造
  constructor() {
    // 在线用户列表
    this.onlineUsers = [];
  }
  deal(){
    return async (ctx,next) =>{
      let originalUrl = ctx.request.originalUrl;
      if (this.isRedList(originalUrl)){
        await this.verifyToken(ctx,next);
      }else{
        await next();
      }
    }
  }
  isRedList(originalUrl){
    return redList.includes(originalUrl);
  }
  async verifyToken(ctx,next){
    let params = ctx.request.body;
    let token = params.token;
    let userId = Token.verifyToken(token);

    // 参数错误
    if (!token){
      ctx.body = {
        code:ErrorCode.paramError.code,
        msg:ErrorCode.paramError.msg,
      }
      return;
    }
    // 校验失败
    if (!userId){
      ctx.body = {
        code:ErrorCode.userInfoNotVerifyError.code,
        msg:ErrorCode.userInfoNotVerifyError.msg,
      }
      return;
    }
    // 权限通过了就构造userInfo数据
    ctx.userInfo= {
      userId,
    }
    await next();
  }
}
module.exports = Token;