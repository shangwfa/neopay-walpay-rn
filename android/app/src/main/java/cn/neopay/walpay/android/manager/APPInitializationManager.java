package cn.neopay.walpay.android.manager;

import android.content.Context;

import com.alibaba.android.arouter.launcher.ARouter;
import com.tencent.bugly.crashreport.CrashReport;
import com.umeng.socialize.Config;
import com.umeng.socialize.PlatformConfig;
import com.umeng.socialize.UMShareAPI;
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

    public static UMShareAPI umShareAPI;

    public static void init(final Context context) {
        initARounter();
//        initBugly(context);
//        initPush(context);
        initToastUtils();
        initJPush(context);
        initShare(context);
    }

    private static void initShare(Context context) {
        Config.DEBUG = true;
        PlatformConfig.setWeixin("wx967daebe835fbeac", "5bb696d9ccd75a38c8a0bfe0675559b3");
        umShareAPI = UMShareAPI.get(context);
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
     * 关闭此功能原因：
     * 1、build Variants 自定义会影响其他库的接入（walle 打包工具）
     * 2、影响环境切换，每次启动都会执行其默认值
     * 3、若使用在build.gradle添加如下代码 用来设置多种环境状态
     * ...java
     * productFlavors {
     * walpayTest {}
     * walpayDevelop {}
     * walpayProduct {}
     * }
     * ...java
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