/**
 * Created by zhuguoqing on 2017/5/16.
 */

var mysql   = require('mysql');
var config  = require('./config');
var {
  getSqlColumnsValuesString,
  getSqlColumnsString,
  getWhereString,
  getSqlSetString,
} = require('./util');
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
  insert(columnMap,columnData){
    if (columnData.length < 1){
      console.log('insert error. columnData : ',columnData);
      return ;
    }
    let sql = 'insert into '+ columnMap.tableName+' '
    let {columns,values} = getSqlColumnsValuesString(columnMap.columns,columnData);
    sql = sql + columns + ' values ' + values ;
    console.log('sql:',sql);
    return this.query(sql);
  }
  select(columnMap,columns,where){
    let c = columns?getSqlColumnsString(columnMap.columns,columns):'*';
    let sql = 'select '+ c +' from ' + columnMap.tableName + ' ' + getWhereString(columnMap.columns,where);
    console.log('selectAll sql:',sql);
    return this.query(sql);
  }

  update(columnMap,columnData,where){
    let sql = 'update '+ columnMap.tableName + ' set ' + getSqlSetString(columnMap.columns,columnData) + ' ' +getWhereString(columnMap.columns,where);
    console.log('update sql:',sql);
    return this.query(sql);
  }
}
module.exports = Sql;