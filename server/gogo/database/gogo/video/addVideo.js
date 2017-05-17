/**
 * Created by zhuguoqing on 2017/5/17.
 */

const  videoInfo = require('./../../sql/constant').videoInfo;
const  sql = global.__dataBase.sql;

function addVideo(columnData) {
  sql.insert(videoInfo,columnData)
}
module.exports = addVideo