package cn.neopay.walpay.android.ui.homedraw;

import com.xgjk.common.lib.manager.storage.StoreManager;

import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.http.BaseSubscriber;
import cn.neopay.walpay.android.manager.apimanager.ApiManager;
import cn.neopay.walpay.android.manager.jpushmanager.JPushUtil;
import cn.neopay.walpay.android.module.request.GetUserInfoRequestBean;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe
 */

public class HomeDrawCoordinatorPresenter extends HomeDrawCoordinatorContract.Presenter {

    @Override
    public void getUserInfo() {
        ApiManager.getSingleton().getUserInfo(new GetUserInfoRequestBean(), new BaseSubscriber(mActivity, o -> {
            mView.setViewData((UserInfoResponseBean) o);
            handleSetAlias((UserInfoResponseBean) o);
        }, false));
    }

    private void handleSetAlias(UserInfoResponseBean infoResponseBean) {
        String aliasStr = StoreManager.getSingleton().getString(false, IWalpayConstants.ALIAS_VALUE, "");
        if (null != infoResponseBean && !aliasStr.equals(infoResponseBean.getUuid())) {
            JPushUtil.setAlias(infoResponseBean.getUuid());
            StoreManager.getSingleton().putString(false, IWalpayConstants.ALIAS_VALUE, infoResponseBean.getUuid());
        }
    }
}
