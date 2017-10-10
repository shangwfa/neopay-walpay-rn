package cn.neopay.walpay.android;

import android.annotation.TargetApi;
import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.support.multidex.MultiDex;

import com.tencent.bugly.Bugly;
import com.tencent.bugly.beta.Beta;
import com.tencent.bugly.beta.interfaces.BetaPatchListener;
import com.tencent.tinker.loader.app.DefaultApplicationLike;
import com.xgjk.common.lib.BuildConfig;

import cn.neopay.walpay.android.manager.environmentmanager.EnvironmentConfigManager;

/**
 * @author carlos.guo
 * @date 2017/9/21
 * @describe walpay hotfix
 */

public class WalpayApplicationLike extends DefaultApplicationLike {
    public static final String TAG = "Tinker.WalpayApplicationLike";

    public WalpayApplicationLike(Application application, int tinkerFlags, boolean tinkerLoadVerifyFlag, long applicationStartElapsedTime, long applicationStartMillisTime, Intent tinkerResultIntent) {
        super(application, tinkerFlags, tinkerLoadVerifyFlag, applicationStartElapsedTime, applicationStartMillisTime, tinkerResultIntent);
    }


    @Override
    public void onCreate() {
        super.onCreate();
        initBugly();
    }

    /**
     * 这里实现SDK初始化，appId替换成你的在Bugly平台申请的appId
     * 调试时，将第三个参数改为true
     */
    private void initBugly() {
        Bugly.init(getApplication(), EnvironmentConfigManager.getSingleton().getCurrentEnvBuglyId(), BuildConfig.DEBUG);
    }


    @TargetApi(Build.VERSION_CODES.ICE_CREAM_SANDWICH)
    @Override
    public void onBaseContextAttached(Context base) {
        super.onBaseContextAttached(base);
        // you must install multiDex whatever tinker is installed!
        MultiDex.install(base);
        // 安装tinker
        // TinkerManager.installTinker(this); 替换成下面Bugly提供的方法
        Beta.installTinker(this);
        betaSetting();
    }

    private void betaSetting() {
        //App重启（进程死掉），自动检测，合并补丁
        //设置是否允许自动下载补丁
        Beta.canAutoDownloadPatch = true;
        //设置是否允许自动合成补丁
        Beta.canAutoPatch = true;
        //置是否显示弹窗提示用户重启
        Beta.canNotifyUserRestart = true;

        //补丁回调接口
        Beta.betaPatchListener = new BetaPatchListener() {
            @Override
            public void onPatchReceived(String patchFile) {

            }

            @Override
            public void onDownloadReceived(long savedLength, long totalLength) {

            }

            @Override
            public void onDownloadSuccess(String msg) {

            }

            @Override
            public void onDownloadFailure(String msg) {

            }

            @Override
            public void onApplySuccess(String msg) {

            }

            @Override
            public void onApplyFailure(String msg) {

            }

            @Override
            public void onPatchRollback() {

            }
        };
    }

    @TargetApi(Build.VERSION_CODES.ICE_CREAM_SANDWICH)
    public void registerActivityLifecycleCallback(Application.ActivityLifecycleCallbacks callbacks) {
        getApplication().registerActivityLifecycleCallbacks(callbacks);
    }
}
