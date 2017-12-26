package cn.neopay.walpay.android.adapter.sliminjector;

import android.app.Activity;
import android.content.Context;
import android.widget.ImageView;

import com.xgjk.common.lib.adapter.slimadapter.SlimInjector;
import com.xgjk.common.lib.adapter.slimadapter.viewinjector.IViewInjector;
import com.xgjk.common.lib.manager.glide.GlideManager;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.http.BaseSubscriber;
import cn.neopay.walpay.android.manager.apimanager.ApiManager;
import cn.neopay.walpay.android.manager.routermanager.MainRouter;
import cn.neopay.walpay.android.module.request.UpdateNewsReadStatusRequestBean;
import cn.neopay.walpay.android.module.sliminjector.NewsActivitiesItemBean;
import cn.neopay.walpay.android.utils.DateHandle;

/**
 * @author carlos.guo
 * @date 2017/10/18
 * @describe
 */

public class NewsActivitiesSlimInjector implements SlimInjector<NewsActivitiesItemBean> {

    @Override
    public void onInject(NewsActivitiesItemBean data, IViewInjector injector) {
        if (null == data) {
            return;
        }
        injector.with(R.id.common_news_type_icon_iv, view -> GlideManager.loadNetImage((ImageView) view, data.getAvatar()))
                .text(R.id.common_news_type_time_tv, DateHandle.getMDHSTime(data.getTime()))
                .with(R.id.activities_icon_iv, view -> GlideManager.loadNetImage((ImageView) view, data.getContent()))
                .clicked(R.id.common_activity_container_fl, view -> {
                    MainRouter.getSingleton().jumpToCommonWebPage(data.getNoticeUrl());
                    updateNewsStatus(view.getContext(), data);
                });
    }

    private void updateNewsStatus(Context context, NewsActivitiesItemBean data) {
        UpdateNewsReadStatusRequestBean requestBean = new UpdateNewsReadStatusRequestBean();
        requestBean.setId(data.getId());
        requestBean.setMsgType(data.getMsgType());
        ApiManager.getSingleton().updateNewsReadStatus(requestBean,
                new BaseSubscriber((Activity) context, o -> {
                }, false));
    }
}
