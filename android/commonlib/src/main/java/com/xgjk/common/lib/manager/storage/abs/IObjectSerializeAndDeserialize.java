package com.xgjk.common.lib.manager.storage.abs;

/**
 * Created by shangwf on 2017/4/29.
 * 功能:对象序列化,反序列化
 */

public interface IObjectSerializeAndDeserialize {
    String serialize(final Object obj);
    <T> T deserialize(String string, Class<T> clazz);
}
