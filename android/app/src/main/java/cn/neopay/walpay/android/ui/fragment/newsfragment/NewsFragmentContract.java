package cn.neopay.walpay.android.ui.fragment.newsfragment;


import com.xgjk.common.lib.base.BasePresenter;
import com.xgjk.common.lib.base.BaseView;

import java.util.List;

import cn.neopay.walpay.android.module.response.GetNewsResponseBean;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe
 */

public interface NewsFragmentContract {
    interface IView extends BaseView {
        void setNewsViewData(List<Object> mDataList);

        UserInfoResponseBean getUserInfo();

        void setNoMoreData(Boolean isNoMoreData);
    }

    abstract class Presenter extends BasePresenter<IView> {
        public abstract void getNewsInfo();

        public abstract void getNewsInfoLoadMore();

        public abstract void handleNewsData(List<GetNewsResponseBean> newsBeanList, boolean isRefresh);

        @Override
        public void onAttached() {

        }

        @Override
        public void onDetached() {

        }
    }

}
