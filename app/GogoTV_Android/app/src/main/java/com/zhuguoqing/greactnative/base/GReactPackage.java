package com.zhuguoqing.greactnative.base;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.zhuguoqing.greactnative.javascriptmodules.AppModule;
import com.zhuguoqing.greactnative.reactnativemodule.GAppRCTModule;
import com.zhuguoqing.greactnative.reactnativemodule.GNavigationRCTModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by zhuguoqing on 17/4/24.
 */

public class GReactPackage extends Object implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> list = new ArrayList<>();
        list.add(new GAppRCTModule(reactContext));
        list.add(new GNavigationRCTModule(reactContext));
        return list;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        List<Class<? extends JavaScriptModule>> list = new ArrayList<>();
        list.add(AppModule.class);
        return list;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
