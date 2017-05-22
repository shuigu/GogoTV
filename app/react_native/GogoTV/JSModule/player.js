/**
 * Created by zhuguoqing on 2017/5/22.
 */
import {InvokeReturn} from './../../Core'
import {
  PlayerDispatch
} from './../Constant/dispatch'
import {AddHistory} from './../Network'



var BatchedBridge = require('BatchedBridge');
var GAppModule = require('NativeModules').GAppRCTModule;

var PlayerModule = {
  dispatchFullScreen(){
    GAppModule.dispatch(PlayerDispatch.PLAYER_FULL_SCREEN,{})
  },
  dispatchPortraitScreen(){
    GAppModule.dispatch(PlayerDispatch.PLAYER_PORTRAIT_SCREEN,{})
  },
  onPlayFinish(playItem){
    console.log("onPlayFinish.",playItem)
    let history ={
      videoId:playItem.videoId,
      duration:playItem.duration,
    }
    AddHistory(history);
  }
}
BatchedBridge.registerCallableModule('PlayerModule', PlayerModule);

module.exports = PlayerModule;