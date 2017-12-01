package com.xgjk.common.lib.base;

import android.annotation.SuppressLint;
import android.app.Application;

import com.tencent.tinker.loader.app.TinkerApplication;
import com.tencent.tinker.loader.shareutil.ShareConstants;

/**
 * Created by shangwf on 2017/4/29.
 */

public abstract class BaseApp extends TinkerApplication {
    @SuppressLint("StaticFieldLeak")
    public static Application application;
    public static BaseActivityLifeCallback mActivityLifeCallback;

    public BaseApp(String applicationLikeClassPath) {
        super(ShareConstants.TINKER_ENABLE_ALL, applicationLikeClassPath, "com.tencent.tinker.loader.TinkerLoader", false);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        registerActivityLifecycle();
    }

    private void registerActivityLifecycle() {
        mActivityLifeCallback = new BaseActivityLifeCallback();
        registerActivityLifecycleCallbacks(mActivityLifeCallback);
    }

}
