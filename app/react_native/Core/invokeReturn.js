/**
 * Created by zhuguoqing on 2017/5/9.
 */
var GAppModule = require('NativeModules').GAppRCTModule;
function InvokeReturn(fn) {
  return (invokeId,...args)=>{
    let result = fn(...args);
    GAppModule.invokeReturn(invokeId,result);
  }
}
module.exports = InvokeReturn;
