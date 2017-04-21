/**
 * Created by zhuguoqing on 17/4/20.
 */

var BatchedBridge = require('BatchedBridge');
import {InvokeReturn} from './../Core'
import {TabConfig} from './Config/'

var AppModule = {
  getTabConfig:InvokeReturn(()=>{
    return TabConfig;
  })
}

BatchedBridge.registerCallableModule('AppModule', AppModule);
module.exports = AppModule;

