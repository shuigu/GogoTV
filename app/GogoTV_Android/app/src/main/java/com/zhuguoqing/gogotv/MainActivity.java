package com.zhuguoqing.gogotv;

import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.widget.LinearLayout;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.CatalystInstance;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.zhuguoqing.gogotv.base.ApplicationListener;
import com.zhuguoqing.gogotv.view.BottomTabView;
import com.zhuguoqing.greactnative.javascriptmodules.AppModule;

public class MainActivity extends ReactActivity {
    private ApplicationListener mApplicationListener;
    private ReadableMap mTabConfig;
    private Handler mTabViewHander = new Handler(){
        @Override
        public void handleMessage(Message msg) {
            initTabView(mTabConfig);
        }
    };
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mApplicationListener = new ApplicationListener() {
            @Override
            public void tabConfig(ReadableMap tabConfig) {
                mTabConfig = tabConfig;
                mTabViewHander.sendEmptyMessage(0);
            }
        };
        MainApplication.getInstance().addApplicationListener(mApplicationListener);
    }
    private  void initTabView(ReadableMap tabConfig){
        LinearLayout mainView = (LinearLayout) findViewById(R.id.activity_main);
        BottomTabView tabView = new BottomTabView(this.getBaseContext(),null);
        ReadableArray tabs = tabConfig.getArray("tabs");
        for (int i=0;i<tabs.size();i++){
            ReadableMap tabItem = tabs.getMap(i);
            String title = tabItem.getString("title");
            String moduleName = tabItem.getString("moduleName");
            tabView.addItem(title);
        }
        mainView.addView(tabView);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        MainApplication.getInstance().removeApplicationListener(mApplicationListener);
    }
}
