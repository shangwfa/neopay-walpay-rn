package com.xgjk.common.lib.manager.storage;

import android.content.Context;

import com.xgjk.common.lib.base.BaseApp;
import com.xgjk.common.lib.manager.storage.abs.IStoreBoolean;
import com.xgjk.common.lib.manager.storage.abs.IStoreInt;
import com.xgjk.common.lib.manager.storage.abs.IStoreManager;
import com.xgjk.common.lib.manager.storage.abs.IStoreObject;
import com.xgjk.common.lib.manager.storage.abs.IStoreString;
import com.xgjk.common.lib.manager.storage.abs.IUserRelated;
import com.xgjk.common.lib.manager.storage.imp.StoreBooleanImp;
import com.xgjk.common.lib.manager.storage.imp.StoreIntImp;
import com.xgjk.common.lib.manager.storage.imp.StoreObjectImp;
import com.xgjk.common.lib.manager.storage.imp.StoreStringImp;

/**
 * Created by shangwf on 2017/4/29.
 */

public class StoreManager implements IStoreManager {
    private final IStoreObject storeObject;
    private final IStoreString storeString;
    private final IStoreBoolean storeBoolean;
    private final IStoreInt storeInt;

    private StoreManager(Context context) {
        storeInt = new StoreIntImp(context);
        storeObject = new StoreObjectImp(context);
        storeString = new StoreStringImp(context);
        storeBoolean = new StoreBooleanImp(context);
    }

    @Override
    public void put(boolean useUserRelated, String key, Object obj) {
        storeObject.put(combineKey(useUserRelated, key), obj);
    }

    @Override
    public <T> T get(boolean useUserRelated, String key, Class<T> clazz) {
        return storeObject.get(combineKey(useUserRelated, key), clazz);
    }

    @Override
    public void putString(boolean useUserRelated, String key, String value) {
        storeString.putString(combineKey(useUserRelated, key), value);
    }

    @Override
    public String getString(boolean useUserRelated, String key) {
        return storeString.getString(combineKey(useUserRelated, key));
    }

    @Override
    public String getString(boolean userRelated, String key, String defaultValue) {
        return storeString.getString(combineKey(userRelated, key), defaultValue);
    }

    @Override
    public boolean getBoolean(boolean useUserRelated, String key, boolean defaultValue) {
        return storeBoolean.get(combineKey(useUserRelated, key), defaultValue);
    }

    @Override
    public void putInt(boolean userRelated, String key, int value) {
        storeInt.put(combineKey(userRelated, key), value);
    }

    @Override
    public int getInt(boolean userRelated, String key) {
        return storeInt.get(combineKey(userRelated, key));
    }

    @Override
    public int getInt(boolean userRelated, String key, int defaultValue) {
        return storeInt.get(key, defaultValue);
    }

    @Override
    public void putBoolean(boolean useUserRelated, String key, boolean value) {
        storeBoolean.put(key, value);
    }

    @Override
    public boolean getBoolean(boolean useUserRelated, String key) {
        return storeBoolean.get(combineKey(useUserRelated, key));
    }

    private IUserRelated mUserRelated;

    //跟用户有关时，需要设置
    public void setIUserRelated(IUserRelated mUserRelated) {
        this.mUserRelated = mUserRelated;
    }

    private String combineKey(boolean useUserRelated, String key) {
        if (useUserRelated) {
            return null != mUserRelated ? mUserRelated.getFrontKey(useUserRelated) + key : "common:";
        } else {
            return key;
        }
    }

    private static StoreManager singleton;

    public static StoreManager getSingleton() {
        if (singleton == null) {
            synchronized (StoreManager.class) {
                if (singleton == null) {
                    singleton = new StoreManager(BaseApp.application);
                }
            }
        }
        return singleton;
    }
}
