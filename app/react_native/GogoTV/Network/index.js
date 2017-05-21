/**
 * Created by zhuguoqing on 2017/5/19.
 */
var NetworkConst  = require('./constant')
var NetworkStatic = require('./static')

function Fetch(){
  return fetch(...arguments).then((response) => response.json())
}
function Post(url,params) {
  return Fetch(url,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({...params})
  })
}
module.exports ={
  NetworkConst,
  Post,
  NetworkStatic,
}
