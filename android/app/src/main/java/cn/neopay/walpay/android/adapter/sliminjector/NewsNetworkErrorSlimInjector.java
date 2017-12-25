package cn.neopay.walpay.android.adapter.sliminjector;

import com.xgjk.common.lib.adapter.slimadapter.SlimInjector;
import com.xgjk.common.lib.adapter.slimadapter.viewinjector.IViewInjector;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.module.sliminjector.NewsNetworkErrorBean;

/**
 * @author carlos.guo
 * @date 2017/12/25
 * @describe
 */

public class NewsNetworkErrorSlimInjector implements SlimInjector<NewsNetworkErrorBean> {
    @Override
    public void onInject(NewsNetworkErrorBean data, IViewInjector injector) {
        if (null == data) {
            return;
        }
        injector.clicked(R.id.no_network_container_fl, view -> data.getOnClickListener());
    }
}
