package com.xgjk.common.lib.manager.storage.imp;

import android.content.Context;
import android.content.SharedPreferences;

import com.xgjk.common.lib.manager.storage.abs.IStoreString;

/**
 * Created by shangwf on 2017/4/29.
 */

public class StoreStringImp implements IStoreString {

    private final static String SHARED_PREFERENCES_TAG = "LOCAL_DB";
    private final SharedPreferences sharedPreferences;

    public StoreStringImp(Context context) {
        sharedPreferences = context.getSharedPreferences(SHARED_PREFERENCES_TAG, Context.MODE_PRIVATE);
    }

    @Override
    public synchronized void putString(String key, String value) {
        final SharedPreferences.Editor edit = sharedPreferences.edit();
        edit.putString(key, value);
        edit.apply();
    }

    @Override
    public synchronized String getString(String key) {
        final String value = sharedPreferences.getString(key, null);
        return value;
    }

    @Override
    public String getString(String key, String defaultValue) {
        final String value = sharedPreferences.getString(key, defaultValue);
        return value;
    }
}
