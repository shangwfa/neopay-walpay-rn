package cn.neopay.walpay.android.ui.fragment.minefragment;

import cn.neopay.walpay.android.http.BaseSubscriber;
import cn.neopay.walpay.android.manager.apimanager.ApiManager;
import cn.neopay.walpay.android.module.request.GetUserInfoRequestBean;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe
 */

public class MineFragmentPresenter extends MineFragmentContract.Presenter {
    @Override
    public void getUserInfoData() {
        ApiManager.getSingleton().getUserInfo(new GetUserInfoRequestBean(),
                new BaseSubscriber(mActivity, o -> {
                    UserInfoResponseBean infoResponseBean = (UserInfoResponseBean) o;
                    mView.setUserInfoData(infoResponseBean);
                }));
    }
}
