/**
 * Created by zhuguoqing on 2017/5/18.
 */
const  userInfo = require('./../../sql/constant').userInfo;
const  errorCode = require('./../../../constant/errorCode')

const  sql = global.__dataBase.sql;

function getUser(columnData) {
  return new Promise(function(resolve, reject) {
    sql.select(userInfo,null,columnData).then((results)=>{
      let user = results[0];
      let info = {
        userId:user[userInfo.columns.id],
        userNo:user[userInfo.columns.no],
        userName:user[userInfo.columns.name],
        password:user[userInfo.columns.password],
        userSex:user[userInfo.columns.sex],
      }
      resolve(info);
    }).catch((error)=>{
      console.log('getUser catch:',error)
      resolve(null);
    });
  });
}
module.exports = getUser