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
    public static final String TAB_CONFIG = "tabConfig";

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
        /**
         * 这个函数可以优化？
         */
        /*
        * **/
        if (key.equals(TAB_CONFIG)){
            MainApplication.getInstance().tabConfig(data);
        }
    }

}
