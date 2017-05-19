/**
 * Created by zhuguoqing on 2017/5/17.
 */

const  videoInfo = require('./../../sql/constant').videoInfo;
const  sql = global.__dataBase.sql;

function getVideo() {
  return new Promise(function(resolve, reject) {
    sql.select(videoInfo).then((results)=>{
      let list = [];
      for (let i=0;i<results.length;i++){
        item = results[i];
        let newItem = {};

        newItem.videoId       = item[videoInfo.columns.id];
        newItem.videoName     = item[videoInfo.columns.name];
        newItem.logoUrl       = item[videoInfo.columns.logoUrl];
        newItem.screenShotUrl = item[videoInfo.columns.screenShotUrl];
        newItem.describe      = item[videoInfo.columns.describe];
        newItem.playUrl       = item[videoInfo.columns.playUrl];
        newItem.type          = item[videoInfo.columns.type];

        list.push(newItem);
      }
      resolve(list);
    }).catch((error)=>{
      reject(error.code)
    })
  });
}
module.exports = getVideo;