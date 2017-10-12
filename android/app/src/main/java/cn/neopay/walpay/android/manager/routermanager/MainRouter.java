package cn.neopay.walpay.android.manager.routermanager;

import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.provider.Settings;

import com.alibaba.android.arouter.launcher.ARouter;

import cn.neopay.walpay.android.BuildConfig;
import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.module.activityParams.RNActivityParams;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe activity router 页面跳转管理器
 * TODO 思考： 1、单例模式与static关键字的使用场景
 */

public class MainRouter {

    private static MainRouter singleton;

    private MainRouter() {
    }

    public static MainRouter getSingleton() {
        if (singleton == null) {
            synchronized (MainRouter.class) {
                if (singleton == null) {
                    singleton = new MainRouter();
                }
            }
        }
        return singleton;
    }

    public void jumpToLoginPage(String userName) {
        ARouter.getInstance().build(IWalpayConstants.TO_LOGIN_PAGE)
                .withString("userName", userName)
                .navigation();
    }

    public void jumpToSplashPage() {
        ARouter.getInstance().build(IWalpayConstants.TO_SPLASH_PAGE)
                .navigation();
    }

    public void jumpToHomePage(String tabType) {
        ARouter.getInstance().build(IWalpayConstants.TO_HOME_PAGE)
                .withString("tabType", tabType)
                .navigation();
    }

    public void jumpToRegisterPage(String userName) {
        ARouter.getInstance().build(IWalpayConstants.TO_REGISTER_PAGE)
                .withString("userName", userName)
                .navigation();
    }

    public void jumpToForgotPwdPage(String userName, String forgotPwdType) {
        ARouter.getInstance().build(IWalpayConstants.TO_FORGOTPWD_PAGE)
                .withString("userName", userName)
                .withString("forgotPwdType", forgotPwdType)
                .navigation();
    }

    public void jumpToRNPage(Context context, RNActivityParams activityParams) {

        if (Build.VERSION.SDK_INT >= 23 && BuildConfig.DEBUG) {
            if (!Settings.canDrawOverlays(context)) {
                Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION);
                context.startActivity(intent);
                return;
            }
        }

        ARouter.getInstance().build(IWalpayConstants.TO_RN_PAGE)
                .withParcelable("activityParams", activityParams)
                .navigation();
    }

    public void jumpToSignInWebPage() {
        ARouter.getInstance().build(IWalpayConstants.TO_SIGNINWEB_PAGE)
                .navigation();
    }

    public void jumpToScanPage() {
        ARouter.getInstance().build(IWalpayConstants.TO_SCAN_PAGE)
                .navigation();
    }

    public void jumpToExplainPage(String titleType) {
        ARouter.getInstance().build(IWalpayConstants.TO_EXPLAIN_PAGE)
                .withString("titleType", titleType)
                .navigation();
    }

    public void jumpToPayCodePage() {
        ARouter.getInstance().build(IWalpayConstants.TO_PAYCODE_PAGE)
                .navigation();
    }


}
