package com.xgjk.common.lib.manager.storage.imp;

import com.google.gson.Gson;
import com.xgjk.common.lib.manager.storage.abs.IObjectSerializeAndDeserialize;

/**
 * Created by shangwf on 2017/4/29.
 */

public class ObjectSerializeAndDeserializeImp implements IObjectSerializeAndDeserialize {
    @Override
    public String serialize(Object obj) {
        return new Gson().toJson(obj);
    }

    @Override
    public <T> T deserialize(String string, Class<T> clazz) {
        return new Gson().fromJson(string,clazz);
    }
}
