package cn.neopay.walpay.android.ui.forgotpwd;


import com.xgjk.common.lib.utils.ToastUtils;

import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.http.BaseSubscriber;
import cn.neopay.walpay.android.manager.apimanager.ApiManager;
import cn.neopay.walpay.android.manager.routermanager.MainRouter;
import cn.neopay.walpay.android.module.bean.ResetPwdParameterBean;
import cn.neopay.walpay.android.module.request.GetUserInfoRequestBean;
import cn.neopay.walpay.android.module.request.ResetLoginPasswordRequestBean;
import cn.neopay.walpay.android.module.request.ResetPayPasswordRequestBean;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;
import cn.neopay.walpay.android.utils.InputCheckUtils;
import rx.Observable;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe
 */

public class ForgotPwdPresenter extends ForgotPwdContract.Presenter {

    private boolean mIsAuthStatus;

    @Override
    public void resetPassword(ResetPwdParameterBean bean) {
        Observable.just("")
                .filter(a -> InputCheckUtils.checkPhone(bean.getPhone()))
                .filter(b -> InputCheckUtils.checkVerificationCode(bean.getVerificationCode()))
                .filter(c -> checkRealMag(bean.getForgotPwdType(), bean.getRealMsg()))
                .filter(c -> checkPwdOrPayPwd(bean.getForgotPwdType(), bean.getNewPassword()))
                .subscribe(s -> resetPwdOperate(bean.getForgotPwdType(), bean.getPhone(), bean.getVerificationCode(), bean.getNewPassword(), bean.getRealMsg()));

    }

    @Override
    public void getUerInfo() {
        ApiManager.getSingleton().getUserInfo(new GetUserInfoRequestBean(), new BaseSubscriber(mActivity, o -> {
            UserInfoResponseBean responseBean = (UserInfoResponseBean) o;
            mIsAuthStatus = 2 == responseBean.getAuthStatus();
            mView.setUserAuthState(mIsAuthStatus);
        }));
    }

    private Boolean checkRealMag(String forgotPwdType, String realMsg) {
        if (IWalpayConstants.FORGOTPWD_TYPE_PAY.equals(forgotPwdType) && mIsAuthStatus) {
            return InputCheckUtils.checkIdCardNumber(realMsg);
        }
        return true;
    }

    private void resetPwdOperate(String resetType, String phone, String smsCode, String newPassword, String realMsg) {
        switch (resetType) {
            case IWalpayConstants.FORGOTPWD_TYPE_LOGIN:
                ResetLoginPasswordRequestBean requestBean = new ResetLoginPasswordRequestBean();
                requestBean.setPhone(phone);
                requestBean.setSmsCode(smsCode);
                requestBean.setPassword(newPassword);
                ApiManager.getSingleton().resetLoginPassword(requestBean, new BaseSubscriber(mActivity, o -> {
                    ToastUtils.show("登录密码重置成功");
                    MainRouter.getSingleton().jumpToLoginPage(phone);
                    mView.finishActivity();
                }));
                break;
            case IWalpayConstants.FORGOTPWD_TYPE_PAY:
                ResetPayPasswordRequestBean payPasswordRequestBean = new ResetPayPasswordRequestBean();
                payPasswordRequestBean.setPhone(phone);
                payPasswordRequestBean.setPayPassword(newPassword);
                payPasswordRequestBean.setSmsCode(smsCode);
                payPasswordRequestBean.setCertNo(realMsg);
                ApiManager.getSingleton().resetPayPassword(payPasswordRequestBean, new BaseSubscriber(mActivity, o -> {
                    ToastUtils.show("支付密码重置成功");
                    mView.finishActivity();
                }));
                break;
        }
    }


    private boolean checkPwdOrPayPwd(String resetType, String password) {
        switch (resetType) {
            case IWalpayConstants.FORGOTPWD_TYPE_LOGIN:
                return InputCheckUtils.checkLoginPassword(password);
            case IWalpayConstants.FORGOTPWD_TYPE_PAY:
                return InputCheckUtils.checkNewPayPassword(password);
            default:
                return false;
        }
    }

}
