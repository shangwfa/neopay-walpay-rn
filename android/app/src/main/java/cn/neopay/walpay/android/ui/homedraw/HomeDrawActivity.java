package cn.neopay.walpay.android.ui.homedraw;

import android.os.Bundle;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.widget.DrawerLayout;
import android.view.View;

import com.alibaba.android.arouter.facade.annotation.Route;
import com.nineoldandroids.view.ViewHelper;
import com.xgjk.common.lib.base.BaseActivity;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.databinding.ActivityHomeDrawLayoutBinding;
import cn.neopay.walpay.android.ui.fragment.minefragment.MineFragment;
import cn.neopay.walpay.android.ui.fragment.newsfragment.NewsFragment;

/**
 * @author carlos.guo
 * @date 2017/11/17
 * @describe HomeDrawActivity 抽屉主页面
 */
@Route(path = IWalpayConstants.TO_HOME_DRAW_PAGE)
public class HomeDrawActivity extends BaseActivity<HomeDrawPresenter, ActivityHomeDrawLayoutBinding> implements HomeDrawContract.IView {

    private MineFragment mMineFragment;
    private NewsFragment mNewsFragment;

    @Override
    public int getLayoutId() {
        return R.layout.activity_home_draw_layout;
    }

    @Override
    public void initView() {
        mPageBinding.commonHeader.setVisibility(View.GONE);
        FragmentTransaction fragmentTransaction = getSupportFragmentManager().beginTransaction();
        if (null == mMineFragment) {
            mMineFragment = new MineFragment();
        }
        if (null == mNewsFragment) {
            mNewsFragment = new NewsFragment();
            Bundle bundle = new Bundle();
            bundle.putString("pageOrigin", "homeDrawer");
            mNewsFragment.setArguments(bundle);
        }
        fragmentTransaction.add(R.id.mine_fl, mMineFragment);
        fragmentTransaction.add(R.id.home_fl, mNewsFragment);
        fragmentTransaction.commit();
        mViewBinding.homeDrawerDl.addDrawerListener(mDrawerListener);
    }

    DrawerLayout.DrawerListener mDrawerListener = new DrawerLayout.DrawerListener() {

        @Override
        public void onDrawerSlide(View drawerView, float slideOffset) {
            View homeFl = mViewBinding.homeDrawerDl.getChildAt(0);
            float scale = 1 - slideOffset;
            //改变DrawLayout侧栏透明度，若不需要效果可以不设置
            ViewHelper.setAlpha(drawerView, 0.6f + 0.4f * (1 - scale));
            ViewHelper.setTranslationX(homeFl, drawerView.getMeasuredWidth() * (1 - scale));
            ViewHelper.setPivotX(homeFl, 0);
            ViewHelper.setPivotY(homeFl, homeFl.getMeasuredHeight() / 2);
            homeFl.invalidate();
        }

        @Override
        public void onDrawerOpened(View drawerView) {

        }

        @Override
        public void onDrawerClosed(View drawerView) {

        }

        @Override
        public void onDrawerStateChanged(int newState) {

        }
    };
}
