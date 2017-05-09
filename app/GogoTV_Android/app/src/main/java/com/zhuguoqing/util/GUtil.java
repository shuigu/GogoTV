package com.zhuguoqing.util;

import android.os.Bundle;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;

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
                    break;
                case Array:
                    break;
            }
        }
        return bundle;
    }
}
