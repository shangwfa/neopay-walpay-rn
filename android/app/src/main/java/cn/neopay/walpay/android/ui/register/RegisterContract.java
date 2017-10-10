package cn.neopay.walpay.android.ui.register;

import com.xgjk.common.lib.base.BasePresenter;
import com.xgjk.common.lib.base.BaseView;

import cn.neopay.walpay.android.module.bean.RegisterParameterBean;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe
 */

public interface RegisterContract {
    interface IView extends BaseView {
        void finishActivity();
    }

    abstract class Presenter extends BasePresenter<IView> {
        public abstract void register(RegisterParameterBean parameterBean);

        @Override
        public void onAttached() {

        }

        @Override
        public void onDetached() {

        }
    }
}
