/**
 * Created by zhuguoqing on 17/4/20.
 */

var BatchedBridge = require('BatchedBridge');

import {InvokeReturn} from './../../Core'
import {TabConfig} from './../Config/'
import  {Login} from './../Network'

const defaultToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTQ5NTE3MzE0Mn0.0V4cfhI9G9zR1n1YFAPv0XnpVNq9IvJDCnwyuNgE2gc";


var _userInfo = {};
var _token;

var AppModule = global._App = {
  getTabConfig:InvokeReturn(()=>{
    return TabConfig;
  }),
  getUserInfo(){
    return _userInfo;
  },
  getToken(){
    return _token?_token:defaultToken;
  },
  setUserInfo(userInfo){
    _userInfo = _userInfo;
  },
  setToken(token){
    _token = token;
  },
}

/// 登录
Login({userNo:'zhu',password:'123456'}).then((results)=>{
  console.log('Login results:',results)
  AppModule.setUserInfo(results.datas.userInfo);
  AppModule.setToken(results.datas.token);

}).catch((error)=>{
  console.log('Login error:',error)
})

BatchedBridge.registerCallableModule('AppModule', AppModule);


module.exports = AppModule;

