/**
 * Created by zhuguoqing on 2017/5/17.
 */
function getSqlColumnsValuesString(columnMap,columnData) {
  let columns = '('
  let values = '('
  for (let item in columnData){
    columns = columns + columnMap[item] + ',';
    values = values + '\'' +columnData[item] + '\'' + ',';
  }
  columns = columns.substring(0,columns.length-1);
  values = values.substring(0,values.length-1);

  columns = columns+')';
  values = values+')';

  return {columns,values};
}
function getSqlColumnsString(columnMap,columns) {
  let sql = ''
  for (let i=0;i<columns.length;i++){
    let c = i<columns.length-1?',':'';
    sql =sql + columnMap[columns[i]]+ c ;
  }
  return sql
}
function getWhereString(columnMap,where) {
  if (!where){
    return 'where 1'
  }
  let sql = 'where '
  for (let item in where){
    sql = sql + columnMap[item] + '=' + where[item] + ' and ';
  }
  sql = sql.substring(0,sql.length-4);
  return sql;

}

module.exports = {
  getSqlColumnsValuesString,
  getSqlColumnsString,
  getWhereString,
}

