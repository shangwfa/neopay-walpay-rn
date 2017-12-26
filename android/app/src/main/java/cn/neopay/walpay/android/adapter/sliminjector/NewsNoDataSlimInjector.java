package cn.neopay.walpay.android.adapter.sliminjector;

import com.xgjk.common.lib.adapter.slimadapter.SlimInjector;
import com.xgjk.common.lib.adapter.slimadapter.viewinjector.IViewInjector;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.module.sliminjector.NewsNoDataBean;

/**
 * @author carlos.guo
 * @date 2017/12/25
 * @describe
 */

public class NewsNoDataSlimInjector implements SlimInjector<NewsNoDataBean> {
    @Override
    public void onInject(NewsNoDataBean data, IViewInjector injector) {
        if (null == data) {
            return;
        }
        injector.with(R.id.no_data_container_fl, view -> view.setOnClickListener(data.getOnClickListener()));
    }
}
