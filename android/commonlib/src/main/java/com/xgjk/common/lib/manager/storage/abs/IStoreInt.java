package com.xgjk.common.lib.manager.storage.abs;

/**
 * Created by shangwf on 2017/4/29.
 */

public interface IStoreInt {
    void put(String key, int value);
    int get(String key);
    int get(String key, int defaultValue);
}
