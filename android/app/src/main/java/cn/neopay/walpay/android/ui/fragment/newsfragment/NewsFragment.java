package cn.neopay.walpay.android.ui.fragment.newsfragment;

import android.support.v7.widget.LinearLayoutManager;

import com.xgjk.common.lib.adapter.slimadapter.SlimAdapter;
import com.xgjk.common.lib.base.BaseFragment;
import com.xgjk.common.lib.listener.RefreshLoadingListener;

import java.util.ArrayList;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.adapter.sliminjector.MineLineSlimInjector;
import cn.neopay.walpay.android.adapter.sliminjector.NewsActivitiesSlimInjector;
import cn.neopay.walpay.android.adapter.sliminjector.NewsItemSlimInjector;
import cn.neopay.walpay.android.adapter.sliminjector.NewsRedPacketSlimInjector;
import cn.neopay.walpay.android.databinding.FragmentNewsLayoutBinding;
import cn.neopay.walpay.android.module.sliminjector.CommonLineItemBean;
import cn.neopay.walpay.android.module.sliminjector.NewsActivitiesItemBean;
import cn.neopay.walpay.android.module.sliminjector.NewsItemBean;
import cn.neopay.walpay.android.module.sliminjector.NewsRedPacketItemBean;

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
        mViewBinding.mineNewsXrv.setLoadingListener(new RefreshLoadingListener() {
            @Override
            public void onRefresh() {
                mViewBinding.mineNewsXrv.refreshComplete();
            }
        });
    }

    private void setAdapterData(ArrayList<Object> data) {
        NewsRedPacketItemBean newsRedPacketItemBean = new NewsRedPacketItemBean();
        newsRedPacketItemBean.setContentTitle("新店开张，多多捧场！");
        newsRedPacketItemBean.setContentFrom("--来自胡萝卜的兔子店的红包");
        newsRedPacketItemBean.setTime("2017-10-18 10:50");
        newsRedPacketItemBean.setContent("http://img0.imgtn.bdimg.com/it/u=1765474568,392718820&fm=27&gp=0.jpg");
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
        mViewBinding.commonHeader.setHeaderOnlyTitle("消息");
    }
}
