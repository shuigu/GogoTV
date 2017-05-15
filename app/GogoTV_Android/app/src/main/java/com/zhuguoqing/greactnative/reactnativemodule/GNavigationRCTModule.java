package com.zhuguoqing.greactnative.reactnativemodule;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.zhuguoqing.gogotv.AppManager;
import com.zhuguoqing.gogotv.MainApplication;
import com.zhuguoqing.gogotv.PlayerActivity;
import com.zhuguoqing.greactnative.base.GReactActivity;
import com.zhuguoqing.util.GUtil;

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
        final Bundle bundle = GUtil.getBundle(initProps);
        MainApplication.getInstance().mainActivity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
            Activity currentActivity = AppManager.getAppManager().currentActivity();
            Boolean isPlayer = bundle.getBoolean("isPlayer");
            Class activityClass = isPlayer? PlayerActivity.class :GReactActivity.class;
            Intent intent = new Intent(currentActivity, activityClass);
            intent.putExtra("initProps",bundle);
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
