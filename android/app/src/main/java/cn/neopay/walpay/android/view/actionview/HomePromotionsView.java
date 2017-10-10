package cn.neopay.walpay.android.view.actionview;

import android.app.Activity;
import android.content.Context;
import android.databinding.DataBindingUtil;
import android.support.annotation.AttrRes;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.widget.FrameLayout;

import com.xgjk.common.lib.utils.DensityUtils;
import com.xgjk.common.lib.utils.HandlerUtils;
import com.xgjk.common.lib.view.rollViewPager.hintview.IconHintView;

import java.util.ArrayList;
import java.util.List;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.adapter.home.HomeBannerAdapter;
import cn.neopay.walpay.android.databinding.HomePromotionsViewBinding;
import cn.neopay.walpay.android.http.BaseSubscriber;
import cn.neopay.walpay.android.manager.apimanager.ApiManager;
import cn.neopay.walpay.android.module.request.QueryBannerListRequestBean;
import cn.neopay.walpay.android.module.response.BannerResponseBean;

/**
 * @author carlos.guo
 * @date 2017/10/9
 * @describe HomePromotionsView home页的下部分view
 */

public class HomePromotionsView extends FrameLayout {

    private HomePromotionsViewBinding mBinding;
    private HomeBannerAdapter mHomeBannerAdapter;

    public HomePromotionsView(@NonNull Context context) {
        super(context);
        initView(context);
    }

    public HomePromotionsView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        initView(context);
    }

    public HomePromotionsView(@NonNull Context context, @Nullable AttributeSet attrs, @AttrRes int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        initView(context);
    }

    private void initView(Context context) {
        final LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        mBinding = DataBindingUtil.inflate(inflater, R.layout.home_promotions_view, null, false);
        addView(mBinding.getRoot());
        initBannerView(context);

    }

    private void initBannerView(Context context) {
        mHomeBannerAdapter = new HomeBannerAdapter(mBinding.homeMetingBannersRpv);
        mBinding.homeMetingBannersRpv.setAdapter(mHomeBannerAdapter);
        final IconHintView hintView = new IconHintView(context, R.mipmap.img_banner_select, R.mipmap.img_banner_unselect, DensityUtils.dip2px(context, 16));
        mBinding.homeMetingBannersRpv.setHintView(hintView);
        HandlerUtils.runOnUiThread(() -> hintView.setmDotsMargin(DensityUtils.dip2px(context, 10), 0, DensityUtils.dip2px(context, 10), 0));
        mBinding.homeMetingBannersRpv.setHintPadding(DensityUtils.dip2px(context, 10), 0, 0, DensityUtils.dip2px(context, 20));
        requestBannerUrls(context);
    }

    private void requestBannerUrls(Context context) {
        QueryBannerListRequestBean requestBean = new QueryBannerListRequestBean();
        ApiManager.getSingleton().queryBannerList(requestBean, new BaseSubscriber((Activity) context, o -> {
            List<BannerResponseBean> bannerList = (List<BannerResponseBean>) o;
            setBannerData(bannerList);
        }));
    }

    private void setBannerData(List<BannerResponseBean> bannerList) {

        List<String> urls = new ArrayList<>();
            urls.add("http://img2.imgtn.bdimg.com/it/u=3259946169,3752632959&fm=27&gp=0.jpg");
            urls.add("http://img4.imgtn.bdimg.com/it/u=227953490,3054069314&fm=27&gp=0.jpg");
            urls.add("http://img1.imgtn.bdimg.com/it/u=391390601,3860916026&fm=11&gp=0.jpg");
//        if (null == bannerList) {
//            return;
//        }
//        List<String> urls = new ArrayList<>();
//        for (int i = 0; i < bannerList.size(); i++) {
//            urls.add(bannerList.get(i).getImageUrl());
//        }
        mHomeBannerAdapter.setBannerUrls(urls);
    }
}
