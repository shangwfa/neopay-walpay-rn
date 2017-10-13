package cn.neopay.walpay.android.ui.fragment.homefragment;

import com.xgjk.common.lib.base.BaseFragment;
import com.xgjk.common.lib.manager.storage.StoreManager;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.databinding.FragmentHomeLayoutBinding;
import cn.neopay.walpay.android.http.BaseSubscriber;
import cn.neopay.walpay.android.manager.apimanager.ApiManager;
import cn.neopay.walpay.android.module.request.GetUserInfoRequestBean;
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
        saveUserInfo();
        isFirstCertificationShow();
    }

    private void saveUserInfo() {
        ApiManager.getSingleton().getUserInfo(new GetUserInfoRequestBean(),
                new BaseSubscriber(getActivity(), o ->
                        StoreManager.getSingleton().put(false, IWalpayConstants.USER_INFO_AUTH, (UserInfoResponseBean) o))
        );
    }

    private void isFirstCertificationShow() {
        boolean isFirstCertification = StoreManager.getSingleton().getBoolean(false, IWalpayConstants.IS_FIRST_CERTIFICATION, true);
        if (isFirstCertification) {
            BusniessUtils.handleCertification(getActivity(), () -> {
            });
        }
        StoreManager.getSingleton().putBoolean(false, IWalpayConstants.IS_FIRST_CERTIFICATION, false);
    }
}
