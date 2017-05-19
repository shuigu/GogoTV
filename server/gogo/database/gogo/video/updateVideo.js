/**
 * Created by zhuguoqing on 2017/5/17.
 */
const  videoInfo = require('./../../sql/constant').videoInfo;
const  sql = global.__dataBase.sql;

function updateVideo(columnData,where) {
  return new Promise((resolve,reject)=>{
    sql.update(videoInfo,columnData,where).then((results)=>{
      resolve({});
    }).catch((error)=>{
      reject(error.code)
    })
  });
}

module.exports = updateVideo;