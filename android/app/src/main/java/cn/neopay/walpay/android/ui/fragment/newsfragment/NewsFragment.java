package cn.neopay.walpay.android.ui.fragment.newsfragment;

import android.support.v7.widget.LinearLayoutManager;
import android.view.View;

import com.xgjk.common.lib.adapter.slimadapter.SlimAdapter;
import com.xgjk.common.lib.base.BaseFragment;
import com.xgjk.common.lib.view.xrecyclerview.XRecyclerView;

import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

import java.util.ArrayList;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.adapter.sliminjector.MineLineSlimInjector;
import cn.neopay.walpay.android.adapter.sliminjector.NewsActivitiesSlimInjector;
import cn.neopay.walpay.android.adapter.sliminjector.NewsItemSlimInjector;
import cn.neopay.walpay.android.adapter.sliminjector.NewsRedPacketSlimInjector;
import cn.neopay.walpay.android.databinding.FragmentNewsLayoutBinding;
import cn.neopay.walpay.android.manager.routermanager.MainRouter;
import cn.neopay.walpay.android.module.activityParams.RNActivityParams;
import cn.neopay.walpay.android.module.event.NewsEventBean;
import cn.neopay.walpay.android.module.sliminjector.CommonLineItemBean;
import cn.neopay.walpay.android.module.sliminjector.NewsActivitiesItemBean;
import cn.neopay.walpay.android.module.sliminjector.NewsItemBean;
import cn.neopay.walpay.android.module.sliminjector.NewsRedPacketItemBean;
import cn.neopay.walpay.android.ui.RNActivity;

/**
 * @author carlos.guo
 * @date 2017/9/27
 * @describe NewsFragment 消息页
 */

public class NewsFragment extends BaseFragment<NewsFragmentPresenter, FragmentNewsLayoutBinding> implements NewsFragmentContract.IView {

    private SlimAdapter mNewsAdapter;

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
        mViewBinding.mineNewsXrv.setAdapter(mNewsAdapter);
        ArrayList<Object> data = new ArrayList<>();
        setAdapterData(data);
        mNewsAdapter.updateData(data);
        mViewBinding.mineNewsXrv.setLoadingMoreEnabled(false);
        mViewBinding.mineNewsXrv.setLoadingListener(new XRecyclerView.LoadingListener() {
            @Override
            public void onRefresh() {
                //TODO 请求消息数据
                mViewBinding.mineNewsXrv.refreshComplete();
            }

            @Override
            public void onLoadMore() {
            }
        });
    }

    private void setAdapterData(ArrayList<Object> data) {
        NewsRedPacketItemBean newsRedPacketItemBean = new NewsRedPacketItemBean();
        newsRedPacketItemBean.setContentTitle("新店开张，多多捧场！");
        newsRedPacketItemBean.setContentFrom("--来自胡萝卜的兔子店的红包");
        newsRedPacketItemBean.setTime("2017-10-18 10:50");
        newsRedPacketItemBean.setContent("http://img0.imgtn.bdimg.com/it/u=1765474568,392718820&fm=27&gp=0.jpg");
        newsRedPacketItemBean.setOnClickListener(v -> {
            RNActivityParams activityParams = new RNActivityParams();
            activityParams.setRnPage(RNActivity.PageType.ACTIVITY_RED_LIST_PAGE);
            MainRouter.getSingleton().jumpToRNPage(v.getContext(), activityParams);
        });
        NewsActivitiesItemBean newsActivitiesItemBean = new NewsActivitiesItemBean();
        newsActivitiesItemBean.setContent("http://img0.imgtn.bdimg.com/it/u=1765474568,392718820&fm=27&gp=0.jpg");
        newsActivitiesItemBean.setTime("2017-10-18 10:50");
        NewsItemBean newsItemBean = new NewsItemBean();
        newsItemBean.setAvatar("http://img0.imgtn.bdimg.com/it/u=1765474568,392718820&fm=27&gp=0.jpg");
        newsItemBean.setName("支付消息");
        newsItemBean.setTime("2017-10-18 10:50");
        newsItemBean.setContent("支付成功");
        newsItemBean.setSelect(true);
        data.add(newsRedPacketItemBean);
        data.add(new CommonLineItemBean());
        data.add(newsItemBean);
        data.add(new CommonLineItemBean());
        data.add(newsActivitiesItemBean);
    }

    private void setHeaderView() {
        if (null != getArguments() && "homeDrawer".equals(getArguments().getString("pageOrigin"))) {
            mPageBinding.commonHeader.setVisibility(View.GONE);
        }
        mPageBinding.commonHeader.setHeaderOnlyTitle("消息");
    }

    @Override
    public boolean isShowExceptionView() {
        return true;
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void selectCurrentPageCallBack(NewsEventBean newsEventBean) {
        initView();
    }
}
