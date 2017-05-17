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

module.exports = DataBase;