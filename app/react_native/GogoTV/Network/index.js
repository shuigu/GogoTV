/**
 * Created by zhuguoqing on 2017/5/19.
 */
var NetworkConst = require('./constant')


function Post(url,params) {
  return fetch(url,{
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
}
