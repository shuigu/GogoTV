/**
 * Created by zhuguoqing on 2017/5/19.
 */
const  historyInfo = require('./../../sql/constant').userHistoryInfo;
const  sql = global.__dataBase.sql;

function addHistory(columnData) {
  return new Promise(function(resolve, reject) {
    sql.insert(historyInfo,columnData).then((results)=>{
      resolve({});
    }).catch((error)=>{
      console.log('addHistory error:',error);
      reject(error.code);
    });
  });
}
module.exports = addHistory