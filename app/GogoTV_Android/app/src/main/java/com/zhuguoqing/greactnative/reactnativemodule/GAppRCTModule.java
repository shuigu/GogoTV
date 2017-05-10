package com.zhuguoqing.greactnative.reactnativemodule;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.bridge.JavaOnlyMap;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.zhuguoqing.gogotv.MainApplication;
import com.zhuguoqing.util.GUtil;

/**
 * Created by zhuguoqing on 17/4/24.
 */

public class GAppRCTModule extends ReactContextBaseJavaModule {
    public static final String BROADCAST_INVOKE_RETURN  = ".invokeReturn";
    public static final String BROADCAST_RN_DISPATCH    = ".rnDispatch";

    public GAppRCTModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public String getName() {
        return "GAppRCTModule";
    }
    @ReactMethod
    public void invokeReturn(String invokeId,ReadableMap returnJson){
        Bundle bundle = GUtil.getBundle(returnJson);
        Intent intent = new Intent();
        intent.putExtra("returnJson",bundle);
        intent.putExtra("invokeId",invokeId);
        intent.setAction(BROADCAST_INVOKE_RETURN);
        MainApplication.getInstance().getBaseContext().sendBroadcast(intent);
    }
    @ReactMethod
    public void dispatch(String action,ReadableMap paramJson){
        Bundle bundle = GUtil.getBundle(paramJson);
        Intent intent = new Intent();
        intent.putExtra("paramJson",bundle);
        intent.putExtra("action",action);
        intent.setAction(BROADCAST_RN_DISPATCH);
        MainApplication.getInstance().getBaseContext().sendBroadcast(intent);
    }


}
