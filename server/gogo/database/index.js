/**
 * Created by zhuguoqing on 2017/5/16.
 */

const Sql = require('./sql');

class DataBase {
  // 构造
  constructor() {
    this.sql = new Sql();
  }
}

// 全局的,引用方法
// const  dataBase = require('./database')
var dataBase = new DataBase();
module.exports = {
  dataBase,
};