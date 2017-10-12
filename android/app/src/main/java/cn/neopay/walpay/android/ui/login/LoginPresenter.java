package cn.neopay.walpay.android.ui.login;

import com.orhanobut.logger.Logger;
import com.xgjk.common.lib.manager.ActivityManager;
import com.xgjk.common.lib.manager.storage.StoreManager;

import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.http.BaseSubscriber;
import cn.neopay.walpay.android.manager.apimanager.ApiManager;
import cn.neopay.walpay.android.manager.routermanager.MainRouter;
import cn.neopay.walpay.android.module.request.LoginUserRequestBean;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe
 */

public class LoginPresenter extends LoginContract.Presenter {
    @Override
    public void login(String name, String pass) {
        ApiManager.getSingleton().loginUser(new LoginUserRequestBean(name, pass),
                new BaseSubscriber(mActivity, userInfoResponseBean -> {
                    handleLogin((UserInfoResponseBean) userInfoResponseBean);
                }));
        MainRouter.getSingleton().jumpToHomePage("");
    }

    private void handleLogin(UserInfoResponseBean userInfoResponseBean) {
        Logger.d("userInfoResponseBean------->"+userInfoResponseBean.toString());
        UserInfoResponseBean infoResponseBean = userInfoResponseBean;
        StoreManager.getSingleton().put(true, IWalpayConstants.USER_INFO, infoResponseBean);
        ActivityManager.getInstance().killAllActivity();
        MainRouter.getSingleton().jumpToHomePage("");
    }

    @Override
    public void register(String name) {
        MainRouter.getSingleton().jumpToRegisterPage(name);
    }

    @Override
    public void forgetPassword(String name) {
        MainRouter.getSingleton().jumpToForgotPwdPage(name, IWalpayConstants.FORGOTPWD_TYPE_LOGIN);
    }
}
