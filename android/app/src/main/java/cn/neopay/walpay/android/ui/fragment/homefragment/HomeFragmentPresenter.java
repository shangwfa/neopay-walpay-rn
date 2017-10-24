package cn.neopay.walpay.android.ui.fragment.homefragment;

import cn.neopay.walpay.android.http.BaseSubscriber;
import cn.neopay.walpay.android.manager.apimanager.ApiManager;
import cn.neopay.walpay.android.module.request.GetUserInfoRequestBean;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe
 */

public class HomeFragmentPresenter extends HomeFragmentContract.Presenter {
    @Override
    public void getUserInfo() {
        ApiManager.getSingleton().getUserInfo(new GetUserInfoRequestBean(), new BaseSubscriber(mActivity, o -> {
            mView.isFirstCertificationShow((UserInfoResponseBean) o);
        },false));
    }
}
