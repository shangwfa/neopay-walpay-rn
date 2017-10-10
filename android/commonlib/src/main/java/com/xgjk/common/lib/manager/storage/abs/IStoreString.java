package com.xgjk.common.lib.manager.storage.abs;

/**
 * Created by shangwf on 2017/4/29.
 */

public interface IStoreString {
    void putString(String key, String value);
    String getString(String key);
    String getString(String key,String defaultValue);
}
