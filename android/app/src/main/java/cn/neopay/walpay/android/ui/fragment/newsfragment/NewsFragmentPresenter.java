package cn.neopay.walpay.android.ui.fragment.newsfragment;

import com.xgjk.common.lib.utils.HandlerUtils;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;

import cn.neopay.walpay.android.WalpayApp;
import cn.neopay.walpay.android.http.BaseSubscriber;
import cn.neopay.walpay.android.manager.apimanager.ApiManager;
import cn.neopay.walpay.android.manager.routermanager.MainRouter;
import cn.neopay.walpay.android.module.request.BaseRequest;
import cn.neopay.walpay.android.module.request.UpdateNewsReadStatusRequestBean;
import cn.neopay.walpay.android.module.response.GetNewsResponseBean;
import cn.neopay.walpay.android.module.sliminjector.CommonLineItemBean;
import cn.neopay.walpay.android.module.sliminjector.NewsActivitiesItemBean;
import cn.neopay.walpay.android.module.sliminjector.NewsItemBean;
import cn.neopay.walpay.android.module.sliminjector.NewsRedPacketItemBean;
import cn.neopay.walpay.android.rn.RNPackage;
import cn.neopay.walpay.android.rn.module.CommModule;
import cn.neopay.walpay.android.ui.RNActivity;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe
 */

public class NewsFragmentPresenter extends NewsFragmentContract.Presenter {
    NewsItemBean mNewsItemBean;

    @Override
    public void getNewsInfo() {
        ApiManager.getSingleton().getHomeNewsInfo(new BaseRequest(),
                new BaseSubscriber(mActivity, o -> mView.setNewsViewData((List<GetNewsResponseBean>) o)));
    }

    @Override
    public void updateNewsStatus(UpdateNewsReadStatusRequestBean requestBean) {
        ApiManager.getSingleton().updateNewsReadStatus(requestBean,
                new BaseSubscriber(mActivity, o -> {
                }, false));
    }

    @Override
    public void handleNewsData(List<GetNewsResponseBean> newsBeanList, ArrayList<Object> mDataList) {
        for (GetNewsResponseBean getNewsResponseBean : newsBeanList) {
            switch (getNewsResponseBean.getMsgType()) {
                case 1://红包消息--集合
                    handleRedPacketNews(getNewsResponseBean, mDataList);
                    break;
                case 2://支付消息--集合
                    handlePayTypeNews(getNewsResponseBean);
                    mNewsItemBean.setOnClickListener(view -> {
                        RNActivity.jumpToRNPage(mActivity, RNActivity.PageType.PAY_MESSAGE_PAGE);
                        updateNewsStatus(getNewsResponseBean);
                    });
                    mDataList.add(mNewsItemBean);
                    break;
                case 3://手机充值消息--集合
                    handlePayTypeNews(getNewsResponseBean);
                    mNewsItemBean.setOnClickListener(view -> {
                        RNActivity.jumpToRNPage(mActivity, RNActivity.PageType.TOPUP_MSG_LIST_PAGE);
                        updateNewsStatus(getNewsResponseBean);
                    });
                    mDataList.add(mNewsItemBean);
                    break;
                case 4://其他消息
                    handleOtherNews(getNewsResponseBean, mDataList);
                    break;
            }
            mDataList.add(new CommonLineItemBean());
        }
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
                mNewsItemBean.setOnClickListener(view -> {
                    MainRouter.getSingleton().jumpToCommonWebPage(getNewsResponseBean.getNoticeUrl());
                    updateNewsStatus(getNewsResponseBean);
                });
                mDataList.add(mNewsItemBean);
                break;
        }
    }

    private void handleActivityNews(GetNewsResponseBean getNewsResponseBean, ArrayList<Object> mDataList) {
        NewsActivitiesItemBean newsActivitiesItemBean = new NewsActivitiesItemBean();
        newsActivitiesItemBean.setAvatar(getNewsResponseBean.getIconUrl());
        newsActivitiesItemBean.setTime(MessageFormat.format("{0}", getNewsResponseBean.getCreateTimeMs()));
        newsActivitiesItemBean.setContent(getNewsResponseBean.getNoticeImageUrl());
        newsActivitiesItemBean.setOnClickListener(view -> {
            MainRouter.getSingleton().jumpToCommonWebPage(getNewsResponseBean.getNoticeUrl());
            updateNewsStatus(getNewsResponseBean);
        });
        mDataList.add(newsActivitiesItemBean);
    }

    private void handlePayTypeNews(GetNewsResponseBean getNewsResponseBean) {
        mNewsItemBean = new NewsItemBean();
        mNewsItemBean.setAvatar(getNewsResponseBean.getIconUrl());
        mNewsItemBean.setName(getNewsResponseBean.getMsgTypeText());
        mNewsItemBean.setTime(MessageFormat.format("{0}", getNewsResponseBean.getCreateTimeMs()));
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
        newsRedPacketItemBean.setOnClickListener(view -> {
            if (1 == getNewsResponseBean.getReadStatus()) {
                RNActivity.jumpToRNPage(mActivity, RNActivity.PageType.ACTIVITY_RED_LIST_PAGE);
            }
            RNActivity.jumpToRNPage(mActivity, RNActivity.PageType.RP_DETAIL_PAGE);
            HandlerUtils.runOnUiThreadDelay(() -> {
                RNPackage rnPackage = WalpayApp.getRnPackage();
                CommModule mModule = rnPackage.mModule;
                mModule.nativeCallRnRedPacketDetail(getNewsResponseBean.getPacketCode());
            }, 1000);

            updateNewsStatus(getNewsResponseBean);
        });
        mDataList.add(newsRedPacketItemBean);
    }

    private void updateNewsStatus(GetNewsResponseBean getNewsResponseBean) {
        UpdateNewsReadStatusRequestBean requestBean = new UpdateNewsReadStatusRequestBean();
        requestBean.setId(getNewsResponseBean.getId());
        requestBean.setMsgType(getNewsResponseBean.getMsgType());
        updateNewsStatus(requestBean);
    }

}
