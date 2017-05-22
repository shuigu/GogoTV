/**
 * Created by zhuguoqing on 2017/5/19.
 */

var NetworkConst  = require('./constant')
var NetworkStatic = require('./static')

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTQ5NTE3MzE0Mn0.0V4cfhI9G9zR1n1YFAPv0XnpVNq9IvJDCnwyuNgE2gc";

var App = global._App;

function Fetch(){
  return fetch(...arguments).then((response) => response.json())
}
function Post(url,params) {
  console.log('url:'+url,' ',params)
  return Fetch(url,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({...params})
  })
}
function RecomList() {
  return Post(NetworkConst.API_RECOM_LIST());
}
function Login(params) {
  return Post(NetworkConst.API_USER_LOGIN(),params)
}
function AddHistory(history) {
  console.log('AddHistory.')
  let params = {
    ...history,
    token:global._App.getToken(),
  }
  return Post(NetworkConst.API_HISTORY_ADD(),params);
}
module.exports ={
  NetworkConst,
  Post,
  NetworkStatic,
  AddHistory,
  Login,
  RecomList,
}
