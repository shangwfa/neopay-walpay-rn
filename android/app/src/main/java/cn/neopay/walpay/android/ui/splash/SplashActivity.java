package cn.neopay.walpay.android.ui.splash;

import android.view.View;

import com.alibaba.android.arouter.facade.annotation.Route;
import com.xgjk.common.lib.base.BaseActivity;
import com.xgjk.common.lib.manager.storage.StoreManager;
import com.xgjk.common.lib.utils.DensityUtils;
import com.xgjk.common.lib.utils.HandlerUtils;
import com.xgjk.common.lib.view.rollViewPager.hintview.IconHintView;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.adapter.adapter.SpalshAdapter;
import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.databinding.ActivitySplashLayoutBinding;


/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe SplashActivity 轮播页
 */
@Route(path = IWalpayConstants.TO_SPLASH_PAGE)
public class SplashActivity extends BaseActivity<SplashPresenter, ActivitySplashLayoutBinding> implements SplashContract.IView {

    @Override
    public int getLayoutId() {
        return R.layout.activity_splash_layout;
    }

    @Override
    public int getExceptionLayoutId() {
        return 0;
    }

    @Override
    public void initView() {
        hideHeaderView();
        initAdapter();
    }

    private void initAdapter() {
        mViewBinding.splashContainer.setAdapter(new SpalshAdapter());
        final IconHintView hintView = new IconHintView(this, R.drawable.splash_dot_focus, R.drawable.splash_dot, DensityUtils.dip2px(this, 16));
        mViewBinding.splashContainer.setHintView(hintView);
        HandlerUtils.runOnUiThread(() -> hintView.setmDotsMargin(DensityUtils.dip2px(this, 10), 0, DensityUtils.dip2px(this, 10), 0));
        mViewBinding.splashContainer.setHintPadding(DensityUtils.dip2px(this, 10), 0, 0, DensityUtils.dip2px(this, 20));

        StoreManager.getSingleton().putBoolean(false, IWalpayConstants.IS_FIRST_INSTALL, false);

    }

    private void hideHeaderView() {
        mPageBinding.commonHeader.setVisibility(View.GONE);
    }

    @Override
    public boolean isShowExceptionView() {
        return false;
    }
}
