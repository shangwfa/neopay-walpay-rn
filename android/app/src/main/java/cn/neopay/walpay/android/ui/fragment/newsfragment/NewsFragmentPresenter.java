package cn.neopay.walpay.android.ui.fragment.newsfragment;

import com.xgjk.common.lib.utils.PageUtils;

import java.util.ArrayList;
import java.util.List;

import cn.neopay.walpay.android.http.BaseSubscriber;
import cn.neopay.walpay.android.manager.apimanager.ApiManager;
import cn.neopay.walpay.android.module.request.GetHomeNewsInfoRequestBean;
import cn.neopay.walpay.android.module.response.GetNewsResponseBean;
import cn.neopay.walpay.android.module.sliminjector.CommonLineItemBean;
import cn.neopay.walpay.android.module.sliminjector.NewsActivitiesItemBean;
import cn.neopay.walpay.android.module.sliminjector.NewsItemBean;
import cn.neopay.walpay.android.module.sliminjector.NewsNetworkErrorBean;
import cn.neopay.walpay.android.module.sliminjector.NewsNoDataBean;
import cn.neopay.walpay.android.module.sliminjector.NewsRedPacketItemBean;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe
 */

public class NewsFragmentPresenter extends NewsFragmentContract.Presenter {
    private NewsItemBean mNewsItemBean;
    private final ArrayList<Object> mDataList = new ArrayList<>();
    private final ArrayList<Object> mDataPageList = new ArrayList<>();

    @Override
    public void getNewsInfo() {
        handleRefresh(true, false);
    }

    @Override
    public void getNewsInfoLoadMore() {
        handleRefresh(false, false);
    }

    private void handleRefresh(boolean isRefresh, boolean isShowLoading) {
        if (isRefresh) {
            mDataList.clear();
            mDataPageList.clear();
            mView.setNoMoreData(false);
        }
        GetHomeNewsInfoRequestBean requestBean = new GetHomeNewsInfoRequestBean();
        requestBean.setPageNo(PageUtils.getPageNo(mDataPageList));
        ApiManager.getSingleton().getHomeNewsInfo(requestBean,
                new BaseSubscriber(mActivity, o -> handleNewsData((List<GetNewsResponseBean>) o, isRefresh),
                        isShowLoading, t -> handleNetWorkError()));
    }

    private void handleNetWorkError() {
        mDataList.clear();
        mDataList.add(new CommonLineItemBean());
        NewsNetworkErrorBean errorBean = new NewsNetworkErrorBean();
        errorBean.setOnClickListener(view -> handleRefresh(true, true));
        mDataList.add(errorBean);
        mView.setNewsViewData(mDataList);
    }

    private void handleNoData() {
        mDataList.clear();
        mDataList.add(new CommonLineItemBean());
        NewsNoDataBean noDataBean = new NewsNoDataBean();
        noDataBean.setOnClickListener(view -> handleRefresh(true, true));
        mDataList.add(noDataBean);
        mView.setNewsViewData(mDataList);
    }

    @Override
    public void handleNewsData(List<GetNewsResponseBean> newsBeanList, boolean isRefresh) {
        if (null == newsBeanList) {
            handleNoData();
            return;
        }
        mDataPageList.addAll(newsBeanList);
        if (PageUtils.isLoadNoMoreItem(mDataPageList.size())) {
            mView.setNoMoreData(true);
        }
        mDataList.add(new CommonLineItemBean());
        for (GetNewsResponseBean getNewsResponseBean : newsBeanList) {
            switch (getNewsResponseBean.getMsgType()) {
                case 1://红包消息--集合
                    handleRedPacketNews(getNewsResponseBean, mDataList);
                    break;
                case 2://支付消息--集合
                    handlePayTypeNews(getNewsResponseBean);
                    mNewsItemBean.setTypeClick("payNews");
                    mNewsItemBean.setMsgType(getNewsResponseBean.getMsgType());
                    mNewsItemBean.setId(getNewsResponseBean.getId());
                    mDataList.add(mNewsItemBean);
                    break;
                case 3://手机充值消息--集合
                    handlePayTypeNews(getNewsResponseBean);
                    mNewsItemBean.setTypeClick("phoneNews");
                    mNewsItemBean.setMsgType(getNewsResponseBean.getMsgType());
                    mNewsItemBean.setId(getNewsResponseBean.getId());
                    mDataList.add(mNewsItemBean);
                    break;
                case 4://其他消息
                    handleOtherNews(getNewsResponseBean, mDataList);
                    break;
            }
            mDataList.add(new CommonLineItemBean());
        }
        mDataList.remove(mDataList.size() - 1);
        mView.setNewsViewData(mDataList);
    }


    private void handleOtherNews(GetNewsResponseBean getNewsResponseBean, ArrayList<Object> mDataList) {
        switch (getNewsResponseBean.getPayNoticeType()) {
            case 1://商家活动
            case 3://系统活动
                handleActivityNews(getNewsResponseBean, mDataList);
                break;
            case 2://系统消息
            case 4://商家广播
                handlePayTypeNews(getNewsResponseBean);
                mNewsItemBean.setTypeClick("otherNews");
                mNewsItemBean.setMsgType(getNewsResponseBean.getMsgType());
                mNewsItemBean.setId(getNewsResponseBean.getId());
                mNewsItemBean.setNoticeUrl(getNewsResponseBean.getNoticeUrl());
                mDataList.add(mNewsItemBean);
                break;
        }
    }

    private void handleActivityNews(GetNewsResponseBean getNewsResponseBean, ArrayList<Object> mDataList) {
        NewsActivitiesItemBean newsActivitiesItemBean = new NewsActivitiesItemBean();
        newsActivitiesItemBean.setAvatar(getNewsResponseBean.getIconUrl());
        newsActivitiesItemBean.setTime(getNewsResponseBean.getCreateTimeMs());
        newsActivitiesItemBean.setContent(getNewsResponseBean.getNoticeImageUrl());
        newsActivitiesItemBean.setMsgType(getNewsResponseBean.getMsgType());
        newsActivitiesItemBean.setId(getNewsResponseBean.getId());
        newsActivitiesItemBean.setNoticeUrl(getNewsResponseBean.getNoticeUrl());
        mDataList.add(newsActivitiesItemBean);
    }

    private void handlePayTypeNews(GetNewsResponseBean getNewsResponseBean) {
        mNewsItemBean = new NewsItemBean();
        mNewsItemBean.setAvatar(getNewsResponseBean.getIconUrl());
        mNewsItemBean.setName(getNewsResponseBean.getMsgTypeText());
        mNewsItemBean.setTime(getNewsResponseBean.getCreateTimeMs());
        mNewsItemBean.setContent(getNewsResponseBean.getContentString());
        mNewsItemBean.setIsSelectState(getNewsResponseBean.getReadStatus());
    }

    private void handleRedPacketNews(GetNewsResponseBean getNewsResponseBean, ArrayList<Object> mDataList) {
        NewsRedPacketItemBean newsRedPacketItemBean = new NewsRedPacketItemBean();
        newsRedPacketItemBean.setCreateTimeMs(getNewsResponseBean.getCreateTimeMs());
        newsRedPacketItemBean.setThemeUrl(getNewsResponseBean.getThemeUrl());
        newsRedPacketItemBean.setThemeType(getNewsResponseBean.getThemeType());
        newsRedPacketItemBean.setMessage(getNewsResponseBean.getMessage());
        newsRedPacketItemBean.setBossName(getNewsResponseBean.getBossName());
        newsRedPacketItemBean.setLuckyAmount(getNewsResponseBean.getLuckyAmount());
        newsRedPacketItemBean.setPacketCode(getNewsResponseBean.getPacketCode());
        newsRedPacketItemBean.setReceiveStatus(getNewsResponseBean.getReceiveStatus());
        newsRedPacketItemBean.setId(getNewsResponseBean.getId());
        newsRedPacketItemBean.setMsgType(getNewsResponseBean.getMsgType());
        mDataList.add(newsRedPacketItemBean);
    }

}
