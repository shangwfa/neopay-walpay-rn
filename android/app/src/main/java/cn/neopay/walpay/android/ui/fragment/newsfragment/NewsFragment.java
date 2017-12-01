package cn.neopay.walpay.android.ui.fragment.newsfragment;

import android.content.Context;
import android.databinding.DataBindingUtil;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import com.xgjk.common.lib.adapter.slimadapter.SlimAdapter;
import com.xgjk.common.lib.base.BaseFragment;
import com.xgjk.common.lib.utils.DensityUtils;
import com.xgjk.common.lib.view.xrecyclerview.XRecyclerView;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

import java.util.ArrayList;
import java.util.List;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.adapter.sliminjector.MineLineSlimInjector;
import cn.neopay.walpay.android.adapter.sliminjector.NewsActivitiesSlimInjector;
import cn.neopay.walpay.android.adapter.sliminjector.NewsItemSlimInjector;
import cn.neopay.walpay.android.adapter.sliminjector.NewsRedPacketSlimInjector;
import cn.neopay.walpay.android.databinding.FragmentNewsLayoutBinding;
import cn.neopay.walpay.android.databinding.HomeDrawMiddleViewBinding;
import cn.neopay.walpay.android.module.event.HomeTopViewEventBean;
import cn.neopay.walpay.android.module.event.NewsEventBean;
import cn.neopay.walpay.android.module.response.GetNewsResponseBean;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;
import cn.neopay.walpay.android.module.sliminjector.CommonLineItemBean;
import cn.neopay.walpay.android.ui.RNActivity;
import cn.neopay.walpay.android.utils.BusniessUtils;

/**
 * @author carlos.guo
 * @date 2017/9/27
 * @describe NewsFragment 消息页
 */

public class NewsFragment extends BaseFragment<NewsFragmentPresenter, FragmentNewsLayoutBinding> implements NewsFragmentContract.IView {

    private SlimAdapter mNewsAdapter;
    private ArrayList<Object> mDataList;
    private UserInfoResponseBean mUserInfoBean;
    private HomeDrawMiddleViewBinding mBinding;

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
        mNewsAdapter = SlimAdapter.create()
                .register(R.layout.common_news_red_packet_layout, new NewsRedPacketSlimInjector())
                .register(R.layout.common_news_activities_layout, new NewsActivitiesSlimInjector())
                .register(R.layout.common_news_item_layout, new NewsItemSlimInjector())
                .register(R.layout.common_line_item_layout, new MineLineSlimInjector());
        handleMiddleView();
        mViewBinding.mineNewsXrv.setAdapter(mNewsAdapter);
        mPresenter.getNewsInfo();
        mViewBinding.mineNewsXrv.setLoadingMoreEnabled(false);
        mViewBinding.mineNewsXrv.setLoadingListener(new XRecyclerView.LoadingListener() {
            @Override
            public void onRefresh() {
                //TODO 请求消息数据
                mPresenter.getNewsInfo();
                mViewBinding.mineNewsXrv.refreshComplete();
            }

            @Override
            public void onLoadMore() {
            }
        });
        mViewBinding.mineNewsXrv.addOnScrollListener(new RecyclerView.OnScrollListener() {
            @Override
            public void onScrolled(RecyclerView recyclerView, int dx, int dy) {
                float scale;
                if (dy > DensityUtils.dip2px(getContext(), 30)) {
                    scale = 1;
                } else {
                    scale = dy / (float) DensityUtils.dip2px(getContext(), 30);
                }
                HomeTopViewEventBean homeTopViewEventBean = new HomeTopViewEventBean();
                homeTopViewEventBean.setScrollY(dy);
                homeTopViewEventBean.setScaleY(scale);
                EventBus.getDefault().post(homeTopViewEventBean);
                super.onScrolled(recyclerView, dx, dy);
            }
        });
    }

    private void handleMiddleView() {
        final LayoutInflater inflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        mBinding = DataBindingUtil.inflate(inflater, R.layout.home_draw_middle_view, null, false);
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

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void selectCurrentPageCallBack(NewsEventBean newsEventBean) {
        initView();
    }


    @Override
    public void setNewsViewData(List<GetNewsResponseBean> newsBeanList) {
        if (null == newsBeanList) {
            return;
        }
        mDataList = new ArrayList<>();
        mDataList.add(new CommonLineItemBean());
        mPresenter.handleNewsData(newsBeanList, mDataList);
        mDataList.remove(mDataList.size() - 1);
        mNewsAdapter.updateData(mDataList);
    }
}
