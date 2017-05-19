/**
 * Created by zhuguoqing on 2017/5/19.
 */

const  userInfo = require('./../../sql/constant').userInfo;
const  sql = global.__dataBase.sql;
const  getUser = require('./getUser')

function register(columnData) {
  return new Promise(function(resolve, reject) {
    sql.insert(userInfo,columnData).then((results)=>{
      // 插入成功,查询userInfo
      getUser({no:columnData.no}).then((userInfo)=>{
        resolve(userInfo);
      }).catch((error)=>{
        reject(error);
      });
    }).catch((error)=>{
      reject(error.code);
    });
  });
}

module.exports = register
