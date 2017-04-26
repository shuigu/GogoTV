package com.zhuguoqing.gogotv.view;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.zhuguoqing.gogotv.R;

/**
 * Created by zhuguoqing on 17/4/25.
 */

public class TabItemView extends LinearLayout {
    private Boolean mCheck = false;
    private String  mTitle;
    public TabItemView(Context context) {
        super(context);
        LayoutInflater.from(context).inflate(R.layout.bottom_tab_item, this);
        updateUI();
    }
    public void setTitle(String title){
        mTitle = title;
        TextView textView = (TextView)findViewById(R.id.title);
        textView.setText(title);
    }
    public void setCheck(Boolean check) {
        this.mCheck = check;
        updateUI();
    }
    public Boolean getCheck() {
        return mCheck;
    }
    public void updateUI(){
        TextView textView = (TextView)findViewById(R.id.title);
        if (mCheck){
            textView.setTextColor(getContext().getResources().getColor(R.color.tabCheck));
        }else{
            textView.setTextColor(getContext().getResources().getColor(R.color.tabUnCheck));
        }
    }
}
