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
    private String mModuleName;
    private Bundle mInitProps;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mModuleName = getIntent().getStringExtra("moduleName");
        mInitProps  = getIntent().getBundleExtra("initProps");
        ReactRootView reactRootView = new ReactRootView(this);
        reactRootView.startReactApplication(MainApplication.getInstance().getReactInstanceManager(),mModuleName,mInitProps);
        setContentView(reactRootView);
    }
}
