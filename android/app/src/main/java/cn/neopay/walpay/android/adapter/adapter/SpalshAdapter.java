package cn.neopay.walpay.android.adapter.adapter;

import android.app.Activity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.xgjk.common.lib.listener.OnClickEvent;
import com.xgjk.common.lib.view.rollViewPager.adapter.StaticPagerAdapter;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.manager.routermanager.MainRouter;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe SpalshAdapter  轮播图适配器
 */

public class SpalshAdapter extends StaticPagerAdapter {
    private final int[] drawableIds;

    public SpalshAdapter() {
        drawableIds = new int[]{R.drawable.splash_step_one, R.drawable.splash_step_two, R.drawable.splash_step_three};
    }

    @Override
    public View getView(ViewGroup container, int position) {
        final int drawableId = drawableIds[position];
        ImageView view = new ImageView(container.getContext());
        Glide.with(container.getContext())
                .load(drawableId)
                .diskCacheStrategy(DiskCacheStrategy.ALL)
                .dontAnimate()
                .into(view);
        view.setScaleType(ImageView.ScaleType.FIT_XY);
        view.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        if (drawableIds.length - 1 == position) {
            view.setOnClickListener(new OnClickEvent() {
                @Override
                public void singleClick(View v) {
                    MainRouter.getSingleton().jumpToLoginPage("");
                    ((Activity) view.getContext()).finish();
                }
            });
        }
        return view;
    }

    @Override
    public int getCount() {
        return drawableIds.length;
    }
}