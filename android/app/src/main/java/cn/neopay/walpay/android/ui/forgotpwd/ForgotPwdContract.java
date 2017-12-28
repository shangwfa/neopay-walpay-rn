package cn.neopay.walpay.android.ui.forgotpwd;

import com.xgjk.common.lib.base.BasePresenter;
import com.xgjk.common.lib.base.BaseView;

import cn.neopay.walpay.android.module.bean.ResetPwdParameterBean;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe
 */

public interface ForgotPwdContract {
    interface IView extends BaseView {
        void finishActivity();
        void setUserAuthState(boolean userAuthState);
    }

    abstract class Presenter extends BasePresenter<IView> {
        public abstract void resetPassword(ResetPwdParameterBean resetPwdParameterBean);
        public abstract void getUerInfo();

        @Override
        public void onAttached() {

        }

        @Override
        public void onDetached() {

        }
    }
}
