/**
 * Created by zhuguoqing on 2017/5/19.
 */
const  videoInfo = require('./../../sql/constant').videoInfo;
const  sql = global.__dataBase.sql;

function getVideoDetail(where) {
  return new Promise(function(resolve, reject) {
    sql.select(videoInfo,null,where).then((results)=>{

      let item = results[0];
      let newItem = {};
      newItem.videoId       = item[videoInfo.columns.id];
      newItem.videoName     = item[videoInfo.columns.name];
      newItem.logoUrl       = item[videoInfo.columns.logoUrl];
      newItem.screenShotUrl = item[videoInfo.columns.screenShotUrl];
      newItem.describe      = item[videoInfo.columns.describe];
      newItem.playUrl       = item[videoInfo.columns.playUrl];
      newItem.type          = item[videoInfo.columns.type];
      resolve(newItem);
    }).catch((error)=>{
      reject(error.code)
    })
  });
}
module.exports = getVideoDetail;