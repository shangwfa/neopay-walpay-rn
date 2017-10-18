package cn.neopay.walpay.android.adapter.sliminjector;

import android.view.View;
import android.widget.ImageView;

import com.xgjk.common.lib.adapter.slimadapter.SlimInjector;
import com.xgjk.common.lib.adapter.slimadapter.viewinjector.IViewInjector;
import com.xgjk.common.lib.manager.glide.GlideManager;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.module.sliminjector.NewsActivitiesItemBean;

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
        injector.background(R.id.common_news_type_icon_iv, R.mipmap.img_red_packet)
                .text(R.id.common_news_type_name_tv, "商家活动")
                .visibility(R.id.common_red_dot_iv, data.isSelect() ? View.INVISIBLE : View.GONE)
                .text(R.id.common_news_type_time_tv, data.getTime())
                .with(R.id.activities_icon_iv, view -> GlideManager.loadNetImage((ImageView) view, data.getContent()));

    }
}
