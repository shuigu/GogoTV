package com.zhuguoqing.greactnative.reactnativemodule;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.zhuguoqing.gogotv.AppManager;
import com.zhuguoqing.gogotv.MainApplication;
import com.zhuguoqing.greactnative.base.GReactActivity;

/**
 * Created by zhuguoqing on 2017/5/2.
 */

public class GNavigationRCTModule extends ReactContextBaseJavaModule {
    public GNavigationRCTModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public String getName() {
        return "GNavigationRCTModule";
    }
    @ReactMethod
    public void push(final String moduleName, ReadableMap initProps){
        MainApplication.getInstance().mainActivity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Activity currentActivity = AppManager.getAppManager().currentActivity();
                Intent intent = new Intent(currentActivity, GReactActivity.class);
                intent.putExtra("moduleName",moduleName);
                MainApplication.getInstance().mainActivity.startActivity(intent);
            }
        });
    }
    @ReactMethod
    public void pop(){
        AppManager.getAppManager().finishActivity();
    }
}
