/**
 * Created by zhuguoqing on 2017/5/17.
 */
const  videoInfo = require('./../../sql/constant').videoInfo;
const  errorCode = require('./../../../constant/errorCode')
const  sql = global.__dataBase.sql;



function updateVideo(columnData,where) {
  return new Promise((resolve,reject)=>{
    let newResult = {}
    sql.update(videoInfo,columnData,where).then((results)=>{
      newResult.code  = errorCode.succeed.code;
      newResult.msg   = errorCode.succeed.msg;
      resolve(newResult);
    }).catch((error)=>{
      console.log('updateVideo catch:',error.code)
      newResult = {
        code1:errorCode.dbError.code,
        msg1:errorCode.dbError.msg,
        dbCode:error.code,
      }
      resolve(newResult);
    })
  });

}

module.exports = updateVideo;