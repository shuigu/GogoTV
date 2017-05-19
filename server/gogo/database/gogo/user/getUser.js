/**
 * Created by zhuguoqing on 2017/5/18.
 */
const  userInfo = require('./../../sql/constant').userInfo;

const  sql = global.__dataBase.sql;

function getUser(columnData) {
  return new Promise(function(resolve, reject) {
    sql.select(userInfo,null,columnData).then((results)=>{
      if (results.length > 0){
        let user = results[0];
        let info = {
          userId:user[userInfo.columns.id],
          userNo:user[userInfo.columns.no],
          userName:user[userInfo.columns.name],
          password:user[userInfo.columns.password],
          sex:user[userInfo.columns.sex],
        }
        resolve(info);
      }else{
        resolve(null);
      }
    }).catch((error)=>{
      console.log('getUser error:',error);
      reject(error.code);
    });
  });
}
module.exports = getUser