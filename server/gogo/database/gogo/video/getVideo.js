/**
 * Created by zhuguoqing on 2017/5/17.
 */

const  videoInfo = require('./../../sql/constant').videoInfo;
const  errorCode = require('./../../../constant/errorCode')


const  sql = global.__dataBase.sql;

function getVideo() {
  return new Promise(function(resolve, reject) {
    let newResult = {}
    sql.select(videoInfo).then((results)=>{
      let datas = [];
      for (let i=0;i<results.length;i++){
        item = results[i];
        let newItem = {};

        newItem.videoID       = item[videoInfo.columns.id];
        newItem.videoName     = item[videoInfo.columns.name];
        newItem.logoUrl       = item[videoInfo.columns.logoUrl];
        newItem.screenShotUrl = item[videoInfo.columns.screenShotUrl];
        newItem.describe      = item[videoInfo.columns.describe];
        newItem.playUrl       = item[videoInfo.columns.playUrl];
        newItem.type          = item[videoInfo.columns.type];

        datas.push(newItem);
      }

      newResult.code  = errorCode.succeed.code;
      newResult.msg   = errorCode.succeed.msg;
      newResult.count = datas.length;
      newResult.datas = datas;

      resolve(newResult);
      
    }).catch((error)=>{
      console.log('getVideo catch:',error.code)
      newResult = {
        code:errorCode.dbError.code,
        msg:errorCode.dbError.msg,
        dbCode:error.code,
      }
      resolve(newResult);
    })
  });
}
module.exports = getVideo;