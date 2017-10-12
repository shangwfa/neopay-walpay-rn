package cn.neopay.walpay.android.rn;

import android.app.Activity;
import android.view.ViewParent;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.shell.MainReactPackage;

import cn.neopay.walpay.android.BuildConfig;
import cn.neopay.walpay.android.WalpayApp;

import static com.tencent.bugly.beta.tinker.TinkerManager.getApplication;

/**
 * Created by shangwf on 2017/10/11.
 */

public class RNCacheViewManager {
    private static ReactInstanceManager mReactInstanceManager = null;


    public static void init() {
        if (mReactInstanceManager == null) {
            mReactInstanceManager = createReactInstanceManager();
        }
    }


    public static ReactInstanceManager getReactInstanceManager() {
        if (mReactInstanceManager == null) {
            throw new RuntimeException("缓存view管理器尚未初始化！");
        }
        return mReactInstanceManager;
    }


    public static void clear() {
        try {
            if (mReactInstanceManager != null) {
                mReactInstanceManager = null;
            }
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }

    private static ReactInstanceManager createReactInstanceManager() {

        return mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setBundleAssetName("index.android.bundle")
                .setJSMainModuleName("index.android")
                .addPackage(new MainReactPackage())
                .addPackage(WalpayApp.rnPackage)
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();
    }
}
