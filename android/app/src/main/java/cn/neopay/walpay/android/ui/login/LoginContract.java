package cn.neopay.walpay.android.ui.login;

import com.xgjk.common.lib.base.BasePresenter;
import com.xgjk.common.lib.base.BaseView;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe
 */

public interface LoginContract {
    interface IView extends BaseView {
        void finishActivity();
    }

    abstract class Presenter extends BasePresenter<IView> {
        public abstract void login(String name, String pass);

        public abstract void forgetPassword(String name);

        public abstract void register(String name);

        public abstract void verifyRegisterPhone(String phone);

        @Override
        public void onAttached() {

        }

        @Override
        public void onDetached() {

        }
    }
}
