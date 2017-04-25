package com.zhuguoqing.gogotv;

import android.app.Application;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.zhuguoqing.greactnative.base.GReactPackage;
import com.zhuguoqing.greactnative.reactnativemodule.GAppRCTModule;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private static Context instance;
  public static Context getContext()
  {
    return instance;
  }
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }
    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
              new GReactPackage()
      );
    }
  };
  private BroadcastReceiver mBroadcastReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
      String key = intent.getStringExtra("key");
      int a = 9;
    }
  };
  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }
  public ReactInstanceManager getReactInstanceManager(){return mReactNativeHost.getReactInstanceManager();}
  @Override
  public void onCreate() {
    super.onCreate();
    instance = getApplicationContext();
    SoLoader.init(this, /* native exopackage */ false);
    IntentFilter filter = new IntentFilter();
    filter.addAction(GAppRCTModule.action);
    registerReceiver(mBroadcastReceiver, filter);
  }



}
