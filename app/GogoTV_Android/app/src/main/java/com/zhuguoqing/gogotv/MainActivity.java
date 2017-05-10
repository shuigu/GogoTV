package com.zhuguoqing.gogotv;

import android.app.FragmentTransaction;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactContext;
import com.zhuguoqing.greactnative.base.GReactFragment;
import com.zhuguoqing.greactnative.javascriptmodules.AppModule;
import com.zhuguoqing.greactnative.reactnativemodule.GAppRCTModule;

import java.util.ArrayList;
import java.util.List;


public class MainActivity extends ReactActivity {
    private Bundle mTabConfig;
    private List<GReactFragment> mFragments = new ArrayList();
    private BroadcastReceiver mRNBroadcastReceiver;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        AppManager.getAppManager().addActivity(this);
        setContentView(R.layout.activity_main);
        MainApplication.getInstance().mainActivity = this;

        MainApplication.getInstance().getReactInstanceManager().addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
            @Override
            public void onReactContextInitialized(ReactContext context) {
                MainApplication.getInstance().invokeJSModule(new MainApplication.Invoke() {
                    @Override
                    public void doInvoke(ReactContext context, String invokeId) {
                        context.getJSModule(AppModule.class).getTabConfig(invokeId);
                    }
                }, new MainApplication.InvokeReturn() {
                    @Override
                    public void onInvokeRetrun(Bundle returnJson) {
                        mTabConfig = returnJson;
                        initTabView(mTabConfig);
                    }
                });
            }
        });
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(GAppRCTModule.BROADCAST_RN_DISPATCH);
        mRNBroadcastReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                String action = intent.getStringExtra("action");
                final Bundle paramJson = intent.getBundleExtra("paramJson");
                if (action.equals("setTabSelectedIndex")) {
                    final int selectedIndex = paramJson.getInt("selectedIndex");
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            setSelectedIndex(selectedIndex);
                        }
                    });
                }
            }
        };
        registerReceiver(mRNBroadcastReceiver,intentFilter);
    }
    private  void initTabView(Bundle tabConfig){
        List<Bundle> list = (List<Bundle>)tabConfig.getSerializable("tabs");
        for (int i=0;i<list.size();i++){
            Bundle item = list.get(i);
            String moduleName = item.getString("moduleName");

            GReactFragment fragment = new GReactFragment(moduleName,item);
            mFragments.add(fragment);

            FragmentTransaction transaction = getFragmentManager().beginTransaction();
            transaction.add(R.id.id_content,fragment);
            transaction.commit();
        }
        int selectedIndex = tabConfig.getInt("selectedIndex");
        setSelectedIndex(selectedIndex);
    }
    public void setSelectedIndex(int index){
        GReactFragment fragment = mFragments.get(index);
        FragmentTransaction transaction = getFragmentManager().beginTransaction();
        hideAllFragment(transaction);
        transaction.show(fragment);
        transaction.commit();
    }
    public void hideAllFragment(FragmentTransaction transaction){
        for (GReactFragment fragment: mFragments){
            transaction.hide(fragment);
        }
    }
    @Override
    protected void onDestroy() {
        super.onDestroy();
        unregisterReceiver(mRNBroadcastReceiver);
        AppManager.getAppManager().finishActivity(this);
    }
}