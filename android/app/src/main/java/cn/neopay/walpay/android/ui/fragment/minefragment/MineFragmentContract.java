package cn.neopay.walpay.android.ui.fragment.minefragment;


import com.xgjk.common.lib.base.BasePresenter;
import com.xgjk.common.lib.base.BaseView;

import cn.neopay.walpay.android.module.response.UserInfoResponseBean;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe
 */

public interface MineFragmentContract {
    interface IView extends BaseView {
        void setUserInfoData(UserInfoResponseBean userInfoResponseBean);
    }

    abstract class Presenter extends BasePresenter<IView> {

        abstract void getUserInfoData();

        @Override
        public void onAttached() {

        }

        @Override
        public void onDetached() {

        }
    }

}
