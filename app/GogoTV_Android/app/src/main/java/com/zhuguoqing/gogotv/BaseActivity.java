package com.zhuguoqing.gogotv;

import android.app.Activity;
import android.os.Bundle;

/**
 * Created by zhuguoqing on 2017/5/2.
 */

public class BaseActivity extends Activity{
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
        AppManager.getAppManager().finishActivity(this);
    }
}
