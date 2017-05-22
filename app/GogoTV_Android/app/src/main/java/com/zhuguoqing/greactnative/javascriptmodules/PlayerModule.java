package com.zhuguoqing.greactnative.javascriptmodules;

import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.ReadableMap;

/**
 * Created by zhuguoqing on 2017/5/22.
 */

public interface PlayerModule extends JavaScriptModule {
    void onPlayFinish(ReadableMap playItem);
}
