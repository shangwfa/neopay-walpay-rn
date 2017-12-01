package cn.neopay.walpay.android.rn;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import cn.neopay.walpay.android.rn.module.CommModule;

/**
 * Created by shangwf on 2017/9/14.
 */

public class RNPackage implements ReactPackage {

    public CommModule mModule;

    /**
     * 创建Native Module
     *
     * @param reactContext
     * @return
     */
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        mModule = new CommModule(reactContext);
        modules.add(mModule);
        return modules;
    }


    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

}
