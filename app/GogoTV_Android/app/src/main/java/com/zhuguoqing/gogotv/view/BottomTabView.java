package com.zhuguoqing.gogotv.view;

import android.content.Context;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.zhuguoqing.gogotv.R;

import org.w3c.dom.Text;

/**
 * Created by zhuguoqing on 17/4/25.
 */

public class BottomTabView extends LinearLayout {

    public BottomTabView(Context context) {
        super(context);
        LayoutInflater.from(context).inflate(R.layout.bottom_tab, this);
    }
    public void addItem(String title){
        LinearLayout tabView = (LinearLayout)findViewById(R.id.tabView);
        TabItemView item = new TabItemView(this.getContext());
        item.setLayoutParams(new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.MATCH_PARENT,1));
        item.setTitle(title);
        tabView.addView(item);
    }
}
