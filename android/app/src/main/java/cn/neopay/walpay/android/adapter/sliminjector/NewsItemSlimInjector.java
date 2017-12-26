package cn.neopay.walpay.android.adapter.sliminjector;

import android.app.Activity;
import android.content.Context;
import android.view.View;
import android.widget.ImageView;

import com.xgjk.common.lib.adapter.slimadapter.SlimInjector;
import com.xgjk.common.lib.adapter.slimadapter.viewinjector.IViewInjector;
import com.xgjk.common.lib.manager.glide.GlideManager;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.http.BaseSubscriber;
import cn.neopay.walpay.android.manager.apimanager.ApiManager;
import cn.neopay.walpay.android.manager.routermanager.MainRouter;
import cn.neopay.walpay.android.module.request.UpdateNewsReadStatusRequestBean;
import cn.neopay.walpay.android.module.sliminjector.NewsItemBean;
import cn.neopay.walpay.android.ui.RNActivity;
import cn.neopay.walpay.android.utils.DateHandle;

/**
 * @author carlos.guo
 * @date 2017/10/18
 * @describe
 */

public class NewsItemSlimInjector implements SlimInjector<NewsItemBean> {

    @Override
    public void onInject(NewsItemBean data, IViewInjector injector) {
        if (null == data) {
            return;
        }
        injector.with(R.id.news_item_avatar_iv, view -> GlideManager.loadNetCircleImage((ImageView) view, data.getAvatar()))
                .text(R.id.news_item_type_tv, data.getName())
                .text(R.id.news_item_time_tv, DateHandle.getMDHSTime(data.getTime()))
                .text(R.id.news_item_result_tv, data.getContent())
                .visibility(R.id.news_item_red_dot_iv, data.getIsSelectState() != 1 ? View.VISIBLE : View.GONE)
                .clicked(R.id.news_item_container_ll, view -> {
                    switch (data.getTypeClick()) {
                        case "payNews"://支付消息--集合
                            RNActivity.jumpToRNPage(view.getContext(), RNActivity.PageType.PAY_MESSAGE_PAGE);
                            break;
                        case "phoneNews"://手机充值消息--集合
                            RNActivity.jumpToRNPage(view.getContext(), RNActivity.PageType.TOPUP_MSG_LIST_PAGE);
                            break;
                        case "otherNews":////系统消息、商家广播
                            MainRouter.getSingleton().jumpToCommonWebPage(data.getNoticeUrl());
                            break;
                    }
                    updateNewsStatus(view.getContext(), data);
                });


    }

    private void updateNewsStatus(Context context, NewsItemBean data) {
        UpdateNewsReadStatusRequestBean requestBean = new UpdateNewsReadStatusRequestBean();
        requestBean.setId(data.getId());
        requestBean.setMsgType(data.getMsgType());
        ApiManager.getSingleton().updateNewsReadStatus(requestBean,
                new BaseSubscriber((Activity) context, o -> {
                }, false));
    }
}
