package com.xgjk.common.lib.manager.storage.abs;

/**
 * Created by shangwf on 2017/4/29.
 */

public interface IStoreBoolean {
    void put(String key, boolean value);
    boolean get(String key);
    boolean get(String key, boolean defaultValue);
}
