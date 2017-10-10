package com.xgjk.common.lib.manager.storage.imp;

import android.content.Context;
import android.content.SharedPreferences;

import com.orhanobut.logger.Logger;
import com.xgjk.common.lib.manager.storage.abs.IStoreInt;

/**
 * Created by shangwf on 2017/4/29.
 */

public class StoreIntImp implements IStoreInt {
    private final static String SHARED_PREFERENCES_TAG = "LOCAL_DB";
    private final SharedPreferences sharedPreferences;

    public StoreIntImp(Context context) {
        sharedPreferences = context.getSharedPreferences(SHARED_PREFERENCES_TAG, Context.MODE_PRIVATE);
    }

    @Override
    public synchronized void put(String key, int value) {
        final SharedPreferences.Editor edit = sharedPreferences.edit();
        edit.putInt(key, value);
        edit.apply();
    }

    @Override
    public synchronized int get(String key) {
        final int value = sharedPreferences.getInt(key,0);
        return value;
    }

    @Override
    public int get(String key, int defaultValue) {
        final int value = sharedPreferences.getInt(key,defaultValue);
        return value;
    }
}
