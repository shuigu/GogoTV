package com.zhuguoqing.gogotv;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.zhuguoqing.greactnative.base.GReactPackage;
import com.zhuguoqing.greactnative.javascriptmodules.AppModule;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class MainApplication extends Application implements ReactApplication {
  private static String JsMainModuleName = "index";
  private static MainApplication instance;
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
    instance = this;
    SoLoader.init(this, /* native exopackage */ false);
    /**
     * 初始化 React环境
     * */
    mReactNativeHost.getReactInstanceManager().createReactContextInBackground();
    mReactNativeHost.getReactInstanceManager().addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
      @Override
      public void onReactContextInitialized(ReactContext context) {
        context.getJSModule(AppModule.class).getTabConfig();
      }
    });
  }
  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  /************** application listener *******************/
  private Set<ApplicationListener> mListenerSet = new HashSet<>();
  public void addApplicationListener(ApplicationListener listener){
    mListenerSet.add(listener);
  }
  public void removeApplicationListener(ApplicationListener listener){
    mListenerSet.remove(listener);
  }

  /**
   * 由GAppRCTModule调用
   * */
  public void tabConfig(ReadableMap tabConfig){
    for (ApplicationListener listener:mListenerSet){
      listener.tabConfig(tabConfig);
    }
  }

  public interface ApplicationListener {
    public void tabConfig(ReadableMap tabConfig);
  }

}
