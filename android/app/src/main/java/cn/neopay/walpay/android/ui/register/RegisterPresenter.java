package cn.neopay.walpay.android.ui.register;

import com.xgjk.common.lib.manager.ActivityManager;
import com.xgjk.common.lib.utils.ToastUtils;

import cn.neopay.walpay.android.http.BaseSubscriber;
import cn.neopay.walpay.android.manager.apimanager.ApiManager;
import cn.neopay.walpay.android.manager.routermanager.MainRouter;
import cn.neopay.walpay.android.module.bean.RegisterParameterBean;
import cn.neopay.walpay.android.module.request.RegisterUserRequestBean;
import cn.neopay.walpay.android.utils.InputCheckUtils;
import rx.Observable;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe
 */

public class RegisterPresenter extends RegisterContract.Presenter {
    @Override
    public void register(RegisterParameterBean parameterBean) {
        //TODO 检查类型支付密码
        Observable.just("")
                .filter(a -> InputCheckUtils.checkPhone(parameterBean.getName()))
                .filter(b -> InputCheckUtils.checkVerificationCode(parameterBean.getVerification()))
                .filter(c -> InputCheckUtils.checkLoginPassword(parameterBean.getLoginPassword()))
                .filter(e -> InputCheckUtils.checkPayPassword(parameterBean.getPayPwd()))
                .filter(f -> {
                    if (!parameterBean.isProtocolSelected()) {
                        ToastUtils.show("未勾选协议");
                    }
                    return parameterBean.isProtocolSelected();
                })
                .subscribe(s -> loginOperate(parameterBean.getName(), parameterBean.getVerification(), parameterBean.getLoginPassword(), parameterBean.getPayPwd()));
    }

    private void loginOperate(String phone, String SmsCode, String Password, String payPwd) {
        RegisterUserRequestBean userRequestBean = new RegisterUserRequestBean();
        userRequestBean.setPhone(phone);
        userRequestBean.setPassword(Password);
        userRequestBean.setPayPassword(payPwd);
        userRequestBean.setSmsCode(SmsCode);
        ApiManager.getSingleton().registerUser(userRequestBean, new BaseSubscriber(mActivity, o -> {
            ActivityManager.getInstance().killAllActivity();
            MainRouter.getSingleton().jumpToHomePage("");
            ToastUtils.show("注册成功");
        }));

    }
}
