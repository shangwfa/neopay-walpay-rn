package cn.neopay.walpay.android.adapter.sliminjector;

import android.widget.ImageView;
import android.widget.TextView;

import com.xgjk.common.lib.adapter.slimadapter.SlimInjector;
import com.xgjk.common.lib.adapter.slimadapter.viewinjector.IViewInjector;
import com.xgjk.common.lib.manager.glide.GlideManager;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.module.sliminjector.CommonTextImgItemBean;

/**
 * @author carlos.guo
 * @date 2017/9/29
 * @describe MineLineSlimInjector 我的 line item
 */

public class MineTextImgSlimInjector implements SlimInjector<CommonTextImgItemBean> {

    @Override
    public void onInject(CommonTextImgItemBean data, IViewInjector injector) {
        if (null == data) {
            return;
        }
        injector.with(R.id.img_item_iv, view -> GlideManager.loadLocalResCircleImage((ImageView) view, Integer.parseInt(data.getLeftImgId())))
                .with(R.id.text_item_tv, view -> ((TextView) view).setText(data.getLeftImgDescript()))
                .with(R.id.right_arrow_item_iv, view -> GlideManager.loadLocalResCircleImage((ImageView) view, Integer.parseInt(data.getRightImgId())));
        //TODO　点击事情
    }
}
