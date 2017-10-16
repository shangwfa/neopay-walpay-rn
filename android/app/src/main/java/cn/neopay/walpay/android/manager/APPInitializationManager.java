package cn.neopay.walpay.android.manager;

import android.content.Context;

import com.alibaba.android.arouter.launcher.ARouter;
import com.tencent.bugly.crashreport.CrashReport;
import com.xgjk.common.lib.base.BaseApp;
import com.xgjk.common.lib.manager.PushManager;
import com.xgjk.common.lib.utils.ToastUtils;

import cn.jpush.android.api.JPushInterface;
import cn.neopay.walpay.android.BuildConfig;
import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.manager.environmentmanager.EnvironmentConfigManager;
import cn.neopay.walpay.android.manager.environmentmanager.IEnvironmentConfigManager;

/**
 * @author carlos.guo
 * @date 2017/9/21
 * @describe Three parties SDK initialization
 */

public class APPInitializationManager {

    public static void init(final Context context) {
        initARounter();
//        initBugly(context);
//        initPush(context);
        initHttpEnv();
        initToastUtils();
        initJPush(context);
    }

    private static void initJPush(Context context) {
        if (BuildConfig.DEBUG) {
            JPushInterface.setDebugMode(true);
        }
        JPushInterface.init(context);
    }

    private static void initToastUtils() {
        ToastUtils.setmToastViewId(R.layout.toast);
    }

    /**
     * set http env by  build Variant
     */
    private static void initHttpEnv() {
        switch (BuildConfig.FLAVOR) {
            case IWalpayConstants.FLAVOR_TEST:
                EnvironmentConfigManager.getSingleton().setCurrentEnvironment(IEnvironmentConfigManager.ApplicationEnvironment.TEST);
                break;
            case IWalpayConstants.FLAVOR_DEVELOP:
                EnvironmentConfigManager.getSingleton().setCurrentEnvironment(IEnvironmentConfigManager.ApplicationEnvironment.DEVELOP);
                break;
            case IWalpayConstants.FLAVOR_PRODUCT:
                EnvironmentConfigManager.getSingleton().setCurrentEnvironment(IEnvironmentConfigManager.ApplicationEnvironment.PRODUCT);
                break;
        }
    }

    private static void initPush(Context context) {
        PushManager.init(context);
    }

    private static void initBugly(Context context) {
        /**
         * 第三个参数为SDK调试模式开关，调试模式的行为特性如下：
         *      .输出详细的Bugly SDK的Log
         *      .每一条Crash都会被立即上报
         *      .自定义日志将会在Logcat中输出
         *
         * 建议在测试阶段建议设置成true，发布时设置为false
         */

        CrashReport.initCrashReport(context, EnvironmentConfigManager.getSingleton().getCurrentEnvBuglyId(), BuildConfig.DEBUG);

    }

    private static void initARounter() {
        if (BuildConfig.DEBUG) {
            ARouter.openLog();     // 打印日志
            ARouter.openDebug();   // 开启调试模式(如果在InstantRun模式下运行，必须开启调试模式！线上版本需要关闭,否则有安全风险)
        }
        ARouter.init(BaseApp.application);
    }

    public static void onCreate(final Context context) {

    }

    public static void onResume(final Context context) {

    }

    public static void onPause(final Context context) {

    }

}