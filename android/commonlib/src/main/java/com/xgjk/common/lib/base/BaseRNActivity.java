package com.xgjk.common.lib.base;

import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.KeyEvent;

import com.alibaba.android.arouter.launcher.ARouter;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;

import org.greenrobot.eventbus.EventBus;

/**
 * Created by shangwf on 2017/10/9.
 */

public abstract class BaseRNActivity extends AppCompatActivity implements DefaultHardwareBackBtnHandler {


    public ReactRootView mReactRootView;
    public static ReactInstanceManager mReactInstanceManager;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        setStatusBar();
        ARouter.getInstance().inject(this);
        EventBus.getDefault().register(this);
        mReactRootView = new ReactRootView(this);
        mReactInstanceManager = initReactInstanceManager();
        // 注意这里的MyReactNativeApp必须对应“index.android.js”中的
        // “AppRegistry.registerComponent()”的第一个参数
        mReactRootView.startReactApplication(mReactInstanceManager, getModuleName(), getLaunchOptions());
        setContentView(mReactRootView);
    }

    public abstract ReactInstanceManager initReactInstanceManager();

    public abstract Bundle getLaunchOptions();

    public abstract String getModuleName();

    public abstract void setStatusBar();

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    @Override
    protected void onPause() {
        super.onPause();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostPause(this);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostResume(this, this);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostDestroy(this);
        }
    }

    @Override
    public void onBackPressed() {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onBackPressed();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
            mReactInstanceManager.showDevOptionsDialog();
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }
}
