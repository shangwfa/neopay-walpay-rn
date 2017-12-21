package cn.neopay.walpay.android.ui.homedraw;

import android.support.design.widget.AppBarLayout;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.widget.DrawerLayout;
import android.view.Gravity;
import android.view.View;

import com.alibaba.android.arouter.facade.annotation.Route;
import com.gyf.barlibrary.ImmersionBar;
import com.nineoldandroids.view.ViewHelper;
import com.xgjk.common.lib.base.BaseActivity;
import com.xgjk.common.lib.manager.storage.StoreManager;
import com.xgjk.common.lib.utils.ScreenUtils;

import org.greenrobot.eventbus.EventBus;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.databinding.ActivityHomeDrawCoordinatorLayoutBinding;
import cn.neopay.walpay.android.module.event.MineEventBean;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;
import cn.neopay.walpay.android.ui.RNActivity;
import cn.neopay.walpay.android.ui.fragment.minefragment.MineDrawFragment;
import cn.neopay.walpay.android.ui.fragment.newsfragment.NewsFragment;
import cn.neopay.walpay.android.utils.BusniessUtils;

/**
 * @author carlos.guo
 * @date 2017/11/17
 * @describe HomeDrawCoordinatorActivity 抽屉主页面
 */
@Route(path = IWalpayConstants.TO_HOME_DRAW_COORDINATOR_PAGE)
public class HomeDrawCoordinatorActivity extends BaseActivity<HomeDrawCoordinatorPresenter, ActivityHomeDrawCoordinatorLayoutBinding> implements HomeDrawCoordinatorContract.IView, AppBarLayout.OnOffsetChangedListener {

    private MineDrawFragment mMineFragment;
    private NewsFragment mNewsFragment;
    private UserInfoResponseBean mUserInfoBean;

    @Override
    public int getLayoutId() {
        return R.layout.activity_home_draw_coordinator_layout;
    }

    @Override
    protected void handleStatusBar() {
        ImmersionBar.with(this)
                .fullScreen(true)
                .init();
    }


    @Override
    public void initView() {
        handleView();
        handleBottomKeyLayout();
    }

    private void handleView() {
        mPageBinding.commonHeader.setVisibility(View.GONE);
        mPresenter.getUserInfo();
        FragmentTransaction fragmentTransaction = getSupportFragmentManager().beginTransaction();
        if (null == mMineFragment) {
            mMineFragment = new MineDrawFragment();
        }
        if (null == mNewsFragment) {
            mNewsFragment = new NewsFragment();
        }
        fragmentTransaction.add(R.id.mine_fl, mMineFragment);
        fragmentTransaction.add(R.id.home_fl, mNewsFragment);
        fragmentTransaction.commit();
        mViewBinding.homeDrawerDl.addDrawerListener(mDrawerListener);

        mViewBinding.commonHomeDrawTopView.setHomeDrawAvatarClick(view -> {
            if (!mViewBinding.homeDrawerDl.isDrawerOpen(Gravity.START)) {
                mViewBinding.homeDrawerDl.openDrawer(Gravity.START);
            }
        });
        mViewBinding.homeDrawCoordinatorAbl.addOnOffsetChangedListener(this);
        mViewBinding.homeDrawCoordinatorTop.homeDrawBigRedPacketTopLl.setOnClickListener(v ->
                BusniessUtils.handleCertification(this, mUserInfoBean,
                        () -> RNActivity.jumpToRNPage(this, RNActivity.PageType.BIG_RED_PACKET_SIMPLE_PAGE)));
        mViewBinding.homeDrawCoordinatorTop.homeDrawRechargeTopLl.setOnClickListener(v ->
                BusniessUtils.handleCertification(this, mUserInfoBean,
                        () -> RNActivity.jumpToRNPage(this, RNActivity.PageType.PHONE_TOPUP_PAGE)));

    }

    @Override
    protected void onResume() {
        mPresenter.getUserInfo();
        EventBus.getDefault().post(new MineEventBean());
        super.onResume();
    }

    private void handleBottomKeyLayout() {
        if (ScreenUtils.hasSoftKeys(this)) {
            DrawerLayout.LayoutParams params = (DrawerLayout.LayoutParams) mViewBinding.homeDrawCoordinatorCl.getLayoutParams();
            params.setMargins(0, 0, 0, ScreenUtils.getBottomSoftKeysHeight(this));
            mViewBinding.homeDrawCoordinatorCl.setLayoutParams(params);
        }
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
            EventBus.getDefault().post(new MineEventBean());
        }

        @Override
        public void onDrawerClosed(View drawerView) {
            mPresenter.getUserInfo();
        }

        @Override
        public void onDrawerStateChanged(int newState) {

        }
    };

    @Override
    public void setViewData(UserInfoResponseBean userInfoBean) {
        mUserInfoBean = userInfoBean;
        StoreManager.getSingleton().put(true, IWalpayConstants.USER_INFO, userInfoBean);
        if (null != userInfoBean) {
            mViewBinding.commonHomeDrawTopView.setmUserInfoBean(userInfoBean);
            EventBus.getDefault().post(userInfoBean);
        }
    }

    @Override
    public void onOffsetChanged(AppBarLayout appBarLayout, int verticalOffset) {
        int totalScrollRange = appBarLayout.getTotalScrollRange();
        int offset = Math.abs(verticalOffset);
        if (offset >= 3 * totalScrollRange / 4) {
            mViewBinding.commonHomeDrawTopView.getHomeDrawSimpleAvatarContainerLl().setVisibility(View.VISIBLE);
            mViewBinding.commonHomeDrawTopView.getHomeDrawAvatarContainerLl().setVisibility(View.GONE);
        } else {
            mViewBinding.commonHomeDrawTopView.getHomeDrawSimpleAvatarContainerLl().setVisibility(View.GONE);
            mViewBinding.commonHomeDrawTopView.getHomeDrawAvatarContainerLl().setVisibility(View.VISIBLE);
        }
    }
}
