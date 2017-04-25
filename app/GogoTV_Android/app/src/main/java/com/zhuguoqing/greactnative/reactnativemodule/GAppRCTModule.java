package com.zhuguoqing.greactnative.reactnativemodule;

import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.JavaOnlyMap;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.zhuguoqing.gogotv.MainApplication;

/**
 * Created by zhuguoqing on 17/4/24.
 */

public class GAppRCTModule extends ReactContextBaseJavaModule {

    public static final String action = "com.zhuguoqing.gogotv.senddata";
    public GAppRCTModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public String getName() {
        return "GAppRCTModule";
    }
    /**
     * JavaScript 通过这个方法给 native 回调数据
     */
    @ReactMethod
    public void sendData(String key,ReadableMap data){
        Intent intent = new Intent(action);
        intent.putExtra("key",key);
        intent.putExtra("data","data");
        /**
         * 可以优化？
         */
        MainApplication.getContext().sendBroadcast(intent);
    }

}
