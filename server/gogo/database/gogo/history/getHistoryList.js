/**
 * Created by zhuguoqing on 2017/5/19.
 */
const  historyInfo = require('./../../sql/constant').userHistoryInfo;
const  videoInfo = require('./../../sql/constant').videoInfo;
var {
  getWhereString,
} = require('./../../sql/util');
const  sql = global.__dataBase.sql;

function getHistoryList(where) {
  return new Promise(function(resolve, reject) {

    let sqlString = 'select' + ' ' + historyInfo.columns.id + ',' +
      historyInfo.columns.duration + ',' +
      historyInfo.tableName +'.' +historyInfo.columns.videoId + ',' +
      videoInfo.columns.name + ',' +
      videoInfo.columns.logoUrl + ',' +
      videoInfo.columns.playUrl + ',' +
      videoInfo.columns.score + ',' +
      videoInfo.columns.describe + ',' +

      videoInfo.columns.screenShotUrl + ' ' +
      'from ' + historyInfo.tableName + ' left join ' + videoInfo.tableName + ' on ' +
      historyInfo.tableName +'.' +historyInfo.columns.videoId + '=' +
      videoInfo.tableName +'.' +videoInfo.columns.id + ' ' + getWhereString(historyInfo.columns,where);
    
    // console.log('sql:',sqlString);

    sql.query(sqlString).then((results)=>{
      // console.log(results);
      let list = [];
      for (let i=0;i<results.length;i++){
        item = results[i];
        let newItem = {};
        newItem.historyId     = item[historyInfo.columns.id];
        newItem.duration      = item[historyInfo.columns.duration];
        newItem.videoId       = item[videoInfo.columns.id];
        newItem.videoName     = item[videoInfo.columns.name];
        newItem.logoUrl       = item[videoInfo.columns.logoUrl];
        newItem.screenShotUrl = item[videoInfo.columns.screenShotUrl];
        newItem.playUrl       = item[videoInfo.columns.playUrl];
        newItem.score         = item[videoInfo.columns.score];
        newItem.describe      = item[videoInfo.columns.describe];
        list.push(newItem);
      }
      resolve(list);
    }).catch((error)=>{
      reject(error.code)
    })
  });
}

module.exports = getHistoryList;