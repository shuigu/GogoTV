package com.zhuguoqing.gogotv.view;
import android.app.Fragment;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.react.ReactRootView;
import com.zhuguoqing.gogotv.MainApplication;

public class GReactFragment extends Fragment {
    private String mModuleName;
    private Bundle mLaunchOptions;
    public GReactFragment() {
        super();
    }
    public GReactFragment(Bundle launchOptions) {
        this.mLaunchOptions = launchOptions;
        mModuleName = launchOptions.getString("moduleName");
    }
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        ReactRootView rootView = new ReactRootView(getActivity());
        rootView.startReactApplication(MainApplication.getInstance().getReactNativeHost().getReactInstanceManager(),mModuleName,mLaunchOptions);
        return rootView;
    }
}
