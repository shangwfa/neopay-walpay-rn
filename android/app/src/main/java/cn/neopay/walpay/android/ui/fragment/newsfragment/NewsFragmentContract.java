package cn.neopay.walpay.android.ui.fragment.newsfragment;


import com.xgjk.common.lib.base.BasePresenter;
import com.xgjk.common.lib.base.BaseView;

import java.util.ArrayList;
import java.util.List;

import cn.neopay.walpay.android.module.request.UpdateNewsReadStatusRequestBean;
import cn.neopay.walpay.android.module.response.GetNewsResponseBean;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe
 */

public interface NewsFragmentContract {
    interface IView extends BaseView {
        void setNewsViewData(List<GetNewsResponseBean> newsBeanList);
    }

    abstract class Presenter extends BasePresenter<IView> {
        public abstract void getNewsInfo();

        public abstract void handleNewsData(List<GetNewsResponseBean> newsBeanList, ArrayList<Object> mDataList);

        public abstract void updateNewsStatus(UpdateNewsReadStatusRequestBean requestBean);

        @Override
        public void onAttached() {

        }

        @Override
        public void onDetached() {

        }
    }

}
