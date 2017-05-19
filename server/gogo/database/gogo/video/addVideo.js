/**
 * Created by zhuguoqing on 2017/5/17.
 */

const  videoInfo = require('./../../sql/constant').videoInfo;
const  sql = global.__dataBase.sql;

function addVideo(columnData) {
  return new Promise(function(resolve, reject) {
    sql.insert(videoInfo,columnData).then((results)=>{
      resolve({});
    }).catch((error)=>{
      reject(error.code);
    });
  });
}
module.exports = addVideo