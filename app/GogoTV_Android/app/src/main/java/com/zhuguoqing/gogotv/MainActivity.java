package com.zhuguoqing.gogotv;

import android.app.FragmentTransaction;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.zhuguoqing.gogotv.view.BottomTabView;
import com.zhuguoqing.gogotv.view.GReactFragment;

import java.util.ArrayList;
import java.util.List;


public class MainActivity extends ReactActivity {
    private MainApplication.ApplicationListener mApplicationListener;
    private ReadableMap mTabConfig;
    private BottomTabView mTabView;
    private List<GReactFragment> mFlagments = new ArrayList();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        AppManager.getAppManager().addActivity(this);
        setContentView(R.layout.activity_main);
        mApplicationListener = new MainApplication.ApplicationListener() {
            @Override
            public void tabConfig(final ReadableMap tabConfig) {
                mTabConfig = tabConfig;
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        MainActivity.this.initTabView(tabConfig);
                    }
                });
            }
        };
        MainApplication.getInstance().addApplicationListener(mApplicationListener);
        MainApplication.getInstance().mainActivity = this;
    }
    private  void initTabView(ReadableMap tabConfig){

        LinearLayout tabLayout = (LinearLayout) findViewById(R.id.id_tab);
        tabLayout.removeAllViews();
        mTabView = new BottomTabView(this.getBaseContext());

        mTabView.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
        ReadableArray tabs = tabConfig.getArray("tabs");
        for (int i=0;i<tabs.size();i++){
            ReadableMap tabItem = tabs.getMap(i);
            String title = tabItem.getString("title");
            String moduleName = tabItem.getString("moduleName");
            mTabView.addItem(title);
            GReactFragment fragment = new GReactFragment(moduleName);
            mFlagments.add(fragment);
            FragmentTransaction transaction = getFragmentManager().beginTransaction();
            transaction.add(R.id.id_content,fragment);
            transaction.commit();
        }
        mTabView.setTabClickListener(new BottomTabView.OnTabClickListener() {
            @Override
            public void onTabSelected(int index) {
                selectTab(index);
            }
        });
        selectTab(3);
        tabLayout.addView(mTabView);
    }
    public void selectTab(int index){
        mTabView.setCheck(index);
        GReactFragment fragment = mFlagments.get(index);
        FragmentTransaction transaction = getFragmentManager().beginTransaction();
        hideAllFlagment(transaction);
        transaction.show(fragment);
        transaction.commit();
    }
    public void hideAllFlagment(FragmentTransaction transaction){
        for (GReactFragment fragment:mFlagments){
            transaction.hide(fragment);
        }
    }
    @Override
    protected void onDestroy() {
        super.onDestroy();
        AppManager.getAppManager().finishActivity(this);
        MainApplication.getInstance().removeApplicationListener(mApplicationListener);
    }
}