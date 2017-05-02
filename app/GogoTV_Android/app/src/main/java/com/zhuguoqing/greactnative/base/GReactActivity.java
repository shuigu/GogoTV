package com.zhuguoqing.greactnative.base;

import android.app.Activity;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactRootView;
import com.zhuguoqing.gogotv.BaseActivity;
import com.zhuguoqing.gogotv.MainApplication;
import com.zhuguoqing.gogotv.R;

public class GReactActivity extends BaseActivity{
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        String moduleName = getIntent().getStringExtra("moduleName");
        ReactRootView reactRootView = new ReactRootView(this);
        reactRootView.startReactApplication(MainApplication.getInstance().getReactInstanceManager(),moduleName);
        setContentView(reactRootView);
    }
}
