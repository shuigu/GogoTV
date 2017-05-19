/**
 * Created by zhuguoqing on 2017/5/19.
 */
var {getHistoryList} = require('./../../../database/gogo/history')
var ErrorCode = require('./../../../constant/errorCode')

const Paths = require('./../../paths')

async function router(ctx, next) {

  let body = {}
  let userId = ctx.userInfo.userId;
  try{
    let list = await getHistoryList({userId:userId});
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
  path:Paths.API_HISTORY_List,
  methods:["POST"],
}