/**
 * Created by zhuguoqing on 17/4/20.
 */

var BatchedBridge = require('BatchedBridge');
var GAppModule    = require('NativeModules').GAppRCTModule;
import {InvokeReturn} from './../Core'
import {TabConfig} from './Config/'


var AppModule = {
  getTabConfig:()=>{
    GAppModule.sendData('tabConfig',TabConfig);
  }

}

BatchedBridge.registerCallableModule('AppModule', AppModule);
module.exports = AppModule;

