package com.zhuguoqing.gogotv;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.os.Handler;
import android.util.DisplayMetrics;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.LinearLayout;

import com.facebook.react.ReactRootView;
import com.zhuguoqing.gogotv.media.GVideoView;
import com.zhuguoqing.greactnative.javascriptmodules.PlayerModule;
import com.zhuguoqing.greactnative.reactnativemodule.GAppRCTModule;
import com.zhuguoqing.util.GUtil;

import java.util.Date;

import tv.danmaku.ijk.media.player.IjkMediaPlayer;

public class PlayerActivity extends BaseActivity {
    GVideoView mVideoView;
    private BroadcastReceiver mRNBroadcastReceiver;
    private Bundle mInitProps;
    private Date startData = new Date(System.currentTimeMillis());
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_player);


        mInitProps  = getIntent().getBundleExtra("initProps");

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
        playerControlSmallView.startReactApplication(MainApplication.getInstance().getReactNativeHost().getReactInstanceManager(),"PlayerControlSmall",mInitProps);
        playerControlSmallView.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        playerContainer.addView(playerControlSmallView);
        playerControlSmallView.setVisibility(isPortraitScreen? View.VISIBLE:View.INVISIBLE);

        // 大屏播放控制View
        ReactRootView playerControlBigView = new ReactRootView(this);
        playerControlBigView.startReactApplication(MainApplication.getInstance().getReactNativeHost().getReactInstanceManager(),"PlayerControlBig",mInitProps);
        playerControlBigView.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        playerContainer.addView(playerControlBigView);
        playerControlBigView.setVisibility(!isPortraitScreen?View.VISIBLE:View.INVISIBLE);


        // 详情页
        FrameLayout detailContainer = (FrameLayout)findViewById(R.id.detail_container);
        ReactRootView playerDetailView = new ReactRootView(this);
        playerDetailView.startReactApplication(MainApplication.getInstance().getReactNativeHost().getReactInstanceManager(),"PlayerDetail",mInitProps);
        playerDetailView.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        detailContainer.addView(playerDetailView);

        // 延迟1s加载播放器，避免卡顿
        new Handler().postDelayed(new Runnable(){
            public void run() {
                initPlayer();
            }
        }, 1000);


        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(GAppRCTModule.BROADCAST_RN_DISPATCH);
        mRNBroadcastReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                String action = intent.getStringExtra("action");
                final Bundle paramJson = intent.getBundleExtra("paramJson");
                if (action.equals("player_fullScreen")) {
                    setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
                }else if (action.equals("player_portraitScreen")){
                    setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
                }
            }
        };
        registerReceiver(mRNBroadcastReceiver,intentFilter);
    }
    public void initPlayer(){
        // init player
        // rtmp://live.hkstv.hk.lxdns.com/live/hks
        IjkMediaPlayer.loadLibrariesOnce(null);
        IjkMediaPlayer.native_profileBegin("libijkplayer.so");

        FrameLayout videoContainer = (FrameLayout)findViewById(R.id.video_container);
        mVideoView = new GVideoView(getBaseContext());
        mVideoView.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        videoContainer.addView(mVideoView);
        mVideoView.setVideoPath(mInitProps.getString("playUrl"));
        mVideoView.start();
    }
    public void unInitPlayer(){
        FrameLayout videoContainer = (FrameLayout)findViewById(R.id.video_container);
        videoContainer.removeAllViews();
        mVideoView = null;
    }
    @Override
    protected void onStop() {
        super.onStop();
        if (mVideoView != null){
            mVideoView.release(true);
        }
        IjkMediaPlayer.native_profileEnd();
    }
    @Override
    protected void onDestroy() {
        super.onDestroy();
        unregisterReceiver(mRNBroadcastReceiver);
    }
    @Override
    public void finish() {
        super.finish();
        Date current = new Date(System.currentTimeMillis());
        long duration = current.getTime() - startData.getTime();
        Bundle  playItem = (Bundle)mInitProps.clone();
        playItem.putInt("duration",(int)duration/1000);
        MainApplication.getInstance().getJSModule(PlayerModule.class).onPlayFinish(GUtil.getReadableMap(playItem));
    }
}
