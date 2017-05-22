/**
 * Created by zhuguoqing on 2017/5/19.
 */
const  historyInfo = require('./../../sql/constant').userHistoryInfo;
const  sql = global.__dataBase.sql;

function addHistory(columnData) {
  return new Promise(function(resolve, reject) {
    // 1.查询当前用户是否存在当前的视频历史
    let where = {
      userId:columnData.userId,
      videoId:columnData.videoId,
    }
    sql.select(historyInfo,null,where).then((results)=>{
      console.log('addHistory results:',results);
      if (results.length > 0){
        sql.update(historyInfo,columnData,where).then((results)=>{
          resolve({});
        }).catch((error)=>{
          console.log('addHistory error:',error);
          reject(error.code);
        });
      }else{
        sql.insert(historyInfo,columnData).then((results)=>{
          resolve({});
        }).catch((error)=>{
          console.log('addHistory error:',error);
          reject(error.code);
        });
      }
      resolve({});
    }).catch((error)=>{
      console.log('addHistory error:',error);
      reject(error.code);
    });
    // // 3.不存在历史,就插入
  });
}
module.exports = addHistory