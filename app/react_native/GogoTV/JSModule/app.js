/**
 * Created by zhuguoqing on 17/4/20.
 */

var BatchedBridge = require('BatchedBridge');

import {InvokeReturn} from './../../Core'
import {TabConfig} from './../Config/'
import  {Login} from './../Network'


var _userInfo = {};
var _token;

global._App = AppModule = {
  getTabConfig:InvokeReturn(()=>{
    return TabConfig;
  }),
  getUserInfo(){
    return _userInfo;
  },
  getToken(){
    return _token;
  },
  setUserInfo(userInfo){
    _userInfo = _userInfo;
  },
  setToken(token){
    _token = token;
  }
}

Login({userNo:'zhu',password:'123456'}).then((results)=>{
  console.log('Login results:',results)
  AppModule.setUserInfo(results.datas.userInfo);
  AppModule.setToken(results.datas.token);

}).catch((error)=>{
  console.log('Login error:',error)
})


BatchedBridge.registerCallableModule('AppModule', AppModule);


module.exports = AppModule;

