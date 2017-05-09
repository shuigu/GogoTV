package com.zhuguoqing.gogotv;

import android.app.FragmentTransaction;
import android.os.Bundle;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactContext;
import com.zhuguoqing.gogotv.view.BottomTabView;
import com.zhuguoqing.greactnative.base.GReactFragment;
import com.zhuguoqing.greactnative.javascriptmodules.AppModule;

import java.util.ArrayList;
import java.util.List;


public class MainActivity extends ReactActivity {
    private Bundle mTabConfig;
    private BottomTabView mTabView;
    private List<GReactFragment> mFlagments = new ArrayList();
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

    }
    private  void initTabView(Bundle tabConfig){

        LinearLayout tabLayout = (LinearLayout) findViewById(R.id.id_tab);
        tabLayout.removeAllViews();
        mTabView = new BottomTabView(this.getBaseContext());

        mTabView.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
        List<Bundle> list = (List<Bundle>)tabConfig.getSerializable("tabs");
        for (int i=0;i<list.size();i++){
            Bundle item = list.get(i);
            String title = item.getString("title");
            String moduleName = item.getString("moduleName");
            mTabView.addItem(title);
            Bundle initProps = new Bundle();
            initProps.putString("title",title);
            GReactFragment fragment = new GReactFragment(moduleName,initProps);

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
    }
}