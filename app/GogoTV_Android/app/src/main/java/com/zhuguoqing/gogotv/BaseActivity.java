package com.zhuguoqing.gogotv;

import android.app.Activity;
import android.os.Bundle;
import android.view.WindowManager;

import static android.content.res.Configuration.ORIENTATION_PORTRAIT;

/**
 * Created by zhuguoqing on 2017/5/2.
 */

public class BaseActivity extends Activity{

    /**
     * 是否是竖屏
     * */
    public static boolean isVerticalScreen(Activity activity) {
        int flag = activity.getResources().getConfiguration().orientation;
        if (flag == ORIENTATION_PORTRAIT) {
            return true;
        }else {
            return false;
        }
    }
    /**
     * 是否是全屏标志
     * */
    public static boolean isFullScreenFlag(Activity activity) {
        int flag = activity.getWindow().getAttributes().flags;
        if((flag & WindowManager.LayoutParams.FLAG_FULLSCREEN)
                == WindowManager.LayoutParams.FLAG_FULLSCREEN) {
            return true;
        }else {
            return false;
        }
    }
    public static void setFullScreenFlag(Activity activity,boolean isFullScreen){
        if (isFullScreen){
            activity.getWindow().setFlags(WindowManager.LayoutParams. FLAG_FULLSCREEN ,
                    WindowManager.LayoutParams. FLAG_FULLSCREEN);//全屏
        }else{
            activity.getWindow().clearFlags( WindowManager.LayoutParams.FLAG_FULLSCREEN);
        }
    }
    /**
     * 对context进行初始化，并将当前的Activity加入到堆栈中，便于管理
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // 添加Activity到堆栈
        AppManager.getAppManager().addActivity(this);
    }
    @Override
    protected void onDestroy() {
        super.onDestroy();
        // 结束Activity&从堆栈中移除
        AppManager.getAppManager().removeActivity(this);
    }
}
