package cn.neopay.walpay.android.ui.fragment.minefragment;

import com.xgjk.common.lib.manager.storage.StoreManager;

import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe
 */

public class MineFragmentPresenter extends MineFragmentContract.Presenter {
    @Override
    public void getUserInfoData() {
        UserInfoResponseBean infoResponseBean = StoreManager.getSingleton().get(true, IWalpayConstants.USER_INFO, UserInfoResponseBean.class);
        mView.setUserInfoData(infoResponseBean);
    }
}
