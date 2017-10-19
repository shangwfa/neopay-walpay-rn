package cn.neopay.walpay.android.ui.paycode;

import com.xgjk.common.lib.base.BasePresenter;
import com.xgjk.common.lib.base.BaseView;

import cn.neopay.walpay.android.module.response.RecentPayTypeResponseBean;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe
 */

public interface PayCodeContract {
    interface IView extends BaseView {
        void setBankNickName(RecentPayTypeResponseBean payTypeBean);

        void setUserInfo(UserInfoResponseBean userInfoBean);
    }

    abstract class Presenter extends BasePresenter<IView> {
        public abstract void getRecentPayType();

        public abstract void getUserInfo();

        @Override
        public void onAttached() {

        }

        @Override
        public void onDetached() {

        }
    }
}
