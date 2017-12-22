package cn.neopay.walpay.android.adapter.sliminjector;

import android.app.Activity;
import android.graphics.Color;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.xgjk.common.lib.adapter.slimadapter.SlimInjector;
import com.xgjk.common.lib.adapter.slimadapter.viewinjector.IViewInjector;
import com.xgjk.common.lib.manager.glide.GlideManager;

import java.math.BigDecimal;
import java.text.MessageFormat;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.http.BaseSubscriber;
import cn.neopay.walpay.android.manager.apimanager.ApiManager;
import cn.neopay.walpay.android.module.activityParams.RNActivityParams;
import cn.neopay.walpay.android.module.request.UpdateNewsReadStatusRequestBean;
import cn.neopay.walpay.android.module.sliminjector.NewsRedPacketItemBean;
import cn.neopay.walpay.android.ui.RNActivity;
import cn.neopay.walpay.android.utils.DateHandle;

/**
 * @author carlos.guo
 * @date 2017/10/18
 * @describe
 */

public class NewsRedPacketSlimInjector implements SlimInjector<NewsRedPacketItemBean> {

    private int txtColor;

    @Override
    public void onInject(NewsRedPacketItemBean data, IViewInjector injector) {
        if (null == data) {
            return;
        }
        handleTxtColor(data);
        handleRedPacketView(data, injector);
        injector.background(R.id.common_news_type_icon_iv, R.mipmap.img_red_packet_banner)
                .with(R.id.red_packet_bg_iv, view -> GlideManager.loadNetImage((ImageView) view, data.getThemeUrl()))
                .text(R.id.common_news_type_time_tv, DateHandle.getMDHSTime(data.getCreateTimeMs()))
                .clicked(R.id.common_news_red_packet_ll, view -> handleRedPacketClick(data, view));
    }

    private void handleRedPacketClick(NewsRedPacketItemBean data, View view) {
        //1 领取中  2 成功 3 过期 4 领完 5 无权限
        if (1 != data.getReceiveStatus()) {
            RNActivity.jumpToRNPage(view.getContext(), RNActivity.PageType.ACTIVITY_RED_LIST_PAGE);
        } else {
            RNActivityParams params = new RNActivityParams();
            params.setPage(RNActivity.PageType.RP_DETAIL_PAGE);
            RNActivityParams.Data dataParams = new RNActivityParams.Data();
            dataParams.setPacketCode(data.getPacketCode());
            params.setData(dataParams);
            RNActivity.jumpToRNPage(view.getContext(), params);
        }

        UpdateNewsReadStatusRequestBean requestBean = new UpdateNewsReadStatusRequestBean();
        requestBean.setId(data.getId());
        requestBean.setMsgType(data.getMsgType());
        ApiManager.getSingleton().updateNewsReadStatus(requestBean,
                new BaseSubscriber((Activity) view.getContext(), o -> {
                }, false));
    }


    private void handleRedPacketView(NewsRedPacketItemBean data, IViewInjector injector) {
        handleTxtColor(injector);
        switch (data.getReceiveStatus()) {
            case 1://未领取
                handleNotReceive(data, injector);
                break;
            case 2://已领取
                handleReceived(data, injector);
                break;
            case 3://已过期，已领完
            case 4://已过期，已领完
                handleReceiveOut(data, injector);
                break;

        }
    }

    private void handleReceiveOut(NewsRedPacketItemBean data, IViewInjector injector) {
        injector.text(R.id.red_packet_title_tv, MessageFormat.format("啊哦，这个红包已经{0}了...", data.getReceiveStatus() == 3 ? "过期" : "抢完"))
                .text(R.id.red_packet_from_tv, MessageFormat.format("来自{0}的红包", data.getBossName()))
                .visibility(R.id.red_packet_from_empty_view, View.GONE)
                .visibility(R.id.red_packet_amount_tv, View.GONE)
                .with(R.id.red_packet_msg_tv, view -> {
                    view.setVisibility(View.VISIBLE);
                    ((TextView) view).setText(data.getMessage());
                });
    }

    private void handleReceived(NewsRedPacketItemBean data, IViewInjector injector) {
        injector.text(R.id.red_packet_title_tv, data.getMessage())
                .text(R.id.red_packet_from_tv, MessageFormat.format("来自{0}的红包", data.getBossName()))
                .visibility(R.id.red_packet_from_empty_view, View.GONE)
                .visibility(R.id.red_packet_msg_tv, View.GONE)
                .with(R.id.red_packet_amount_tv, view -> {
                    view.setVisibility(View.VISIBLE);
                    ((TextView) view).setText(MessageFormat.format("¥{0}", data.getLuckyAmount().setScale(2, BigDecimal.ROUND_HALF_UP).toString()));
                });
    }

    private void handleNotReceive(NewsRedPacketItemBean data, IViewInjector injector) {
        injector.text(R.id.red_packet_title_tv, data.getMessage())
                .text(R.id.red_packet_from_tv, MessageFormat.format("来自{0}的红包", data.getBossName()))
                .visibility(R.id.red_packet_from_empty_view, View.VISIBLE)
                .visibility(R.id.red_packet_amount_tv, View.GONE)
                .visibility(R.id.red_packet_msg_tv, View.GONE);
    }

    private void handleTxtColor(IViewInjector injector) {
        injector
                .with(R.id.red_packet_line_view, view -> view.setBackgroundColor(txtColor))
                .with(R.id.red_packet_title_tv, view -> ((TextView) view).setTextColor(txtColor))
                .with(R.id.red_packet_from_tv, view -> ((TextView) view).setTextColor(txtColor))
                .with(R.id.red_packet_amount_tv, view -> ((TextView) view).setTextColor(txtColor))
                .with(R.id.red_packet_msg_tv, view -> ((TextView) view).setTextColor(txtColor));
    }

    private void handleTxtColor(NewsRedPacketItemBean data) {
        txtColor = Color.parseColor("#FFFFFF");
        switch (data.getThemeType()) {
            case 2://生日
                txtColor = Color.parseColor("#FFFFFF");
                break;
            case 3://春节
                txtColor = Color.parseColor("#FBDEB0");
                break;
        }
    }
}
