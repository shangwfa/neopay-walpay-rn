package cn.neopay.walpay.android.ui.environment;

import com.xgjk.common.lib.base.BasePresenter;
import com.xgjk.common.lib.base.BaseView;

import java.util.List;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe
 */

public interface EnvironmentSettingContract {
    interface IView extends BaseView {
        void updateData(List<Object> mData);

        void finishActivity();
    }

    abstract class Presenter extends BasePresenter<IView> {
        public abstract void requestEnSettingBean(List<Object> mData);

        @Override
        public void onAttached() {

        }

        @Override
        public void onDetached() {

        }
    }
}
