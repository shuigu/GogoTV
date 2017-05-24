package com.zhuguoqing.greactnative.base;
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
    private Bundle mInitProps;
    public static GReactFragment newInstance(String moduleName,Bundle initProps){
        GReactFragment gReactFragment = new GReactFragment();
        Bundle bundle = new Bundle();
        bundle.putString("moduleName",moduleName);
        bundle.putBundle("initProps",initProps);
        gReactFragment.setArguments(bundle);
        return gReactFragment;
    }
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Bundle args = getArguments();
        mModuleName = args.getString("moduleName");
        mInitProps = args.getBundle("initProps");
    }
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        ReactRootView rootView = new ReactRootView(getActivity());
        rootView.startReactApplication(MainApplication.getInstance().getReactNativeHost().getReactInstanceManager(),mModuleName,mInitProps);
        return rootView;
    }
}
