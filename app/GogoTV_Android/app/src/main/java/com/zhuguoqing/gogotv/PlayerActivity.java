package com.zhuguoqing.gogotv;

import android.app.Activity;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.FrameLayout;
import android.widget.LinearLayout;

import com.facebook.react.ReactRootView;
import com.zhuguoqing.gogotv.media.GVideoView;

import tv.danmaku.ijk.media.player.IjkMediaPlayer;

public class PlayerActivity extends BaseActivity {
    GVideoView mVideoView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_player);

        //获取屏幕宽度
        DisplayMetrics dm = new DisplayMetrics();
        getWindowManager().getDefaultDisplay().getMetrics(dm);
        int width = dm.widthPixels;
        int height  = dm.heightPixels;
        boolean isPortraitScreen = BaseActivity.isVerticalScreen(this);
        if(isPortraitScreen){
            height = (int)((double)width * 0.56);
            BaseActivity.setFullScreenFlag(this,false);
        }else{
            BaseActivity.setFullScreenFlag(this,true);
        }
        // 播放器
        FrameLayout playerContainer = (FrameLayout)findViewById(R.id.player_container);
        LinearLayout.LayoutParams linearParams = (LinearLayout.LayoutParams) playerContainer.getLayoutParams();
        linearParams.width = width;
        linearParams.height = height;
        playerContainer.setLayoutParams(linearParams);
        // 小屏播放控制View
        ReactRootView playerControlSmallView = new ReactRootView(this);
        playerControlSmallView.startReactApplication(MainApplication.getInstance().getReactNativeHost().getReactInstanceManager(),"PlayerControlSmall",null);
        playerControlSmallView.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        playerContainer.addView(playerControlSmallView);
        playerControlSmallView.setVisibility(isPortraitScreen? View.VISIBLE:View.INVISIBLE);

        // 大屏播放控制View
        ReactRootView playerControlBigView = new ReactRootView(this);
        playerControlBigView.startReactApplication(MainApplication.getInstance().getReactNativeHost().getReactInstanceManager(),"PlayerControlBig",null);
        playerControlBigView.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        playerContainer.addView(playerControlBigView);
        playerControlBigView.setVisibility(!isPortraitScreen?View.VISIBLE:View.INVISIBLE);


        // 详情页
        FrameLayout detailContainer = (FrameLayout)findViewById(R.id.detail_container);
        ReactRootView playerDetailView = new ReactRootView(this);
        playerDetailView.startReactApplication(MainApplication.getInstance().getReactNativeHost().getReactInstanceManager(),"PlayerDetail",null);
        playerDetailView.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        detailContainer.addView(playerDetailView);


        // init player
        IjkMediaPlayer.loadLibrariesOnce(null);
        IjkMediaPlayer.native_profileBegin("libijkplayer.so");

        mVideoView = (GVideoView) findViewById(R.id.video_view);
        mVideoView.setVideoPath("rtmp://live.hkstv.hk.lxdns.com/live/hks");
        mVideoView.start();

    }
    @Override
    protected void onStop() {
        super.onStop();
        if (mVideoView != null){
            mVideoView.release(true);
        }
        IjkMediaPlayer.native_profileEnd();
    }
}
