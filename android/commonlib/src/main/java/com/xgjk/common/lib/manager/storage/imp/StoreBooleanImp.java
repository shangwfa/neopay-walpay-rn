package com.xgjk.common.lib.manager.storage.imp;

import android.content.Context;
import android.content.SharedPreferences;

import com.xgjk.common.lib.manager.storage.abs.IStoreBoolean;

/**
 * Created by shangwf on 2017/4/29.
 */

public class StoreBooleanImp implements IStoreBoolean {
    private final static String SHARED_PREFERENCES_TAG = "LOCAL_DB";
    private final SharedPreferences sharedPreferences;

    public StoreBooleanImp(Context context) {
        sharedPreferences = context.getSharedPreferences(SHARED_PREFERENCES_TAG, Context.MODE_PRIVATE);
    }

    @Override
    public void put(String key, boolean value) {
        final SharedPreferences.Editor edit = sharedPreferences.edit();
        edit.putBoolean(key, value);
        edit.apply();
    }

    @Override
    public boolean get(String key) {
        final boolean value = sharedPreferences.getBoolean(key,false);
        return value;
    }

    @Override
    public boolean get(String key, boolean defaultValue) {
        final boolean value = sharedPreferences.getBoolean(key,defaultValue);
        return value;
    }
}
