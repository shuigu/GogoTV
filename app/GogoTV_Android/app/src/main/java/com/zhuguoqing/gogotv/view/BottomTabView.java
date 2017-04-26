package com.zhuguoqing.gogotv.view;

import android.content.Context;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.zhuguoqing.gogotv.R;

import org.w3c.dom.Text;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by zhuguoqing on 17/4/25.
 */

public class BottomTabView extends LinearLayout {
    private List<TabItemView> mItems = new ArrayList<TabItemView>();
    private OnTabClickListener tabClickListener;
    public BottomTabView(Context context) {
        super(context);
        LayoutInflater.from(context).inflate(R.layout.bottom_tab, this);
    }
    public TabItemView addItem(String title){
        LinearLayout tabView = (LinearLayout)findViewById(R.id.tabView);
        TabItemView item = new TabItemView(this.getContext());
        item.setLayoutParams(new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.MATCH_PARENT,1));
        item.setTitle(title);
        tabView.addView(item);
        mItems.add(item);
        final int index = mItems.size()-1;
        item.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                setCheck(index);
                if (tabClickListener != null){
                    tabClickListener.onTabSelected(index);
                }
            }
        });
        return item;
    }
    public void setCheck(int index){
        clearAllCheck();
        TabItemView selectItem = mItems.get(index);
        selectItem.setCheck(true);
    }
    public void clearAllCheck(){
        for (TabItemView item: mItems){
            item.setCheck(false);
        }
    }

    public void setTabClickListener(OnTabClickListener tabClickListener) {
        this.tabClickListener = tabClickListener;
    }
    public interface OnTabClickListener {
        void onTabSelected(int index);
    }
}
