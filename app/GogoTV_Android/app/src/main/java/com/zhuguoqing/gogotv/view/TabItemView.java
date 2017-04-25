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

public class TabItemView extends LinearLayout {
    public TabItemView(Context context, AttributeSet attrs) {
        super(context, attrs);
        // 加载布局
        LayoutInflater.from(context).inflate(R.layout.bottom_tab_item, this);
    }
    public void setTitle(String title){
        TextView textView = (TextView)findViewById(R.id.title);
        textView.setText(title);
    }
}
