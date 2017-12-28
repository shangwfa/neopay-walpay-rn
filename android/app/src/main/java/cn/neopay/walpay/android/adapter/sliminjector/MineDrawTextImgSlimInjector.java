package cn.neopay.walpay.android.adapter.sliminjector;

import android.view.View;

import com.xgjk.common.lib.adapter.slimadapter.SlimInjector;
import com.xgjk.common.lib.adapter.slimadapter.viewinjector.IViewInjector;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.manager.routermanager.MainRouter;
import cn.neopay.walpay.android.module.activityParams.RNActivityParams;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;
import cn.neopay.walpay.android.module.sliminjector.MineTextImgItemBean;
import cn.neopay.walpay.android.ui.RNActivity;
import cn.neopay.walpay.android.utils.BusniessUtils;

/**
 * @author carlos.guo
 * @date 2017/9/29
 * @describe MineDrawTextImgSlimInjector 我的 抽屉 line item
 */

public class MineDrawTextImgSlimInjector implements SlimInjector<MineTextImgItemBean> {

    @Override
    public void onInject(MineTextImgItemBean data, IViewInjector injector) {
        if (null == data) {
            return;
        }
        injector.background(R.id.img_draw_item_iv, data.getItemImgId())
                .text(R.id.text_draw_item_tv, data.getItemName())
                .clicked(R.id.text_img_draw_item_ll, v -> {
                    RNActivityParams activityParams = new RNActivityParams();
                    switch (data.getTypeClick()) {
                        case "settings":
                            activityParams.setPage(RNActivity.PageType.SETTING_PAGE);
                            MainRouter.getSingleton().jumpToRNPage(v.getContext(), activityParams);
                            break;
                        case "myOder":
                            activityParams.setPage(RNActivity.PageType.MY_ORDER_PAGE);
                            MainRouter.getSingleton().jumpToRNPage(v.getContext(), activityParams);
                            break;
                        case "myAsset":
                            handleAuth(data, v, activityParams, RNActivity.PageType.MY_ASSET);
                            break;
                        case "myBank":
                            handleAuth(data, v, activityParams, RNActivity.PageType.MY_BANK);
                            break;
                        case "about":
                            RNActivity.jumpToRNPage(v.getContext(), RNActivity.PageType.ABOUT_US);
                            break;
                    }
                });
    }

    private void handleAuth(MineTextImgItemBean data, View v, RNActivityParams activityParams, String jumpType) {
        UserInfoResponseBean infoResponseBean = new UserInfoResponseBean();
        infoResponseBean.setAuthStatus(data.getAuthStatus());
        BusniessUtils.handleCertification(v.getContext(), infoResponseBean, () -> {
            activityParams.setPage(jumpType);
            MainRouter.getSingleton().jumpToRNPage(v.getContext(), activityParams);
        });
    }
}
