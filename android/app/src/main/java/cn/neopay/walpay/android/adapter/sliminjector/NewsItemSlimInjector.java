package cn.neopay.walpay.android.adapter.sliminjector;

import android.view.View;
import android.widget.ImageView;

import com.xgjk.common.lib.adapter.slimadapter.SlimInjector;
import com.xgjk.common.lib.adapter.slimadapter.viewinjector.IViewInjector;
import com.xgjk.common.lib.manager.glide.GlideManager;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.module.sliminjector.NewsItemBean;

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
        injector.with(R.id.news_item_avatar_iv, view -> GlideManager.loadNetImage((ImageView) view, data.getAvatar()))
                .text(R.id.news_item_type_tv, data.getName())
                .text(R.id.news_item_time_tv, data.getTime())
                .text(R.id.news_item_result_tv, data.getContent())
                .visibility(R.id.news_item_red_dot_iv, data.isSelect() ? View.INVISIBLE : View.GONE);


    }
}
