package cn.neopay.walpay.android.ui.fragment.homefragment;


import com.xgjk.common.lib.base.BasePresenter;
import com.xgjk.common.lib.base.BaseView;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe
 */

public interface HomeFragmentContract {
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
