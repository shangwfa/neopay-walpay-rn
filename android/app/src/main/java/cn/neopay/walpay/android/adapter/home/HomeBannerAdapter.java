package cn.neopay.walpay.android.adapter.home;

import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import com.xgjk.common.lib.manager.glide.GlideManager;
import com.xgjk.common.lib.view.rollViewPager.RollPagerView;
import com.xgjk.common.lib.view.rollViewPager.adapter.LoopPagerAdapter;

import java.util.List;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe HomeBannerAdapter  首页轮播图适配器
 */

public class HomeBannerAdapter extends LoopPagerAdapter {

    private List<String> mUrls;

    public HomeBannerAdapter(RollPagerView viewPager) {
        super(viewPager);
        notifyDataSetChanged();
    }


    @Override
    public View getView(ViewGroup container, int position) {
        ImageView view = new ImageView(container.getContext());
        GlideManager.loadNetImage(view, mUrls.get(position));
        view.setScaleType(ImageView.ScaleType.CENTER_CROP);
        view.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        return view;
    }


    public void setBannerUrls(List<String> urls) {
        this.mUrls = urls;
        notifyDataSetChanged();
    }

    @Override
    protected int getRealCount() {
        return null == mUrls ? 0 : mUrls.size();
    }
}