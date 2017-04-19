package com.zhuguoqing.gogotv;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactRootView;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


        ReactRootView reactRootView = new ReactRootView(this);
        MainApplication mainApplication = (MainApplication)getApplication();
        reactRootView.startReactApplication(mainApplication.getReactNativeHost().getReactInstanceManager(),"app1");

        setContentView(reactRootView);

    }
}
