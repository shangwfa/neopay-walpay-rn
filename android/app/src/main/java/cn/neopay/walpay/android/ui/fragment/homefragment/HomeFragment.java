package cn.neopay.walpay.android.ui.fragment.homefragment;

import android.view.View;

import com.xgjk.common.lib.base.BaseFragment;
import com.xgjk.common.lib.manager.storage.StoreManager;

import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.databinding.FragmentHomeLayoutBinding;
import cn.neopay.walpay.android.module.event.HomeEventBean;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;
import cn.neopay.walpay.android.utils.BusniessUtils;

/**
 * @author carlos.guo
 * @date 2017/9/27
 * @describe HomeFragment 首页
 */

public class HomeFragment extends BaseFragment<HomeFragmentPresenter, FragmentHomeLayoutBinding> implements HomeFragmentContract.IView {
    @Override
    public int getLayoutId() {
        return R.layout.fragment_home_layout;
    }

    @Override
    public void initView() {
        mPageBinding.commonHeader.setVisibility(View.GONE);
        mPresenter.getUserInfo();
    }

    @Override
    public void isFirstCertificationShow(UserInfoResponseBean userInfoBean) {
        boolean isFirstCertification = StoreManager.getSingleton().getBoolean(false, IWalpayConstants.IS_FIRST_CERTIFICATION, true);
        if (isFirstCertification && null != userInfoBean) {
            BusniessUtils.handleCertification(getActivity(), userInfoBean, () -> {
            });
        }
        StoreManager.getSingleton().putBoolean(false, IWalpayConstants.IS_FIRST_CERTIFICATION, false);

        StoreManager.getSingleton().put(true, IWalpayConstants.USER_INFO, userInfoBean);
        if (null != userInfoBean) {
            mViewBinding.commonHomeMiddleView.setmUserInfoBean(userInfoBean);
            mViewBinding.commonHomeTopView.setmUserInfoBean(userInfoBean);
        }
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void selectCurrentPageCallBack(HomeEventBean homeEventBean) {
        initView();
    }
}
