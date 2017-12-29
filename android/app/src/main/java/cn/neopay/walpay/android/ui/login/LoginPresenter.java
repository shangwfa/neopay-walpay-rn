package cn.neopay.walpay.android.ui.login;

import com.xgjk.common.lib.manager.ActivityManager;
import com.xgjk.common.lib.manager.storage.StoreManager;
import com.xgjk.common.lib.utils.StringUtils;
import com.xgjk.common.lib.utils.ToastUtils;

import cn.jpush.android.api.JPushInterface;
import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.http.BaseSubscriber;
import cn.neopay.walpay.android.manager.apimanager.ApiManager;
import cn.neopay.walpay.android.manager.routermanager.MainRouter;
import cn.neopay.walpay.android.module.request.LoginUserRequestBean;
import cn.neopay.walpay.android.module.request.UpdateJPushMsgRequestBean;
import cn.neopay.walpay.android.module.request.VerifyRegisterPhoneRequestBean;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;
import cn.neopay.walpay.android.module.response.VerifyRegisterPhoneResponseBean;

import static com.xgjk.common.lib.utils.StringUtils.getString;

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
    }

    private void handleLogin(UserInfoResponseBean userInfoResponseBean) {
        StoreManager.getSingleton().putString(false, IWalpayConstants.ACCESS_TOKEN, userInfoResponseBean.getAccessToken());
        ActivityManager.getInstance().killAllActivity();
        MainRouter.getSingleton().jumpToHomeDrawPage();
        handleJPushID();
    }

    private void handleJPushID() {
        String registrationID = JPushInterface.getRegistrationID(mActivity);
        if (StringUtils.isNoEmpty(registrationID)) {
            UpdateJPushMsgRequestBean updateJPushMsgRequestBean = new UpdateJPushMsgRequestBean();
            updateJPushMsgRequestBean.setRegistrationId(registrationID);
            ApiManager.getSingleton().updateJPushMsg(updateJPushMsgRequestBean, new BaseSubscriber(mActivity, o -> {
            }));
        }

    }

    @Override
    public void register(String name) {
        MainRouter.getSingleton().jumpToRegisterPage(name);
    }

    @Override
    public void verifyRegisterPhone(String phone) {
        VerifyRegisterPhoneRequestBean requestBean = new VerifyRegisterPhoneRequestBean();
        requestBean.setPhone(phone);
        ApiManager.getSingleton().verifyRegisterPhone(requestBean, new BaseSubscriber(mActivity, o -> {
            handleRegisterPhone((VerifyRegisterPhoneResponseBean) o);
        }, false));
    }

    private void handleRegisterPhone(VerifyRegisterPhoneResponseBean o) {
        VerifyRegisterPhoneResponseBean responseBean = o;
        if (!responseBean.getRegistered()) {
            ToastUtils.show(getString(R.string.str_go_register));
        }
    }

    @Override
    public void forgetPassword(String name) {
        MainRouter.getSingleton().jumpToForgotPwdPage(name, IWalpayConstants.FORGOTPWD_TYPE_NO_LOGIN);
    }
}
