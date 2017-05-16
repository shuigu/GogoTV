/**
 * Created by zhuguoqing on 2017/5/16.
 */

var mysql   = require('mysql');
var config  = require('./config')
class Sql {
  // 构造
  constructor() {
    this.connection = mysql.createConnection(config);
    // 链接
    this.connection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err);
        process.exit();
      }
    });
    this.query('SELECT * FROM gogo.test').then((results)=>{
      console.log('results:',results[0]);
    }).catch((error)=>{
      console.log('error:',error);
    });
  }
  query(sql){
    return new Promise(function (resolve, reject) {
      this.connection.query(sql,function (error,results,fields) {
        if (error){
          reject(error);
        }else{
          resolve(results);
        }
      });
    }.bind(this));
  }
}
module.exports = Sql;