package com.xgjk.common.lib.manager.storage.imp;

import android.content.Context;

import com.xgjk.common.lib.manager.storage.abs.IObjectSerializeAndDeserialize;
import com.xgjk.common.lib.manager.storage.abs.IStoreObject;
import com.xgjk.common.lib.manager.storage.abs.IStoreString;

/**
 * Created by shangwf on 2017/4/29.
 */

public class StoreObjectImp implements IStoreObject {

    private final IStoreString storeService;
    private final IObjectSerializeAndDeserialize objectSerializeAndDeserialize;

    public StoreObjectImp(Context context) {
        storeService = new StoreStringImp(context);
        objectSerializeAndDeserialize = new ObjectSerializeAndDeserializeImp();
    }

    @Override
    public void put(String key, Object obj) {
        storeService.putString(key, objectSerializeAndDeserialize.serialize(obj));
    }

    @Override
    public <T> T get(String key, Class<T> clazz) {
        return objectSerializeAndDeserialize.deserialize(storeService.getString(key), clazz);
    }
}
