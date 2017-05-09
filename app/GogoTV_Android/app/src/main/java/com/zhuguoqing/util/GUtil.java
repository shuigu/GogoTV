package com.zhuguoqing.util;

import android.os.Bundle;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by zhuguoqing on 17/4/24.
 */

public class GUtil extends Object {
    public static String uuid(){
        return java.util.UUID.randomUUID().toString();
    }
    public static Bundle getBundle(ReadableMap map){
        Bundle bundle = new Bundle();
        ReadableMapKeySetIterator iterator = map.keySetIterator();
        while (iterator.hasNextKey()){
            String key = iterator.nextKey();
            switch (map.getType(key)){
                case Null:
                    break;
                case Boolean:
                    bundle.putBoolean(key,map.getBoolean(key));
                    break;
                case Number:
                    bundle.putInt(key,map.getInt(key));
                    break;
                case String:
                    bundle.putString(key,map.getString(key));
                    break;
                case Map:
                    bundle.putBundle(key,getBundle(map.getMap(key)));
                    break;
                case Array:
                    ReadableArray array = map.getArray(key);
                    if (array.size() > 0){
                        List list = getBundle(map.getArray(key));
                        if (list != null){
                            bundle.putSerializable(key,(Serializable)list);
                        }
                    }
                    break;
            }
        }
        return bundle;
    }
    public static<T> List<T> getBundle(ReadableArray array){
        List<T> list = null;
        if (array.size() > 0){
            list = new ArrayList<>();
            for (int i=0;i<array.size();i++) {
                ReadableType type = array.getType(0);
                switch (type){
                case Number:
                    list.add((T)(Number)array.getInt(i));
                    break;
                case String:
                    list.add((T)array.getString(i));
                    break;
                case Map:
                    list.add((T)getBundle(array.getMap(i)));
                    break;
                case Array:
                    ReadableArray itemArray = array.getArray(i);
                    if (itemArray.size() > 0){
                        List itemList = getBundle(itemArray);
                        if (itemList != null){
                            list.add((T)itemList);
                        }
                    }

                    break;
                }
            }
        }
        return list;
    }
}
