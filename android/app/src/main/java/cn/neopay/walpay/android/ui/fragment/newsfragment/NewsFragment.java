package cn.neopay.walpay.android.ui.fragment.newsfragment;

import android.content.Context;
import android.databinding.DataBindingUtil;
import android.support.v7.widget.LinearLayoutManager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.bumptech.glide.Glide;
import com.orhanobut.logger.Logger;
import com.xgjk.common.lib.adapter.slimadapter.SlimAdapter;
import com.xgjk.common.lib.base.BaseFragment;
import com.xgjk.common.lib.utils.DensityUtils;
import com.xgjk.common.lib.view.xrecyclerview.ArrowRefreshHeader;
import com.xgjk.common.lib.view.xrecyclerview.XRecyclerView;

import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

import java.util.List;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.adapter.sliminjector.MineLineSlimInjector;
import cn.neopay.walpay.android.adapter.sliminjector.NewsActivitiesSlimInjector;
import cn.neopay.walpay.android.adapter.sliminjector.NewsItemSlimInjector;
import cn.neopay.walpay.android.adapter.sliminjector.NewsRedPacketSlimInjector;
import cn.neopay.walpay.android.databinding.FragmentNewsLayoutBinding;
import cn.neopay.walpay.android.databinding.HomeDrawMiddleViewBinding;
import cn.neopay.walpay.android.module.event.MineEventBean;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;
import cn.neopay.walpay.android.ui.RNActivity;
import cn.neopay.walpay.android.utils.BusniessUtils;
import cn.neopay.walpay.android.view.actionview.XRecyclerViewLoadMoreView;

/**
 * @author carlos.guo
 * @date 2017/9/27
 * @describe NewsFragment 消息页
 */

public class NewsFragment extends BaseFragment<NewsFragmentPresenter, FragmentNewsLayoutBinding> implements NewsFragmentContract.IView {

    private SlimAdapter mNewsAdapter;
    private UserInfoResponseBean mUserInfoBean;
    private Boolean isNoLoadMoreData = false;

    @Override
    public int getLayoutId() {
        return R.layout.fragment_news_layout;
    }

    @Override
    public void initView() {
        setHeaderView();
        LinearLayoutManager layoutManager = new LinearLayoutManager(getActivity());
        layoutManager.setOrientation(LinearLayoutManager.VERTICAL);
        mViewBinding.mineNewsXrv.setLayoutManager(layoutManager);
        mViewBinding.mineNewsXrv.setNestedScrollingEnabled(true);
        mNewsAdapter = SlimAdapter.create()
                .register(R.layout.common_news_red_packet_layout, new NewsRedPacketSlimInjector())
                .register(R.layout.common_news_activities_layout, new NewsActivitiesSlimInjector())
                .register(R.layout.common_news_item_layout, new NewsItemSlimInjector())
                .register(R.layout.common_line_item_layout, new MineLineSlimInjector());
        handleMiddleView();
        mViewBinding.mineNewsXrv.setAdapter(mNewsAdapter);
        handleRefreshHeader();
        mPresenter.getNewsInfo();
        mViewBinding.mineNewsXrv.setLoadingMoreEnabled(true);
        mViewBinding.mineNewsXrv.setLoadingListener(new XRecyclerView.LoadingListener() {
            @Override
            public void onRefresh() {
                mPresenter.getNewsInfo();
                mViewBinding.mineNewsXrv.refreshComplete();
            }

            @Override
            public void onLoadMore() {
                if (isNoLoadMoreData) {
                    XRecyclerViewLoadMoreView.loadNoMoreView();
                    return;
                }
                mPresenter.getNewsInfoLoadMore();
                mViewBinding.mineNewsXrv.loadMoreComplete();
            }
        });
    }

    private void handleRefreshHeader() {
        ArrowRefreshHeader refreshHeader = new ArrowRefreshHeader(getActivity());
        ImageView arrowImageView = refreshHeader.getArrowImageView();
        refreshHeader.setImgAnimation(false);
        int width = DensityUtils.dip2px(getActivity(), 50);
        int height = DensityUtils.dip2px(getActivity(), 50);
        Glide.with(getActivity()).load(R.mipmap.img_refresh).
                override(width, height).fitCenter().placeholder(R.mipmap.img_refresh).into(arrowImageView);
        mViewBinding.mineNewsXrv.setRefreshHeader(refreshHeader);
        XRecyclerViewLoadMoreView xRecyclerViewLoadMoreView = new XRecyclerViewLoadMoreView(getActivity());
        mViewBinding.mineNewsXrv.setFootView(xRecyclerViewLoadMoreView);
    }

    private void handleMiddleView() {
        final LayoutInflater inflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        HomeDrawMiddleViewBinding mBinding = DataBindingUtil.inflate(inflater, R.layout.home_draw_middle_view, null, false);
        LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        View middleView = mBinding.getRoot();
        middleView.setLayoutParams(layoutParams);
        mViewBinding.mineNewsXrv.addHeaderView(middleView);
        mBinding.homeDrawLoansLl.setOnClickListener(v -> {
            //todo 员工贷款
        });
        mBinding.homeDrawSeasonsLl.setOnClickListener(v -> {
            //todo 四季严选
        });
        mBinding.homeDrawBalanceLl.setOnClickListener(v ->
                BusniessUtils.handleCertification(getContext(), mUserInfoBean,
                        () -> RNActivity.jumpToRNPage(getContext(), RNActivity.PageType.BALANCE)));
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void handleNewsFragmentEvent(UserInfoResponseBean userInfoBean) {
        if (null != userInfoBean) {
            mUserInfoBean = userInfoBean;
        }
    }

    private void setHeaderView() {
        mPageBinding.commonHeader.setVisibility(View.GONE);
    }

    @Override
    public boolean isShowExceptionView() {
        return true;
    }

    @Override
    public void setNewsViewData(List<Object> mDataList) {
        if (null == mDataList) {
            return;
        }
        mNewsAdapter.updateData(mDataList);
        mNewsAdapter.notifyDataSetChanged();
    }

    @Override
    public void setNoMoreData(Boolean isNoMoreData) {
        isNoLoadMoreData = isNoMoreData;
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void selectCurrentPageCallBack(MineEventBean mineEventBean) {
        Logger.d(mineEventBean.toString());
        mPresenter.getNewsInfo();
    }
}
