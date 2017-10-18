package cn.neopay.walpay.android.adapter.sliminjector;

import com.xgjk.common.lib.adapter.slimadapter.SlimInjector;
import com.xgjk.common.lib.adapter.slimadapter.viewinjector.IViewInjector;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.module.sliminjector.MineTextImgItemBean;

/**
 * @author carlos.guo
 * @date 2017/9/29
 * @describe MineLineSlimInjector 我的 line item
 */

public class MineTextImgSlimInjector implements SlimInjector<MineTextImgItemBean> {

    @Override
    public void onInject(MineTextImgItemBean data, IViewInjector injector) {
        if (null == data) {
            return;
        }
        injector.background(R.id.img_item_shape_iv, data.getItemImgId())
                .text(R.id.text_item_shape_tv, data.getItemName())
                .clicked(R.id.text_img_item_shape_container_ll, data.getOnClickListener());
    }
}
