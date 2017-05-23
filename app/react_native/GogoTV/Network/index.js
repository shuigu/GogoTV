/**
 * Created by zhuguoqing on 2017/5/19.
 */

import {App} from './../JSModule'
var NetworkConst  = require('./constant')
var NetworkStatic = require('./static')


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
function Login(params) {
  return Post(NetworkConst.API_USER_LOGIN(),params)
}
function RecomList() {
  return Post(NetworkConst.API_RECOM_LIST());
}
function AddHistory(history) {
  console.log('AddHistory.')
  let params = {
    ...history,
    token:global._App.getToken(),
  }
  return Post(NetworkConst.API_HISTORY_ADD(),params);
}
function HistoryList() {
  let params = {
    token:global._App.getToken(),
  }
  return Post(NetworkConst.API_HISTORY_LIST(),params);
}

module.exports ={
  NetworkConst,
  Post,
  NetworkStatic,
  AddHistory,
  Login,
  RecomList,
  HistoryList,
}
