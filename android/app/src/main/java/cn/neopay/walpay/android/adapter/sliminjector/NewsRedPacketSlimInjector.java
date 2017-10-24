package cn.neopay.walpay.android.adapter.sliminjector;

import android.view.View;
import android.widget.ImageView;

import com.xgjk.common.lib.adapter.slimadapter.SlimInjector;
import com.xgjk.common.lib.adapter.slimadapter.viewinjector.IViewInjector;
import com.xgjk.common.lib.manager.glide.GlideManager;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.module.sliminjector.NewsRedPacketItemBean;

/**
 * @author carlos.guo
 * @date 2017/10/18
 * @describe
 */

public class NewsRedPacketSlimInjector implements SlimInjector<NewsRedPacketItemBean> {
    @Override
    public void onInject(NewsRedPacketItemBean data, IViewInjector injector) {
        if (null == data) {
            return;
        }
        injector.background(R.id.common_news_type_icon_iv, R.mipmap.img_red_packet)
                .text(R.id.common_news_type_name_tv, "红包来了!")
                .visibility(R.id.common_red_dot_iv, data.isSelect() ? View.INVISIBLE : View.GONE)
                .text(R.id.common_news_type_time_tv, data.getTime())
                .with(R.id.red_packet_bg_iv, view -> GlideManager.loadNetImage((ImageView) view, data.getContent()))
                .text(R.id.red_packet_title_tv, data.getContentTitle())
                .text(R.id.red_packet_from_tv, data.getContentFrom())
                .clicked(R.id.common_news_red_packet_ll, data.getOnClickListener());


    }
}
