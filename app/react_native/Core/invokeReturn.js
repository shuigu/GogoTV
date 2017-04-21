/**
 * Created by zhuguoqing on 17/4/21.
 */
var GAppModule = require('NativeModules').GAppRCTModule;
function InvokeRetrun(fn) {
  return (invokeId,...args)=>{
    let result = fn(...args);
    GAppModule.returnInvoke(invokeId,result);
  }
}
module.exports = InvokeRetrun;