package cn.neopay.walpay.android.ui.home;

import com.xgjk.common.lib.base.BasePresenter;
import com.xgjk.common.lib.base.BaseView;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe
 */

public interface HomeContract {
    interface IView extends BaseView {

    }

    abstract class Presenter extends BasePresenter<IView> {
        abstract void saveBaseInfo();

        abstract void updateApp();

        @Override
        public void onAttached() {

        }

        @Override
        public void onDetached() {

        }
    }
}
