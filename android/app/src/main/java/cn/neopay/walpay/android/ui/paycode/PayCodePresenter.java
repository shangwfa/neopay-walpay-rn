package cn.neopay.walpay.android.ui.paycode;

import cn.neopay.walpay.android.http.BaseSubscriber;
import cn.neopay.walpay.android.manager.apimanager.ApiManager;
import cn.neopay.walpay.android.module.request.GetRecentPayTypeRequestBean;
import cn.neopay.walpay.android.module.response.RecentPayTypeResponseBean;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe
 */

public class PayCodePresenter extends PayCodeContract.Presenter {
    @Override
    public void getRecentPayType(GetRecentPayTypeRequestBean recentPayTypeRequestBean) {
        ApiManager.getSingleton().getRecentPayType(new GetRecentPayTypeRequestBean(), new BaseSubscriber(mActivity, o -> {
            mView.setBankNickName((RecentPayTypeResponseBean) o);
        }));

    }
}
