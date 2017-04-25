package com.zhuguoqing.gogotv.view;

import android.content.Context;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.zhuguoqing.gogotv.R;

/**
 * Created by zhuguoqing on 17/4/25.
 */

public class BottomTabView extends LinearLayout {
    public BottomTabView(Context context, AttributeSet attrs) {
        super(context, attrs);
        // 加载布局
        LayoutInflater.from(context).inflate(R.layout.bottom_tab, this);
    }
    public void addItem(String title){
        LinearLayout tabView = (LinearLayout)findViewById(R.id.tabView);
        TabItemView item = new TabItemView(this.getContext(),null);
        item.setTitle(title);
        tabView.addView(item);

    }
}
