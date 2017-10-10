package com.xgjk.common.lib.manager.storage.abs;

/**
 * Created by shangwf on 2017/4/29.
 */

public interface IStoreManager {

    void put(boolean userRelated, String key, Object obj);
    <T> T get(boolean userRelated, String key, Class<T> clazz);


    void putString(boolean userRelated, String key, String value);
    String getString(boolean userRelated, String key);
    String getString(boolean userRelated, String key,String defaultValue);


    void putBoolean(boolean userRelated, String key, boolean value);
    boolean getBoolean(boolean userRelated, String key);
    boolean getBoolean(boolean userRelated, String key, boolean defaultValue);

    void putInt(boolean userRelated, String key, int value);
    int getInt(boolean userRelated, String key);
    int getInt(boolean userRelated, String key, int defaultValue);
}
