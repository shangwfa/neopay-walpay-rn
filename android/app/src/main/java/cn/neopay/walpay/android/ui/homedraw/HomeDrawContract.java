package cn.neopay.walpay.android.ui.homedraw;

import com.xgjk.common.lib.base.BasePresenter;
import com.xgjk.common.lib.base.BaseView;

import cn.neopay.walpay.android.module.response.UserInfoResponseBean;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe
 */

public interface HomeDrawContract {
    interface IView extends BaseView {
        void setViewData(UserInfoResponseBean userInfoBean);
    }

    abstract class Presenter extends BasePresenter<IView> {
        public abstract void getUserInfo();
        @Override
        public void onAttached() {

        }

        @Override
        public void onDetached() {

        }
    }
}
