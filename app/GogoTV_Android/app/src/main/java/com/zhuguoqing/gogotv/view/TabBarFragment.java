package com.zhuguoqing.gogotv.view;


import android.os.Bundle;
import android.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.react.ReactRootView;
import com.zhuguoqing.gogotv.MainApplication;

/**
 * A simple {@link Fragment} subclass.
 */
public class TabBarFragment extends Fragment {


    public TabBarFragment() {
        // Required empty public constructor
    }
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        ReactRootView rootView = new ReactRootView(getActivity());
        rootView.startReactApplication(MainApplication.getInstance().getReactNativeHost().getReactInstanceManager(),"tabBar");
        return rootView;
    }

}
