package com.zhuguoqing.gogotv;

import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.CatalystInstance;
import com.facebook.react.bridge.ReactContext;
import com.zhuguoqing.greactnative.javascriptmodules.AppModule;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


        ReactRootView reactRootView = new ReactRootView(this);
        MainApplication mainApplication = (MainApplication)getApplication();
        final ReactInstanceManager reactInstanceManager = mainApplication.getReactNativeHost().getReactInstanceManager();
        reactInstanceManager.addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
            @Override
            public void onReactContextInitialized(ReactContext context) {

                CatalystInstance catalystInstance = reactInstanceManager.getCurrentReactContext().getCatalystInstance();
                catalystInstance.getJSModule(AppModule.class).getTabConfig();
//                catalystInstance.getJSModule(AppModule.class).testAndroid();

                Log.d("tag", "onReactContextInitialized: aaa");
            }
        });
        reactInstanceManager.createReactContextInBackground();

        reactRootView.startReactApplication(mainApplication.getReactNativeHost().getReactInstanceManager(),"app");

        setContentView(reactRootView);

//        setContentView(R.layout.activity_main);

    }
}
