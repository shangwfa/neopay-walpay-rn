package cn.neopay.walpay.android.ui.home;

import android.content.Intent;
import android.support.design.widget.TabLayout;
import android.view.View;

import com.alibaba.android.arouter.facade.annotation.Autowired;
import com.alibaba.android.arouter.facade.annotation.Route;
import com.tencent.bugly.beta.Beta;
import com.xgjk.common.lib.base.BaseActivity;
import com.xgjk.common.lib.base.BaseFragment;

import java.util.ArrayList;
import java.util.List;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.adapter.adapter.MainPagerAdapter;
import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.databinding.ActivityHomeLayoutBinding;
import cn.neopay.walpay.android.rn.RNCacheViewManager;
import cn.neopay.walpay.android.ui.fragment.homefragment.HomeFragment;
import cn.neopay.walpay.android.ui.fragment.minefragment.MineFragment;
import cn.neopay.walpay.android.ui.fragment.newsfragment.NewsFragment;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe HomeActivity 主页面
 */
@Route(path = IWalpayConstants.TO_HOME_PAGE)
public class HomeActivity extends BaseActivity<HomePresenter, ActivityHomeLayoutBinding> implements HomeContract.IView {

    @Autowired
    public String tabType;

    @Override
    public int getLayoutId() {
        return R.layout.activity_home_layout;
    }

    @Override
    public int getExceptionLayoutId() {
        return 0;
    }

    @Override
    public void initView() {
        hideHeaderView();
        mPageBinding.commonHeader.setVisibility(View.GONE);
        tabType = getIntent().getStringExtra("tabType");
        setupViewPager();
        setDoubleBackExit(true);
        mPresenter.saveBaseInfo();
        mPresenter.updateApp();
        Beta.downloadPatch();
        RNCacheViewManager.init();
    }

    @Override
    public boolean isShowExceptionView() {
        return false;
    }

    private void hideHeaderView() {
        mPageBinding.commonHeader.setVisibility(View.GONE);
    }

    private void setupViewPager() {
        final MainPagerAdapter mAdapter = new MainPagerAdapter(getSupportFragmentManager(), getFragments());
        mViewBinding.homeViewpager.setAdapter(mAdapter);
        mViewBinding.homeViewpager.setCurrentItem(0);
        mViewBinding.homeViewpager.setNoScroll(true);
        mViewBinding.homeViewpager.setOffscreenPageLimit(4);
        mViewBinding.homeTabs.setupWithViewPager(mViewBinding.homeViewpager);
        mViewBinding.homeTabs.setTabMode(TabLayout.MODE_FIXED);
        mViewBinding.homeTabs.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
//                if(0==tab.getPosition()){
//                    EventBus.getDefault().post(new UpdateHomeFragmentEvent());
//                }
//                if(1==tab.getPosition()){
//                    EventBus.getDefault().post(new UpdateFlowListEvent());
//                }
//                if(2==tab.getPosition()){
//                    EventBus.getDefault().post(new UpdateMineFragmentEvent());
//                }
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {

            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {

            }
        });
        for (int i = 0; i < mViewBinding.homeTabs.getTabCount(); i++) {
            TabLayout.Tab tab = mViewBinding.homeTabs.getTabAt(i);
            tab.setCustomView(mAdapter.getTabView(this, i));
        }
        setTab(tabType);
    }

    /**
     * 卡片布局
     *
     * @return
     */
    private List<BaseFragment> getFragments() {
        List<BaseFragment> fragments = new ArrayList<>();
        fragments.add(new HomeFragment());
//        fragments.add(new SunbeamCoinFragment());
        fragments.add(new NewsFragment());
        fragments.add(new MineFragment());
        return fragments;
    }


    private void setTab(String tabType) {
        switch (tabType) {
            case IWalpayConstants.HOME_TABTYPE_MINE:
                mViewBinding.homeViewpager.setCurrentItem(3);
                break;
            case IWalpayConstants.HOME_TABTYPE_NEWS:
                mViewBinding.homeViewpager.setCurrentItem(2);
                break;
//            case IWalpayConstants.HOME_TABTYPE_SUNBEAMCOIN:
//                mViewBinding.homeViewpager.setCurrentItem(1);
//                break;
            default:
                mViewBinding.homeViewpager.setCurrentItem(0);
                break;
        }
    }


    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setTab(intent.getStringExtra("tabType"));
    }

}
