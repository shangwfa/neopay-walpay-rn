package com.xgjk.common.lib.manager.storage.abs;

/**
 * Created by shangwf on 2017/4/29.
 */

public interface IStoreObject {
    void put(String key, Object obj);
    <T> T get(String key, Class<T> clazz);
}
