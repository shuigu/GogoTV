/**
 * Created by zhuguoqing on 2017/5/17.
 */

const  videoInfo = require('./../../sql/constant').videoInfo;
const  sql = global.__dataBase.sql;

function getVideo() {
  return new Promise(function(resolve, reject) {
    sql.select(videoInfo).then((results)=>{
      resolve(results);
    }).catch((error)=>{
      reject(error);
    })
  });
}
module.exports = getVideo;