package cn.neopay.walpay.android.commontest;

import com.xgjk.common.lib.base.BasePresenter;
import com.xgjk.common.lib.base.BaseView;

/**
 * @author carlos.guo
 * @date 2017/9/22
 * @describe
 */

public interface CommonTestContract {
    interface IView extends BaseView {

    }

    class Presenter extends BasePresenter<IView> {

        @Override
        public void onAttached() {

        }

        @Override
        public void onDetached() {

        }
    }
}
