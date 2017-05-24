package com.zhuguoqing.gogotv;

import android.app.Activity;
import android.app.Application;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.zhuguoqing.greactnative.base.GReactPackage;
import com.zhuguoqing.greactnative.reactnativemodule.GAppRCTModule;
import com.zhuguoqing.util.GUtil;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Nullable;

public class MainApplication extends Application implements ReactApplication {
  private static String JsMainModuleName = "index";
  private static MainApplication instance;
  private Map<String,InvokeReturn> invokeMap;
  public Activity mainActivity;
  public static MainApplication getInstance()
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
      return JsMainModuleName;
    }

    @Nullable
    @Override
    protected String getJSBundleFile() {
      return super.getJSBundleFile();
    }
    @Nullable
    @Override
    protected String getBundleAssetName() {
      return super.getBundleAssetName();
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
              new GReactPackage()
      );
    }
  };
  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

    instance = this;

    /**
    * 初始化 Invoke Return
    * **/

    initInvokeReturn();

    /**
     * 初始化 React环境
     * */
    mReactNativeHost.getReactInstanceManager().createReactContextInBackground();
  }
  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }
  public ReactInstanceManager getReactInstanceManager() {
    return mReactNativeHost.getReactInstanceManager();
  }
  public <T extends JavaScriptModule> T getJSModule(Class<T> jsInterface) {
    return getReactInstanceManager().getCurrentReactContext().getJSModule(jsInterface);
  }
  /************** invokeReturn *******************/
  public void initInvokeReturn(){

    /**
     * inti invokeMap
     * */
    invokeMap = new HashMap<>();

    /**
     * 注册广播
     * */
    IntentFilter intentFilter = new IntentFilter();
    intentFilter.addAction(GAppRCTModule.BROADCAST_INVOKE_RETURN);
    registerReceiver(new BroadcastReceiver() {
      @Override
      public void onReceive(Context context, Intent intent) {
        String invokeId = intent.getStringExtra("invokeId");
        final  Bundle returnJson = intent.getBundleExtra("returnJson");

        final  InvokeReturn invokeReturn = invokeMap.get(invokeId);
        if (invokeReturn != null){
          mainActivity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
              invokeReturn.onInvokeReturn(returnJson);
            }
          });
          invokeMap.remove(invokeId);
        }
      }
    },intentFilter);
  }
  public void invokeJSModule(Invoke invoke,InvokeReturn invokeReturn){
    String invokeId = GUtil.uuid();
    invokeMap.put(invokeId,invokeReturn);
    invoke.doInvoke(getReactInstanceManager().getCurrentReactContext(),invokeId);
  }
  public  interface InvokeReturn {
    public void onInvokeReturn(Bundle returnJson);
  }
  public interface Invoke {
    public void doInvoke(ReactContext context, String invokeId);
  }
}


