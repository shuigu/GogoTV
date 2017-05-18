/**
 * Created by zhuguoqing on 2017/5/17.
 */

const  videoInfo = require('./../../sql/constant').videoInfo;
const  errorCode = require('./../../../constant/errorCode')

const  sql = global.__dataBase.sql;

function addVideo(columnData) {
  return new Promise(function(resolve, reject) {
    let newResult = {}
    sql.insert(videoInfo,columnData).then((results)=>{

      newResult.code  = errorCode.succeed.code;
      newResult.msg   = errorCode.succeed.msg;

      resolve(newResult);

    }).catch((error)=>{
      console.log('addVideo catch:',error.code)
      newResult = {
        code1:errorCode.dbError.code,
        msg1:errorCode.dbError.msg,
        dbCode:error.code,
      }
      resolve(newResult);
    });
  });
}
module.exports = addVideo