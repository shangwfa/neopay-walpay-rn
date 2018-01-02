package cn.neopay.walpay.android.manager.jpushmanager;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;

import com.google.gson.Gson;
import com.orhanobut.logger.Logger;
import com.xgjk.common.lib.utils.StringUtils;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;

import cn.jpush.android.api.JPushInterface;
import cn.neopay.walpay.android.WalpayApp;
import cn.neopay.walpay.android.http.BaseSubscriber;
import cn.neopay.walpay.android.manager.apimanager.ApiManager;
import cn.neopay.walpay.android.manager.routermanager.MainRouter;
import cn.neopay.walpay.android.module.activityParams.RNActivityParams;
import cn.neopay.walpay.android.module.request.GetUserInfoRequestBean;
import cn.neopay.walpay.android.module.request.RedPacketStateRequestBean;
import cn.neopay.walpay.android.module.request.UpdateNewsReadStatusRequestBean;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;
import cn.neopay.walpay.android.ui.RNActivity;

/**
 * @author carlos.guo
 * @date 2017/10/13
 * @describe JPushManager 消息管理器
 */

public class JPushManager extends BroadcastReceiver {

    private static final String TAG = "JPushManager";

    @Override
    public void onReceive(Context context, Intent intent) {
        try {
            Bundle bundle = intent.getExtras();
            Logger.d(TAG, "[JPushManager] onReceive - " + intent.getAction() + ", extras: " + printBundle(bundle));

            switch (intent.getAction()) {
                case JPushInterface.ACTION_CONNECTION_CHANGE://JPush 服务的连接状态
                    jPushConnectionState(intent);
                    break;
                case JPushInterface.ACTION_NOTIFICATION_OPENED://通知被用户点击
                    jPushNotificationOpended(bundle);
                    break;
                case JPushInterface.ACTION_NOTIFICATION_RECEIVED://通知消息 无内容不显示通知，可获取内容外的其他信息
                    jPushNotification(bundle);
                    break;
                case JPushInterface.ACTION_MESSAGE_RECEIVED://推送的自定义消息、内部消息(只传递，无界面)
                    jPushMessage(bundle);
                    break;
                case JPushInterface.ACTION_RICHPUSH_CALLBACK://富文本消息 处理
                    jPushRichPushCallBack(bundle);
                    break;
                case JPushInterface.ACTION_REGISTRATION_ID://绑定App用户与JPush用户的方式(别名和标签功能更优)
                    jPushRegistrationId(bundle);
                    break;
                default://默认处理
                    Log.d(TAG, "JPushManager Unhandled intent --- : " + intent.getAction());
                    break;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    private void jPushRegistrationId(Bundle bundle) {
        String regId = bundle.getString(JPushInterface.EXTRA_REGISTRATION_ID);
        Logger.d(TAG, "Registration Id : " + regId);
    }

    private void jPushRichPushCallBack(Bundle bundle) {
        String richExtras = bundle.getString(JPushInterface.EXTRA_EXTRA);
        //根据 JPushInterface.EXTRA_EXTRA 的内容处理代码，比如打开新的Activity， 打开一个网页等..
        Logger.d(TAG, "RICH PUSH CALLBACK: " + richExtras);
    }

    private void jPushMessage(Bundle bundle) {
        //服务器推送下来的消息的标题
        String title = bundle.getString(JPushInterface.EXTRA_TITLE);
        //服务器推送下来的消息内容
        String message = bundle.getString(JPushInterface.EXTRA_MESSAGE);
        //服务器推送下来的附加字段
        String extras = bundle.getString(JPushInterface.EXTRA_EXTRA);
        //唯一标识消息的 ID, 可用于上报统计等。
        String msgID = bundle.getString(JPushInterface.EXTRA_MSG_ID);
        Logger.d(TAG, "title: " + title + "\nmessage: " + message +
                "\nextras：" + extras + "\nmsgId: " + msgID);
    }

    private void jPushNotification(Bundle bundle) {
        //服务器推送下来的通知的标题
        String notifacationTitle = bundle.getString(JPushInterface.EXTRA_NOTIFICATION_TITLE);
        //服务器推送下来的通知的内容
        String notifacationcontent = bundle.getString(JPushInterface.EXTRA_ALERT);
        //服务器推送下来的通知的附加字段
        String notifacationExtras = bundle.getString(JPushInterface.EXTRA_EXTRA);
        //通知栏的Notification ID,可以用于清除Notification
        //内容（alert）字段为空，则notification id 为0
        int notificationId = bundle.getInt(JPushInterface.EXTRA_NOTIFICATION_ID);
        //服务器推送下来的富媒体通知的HTML的文件路径,用于展现WebView
        String fileHtml = bundle.getString(JPushInterface.EXTRA_RICHPUSH_HTML_PATH);
        Logger.d(TAG, "notifacationTitle: " + notifacationTitle + "\nnotifacationcontent: " + notifacationcontent +
                "\nnotifacationExtras：" + notifacationExtras + "\nnotificationId: " + notificationId);
    }

    private void jPushNotificationOpended(Bundle bundle) {
        //拥有和通知一样的信息，可以进出处理点击事件
        //如果未配置此action 默认打开首页，反之处理响应
        String notifacationExtras = bundle.getString(JPushInterface.EXTRA_EXTRA);
        Logger.d(TAG, "jPushNotificationOpende: true");
        handleNotificationOpended(notifacationExtras);
    }

    private void handleNotificationOpended(String notifacationExtras) {
        Gson gson = new Gson();
        JPushDataBean jPushDataBean = gson.fromJson(notifacationExtras, JPushDataBean.class);
        if (null != jPushDataBean && null != jPushDataBean.getExtraParam()) {
            JPushDataExtraBean jPushDataExtraBean = gson.fromJson(jPushDataBean.getExtraParam(), JPushDataExtraBean.class);
            if (null != jPushDataExtraBean && null != jPushDataExtraBean.getParams()) {
                JPushDataParamsBean jPushDataParamsBean = gson.fromJson(jPushDataExtraBean.getParams(), JPushDataParamsBean.class);
                if (null != jPushDataParamsBean) {
                    switch (jPushDataExtraBean.getRedirectType()) {
                        case 1://原生
                            handleJumpNative(jPushDataExtraBean, jPushDataParamsBean);
                            break;
                        case 2://h5
                            handleJumpH5(jPushDataExtraBean);
                            break;
                    }
                    handleUpdateNewsState(jPushDataExtraBean);
                }
            }
        } else {
            MainRouter.getSingleton().jumpToHomeDrawPage();
        }
    }

    private void handleUpdateNewsState(JPushDataExtraBean jPushDataExtraBean) {
        if (StringUtils.isNoEmpty(String.valueOf(jPushDataExtraBean.getMsgType()))) {
            UpdateNewsReadStatusRequestBean requestBean = new UpdateNewsReadStatusRequestBean();
            requestBean.setId(jPushDataExtraBean.getId());
            requestBean.setMsgType(jPushDataExtraBean.getMsgType());
            ApiManager.getSingleton().updateNewsReadStatus(requestBean,
                    new BaseSubscriber(WalpayApp.application, o -> {
                    }, false));
        }
    }

    private void handleJumpH5(JPushDataExtraBean jPushDataExtraBean) {
        switch (jPushDataExtraBean.getNoticeType()) {
            case 5://商家广播
            case 6://聚惠进行时
            case 7://系统消息
            case 8://系统活动
            default://默认
                MainRouter.getSingleton().jumpToCommonWebPage(jPushDataExtraBean.getRedirectUrl());
                break;
        }
    }

    private void handleJumpNative(JPushDataExtraBean jPushDataExtraBean, JPushDataParamsBean jPushDataParamsBean) {
        switch (jPushDataExtraBean.getNoticeType()) {
            case 1://"红包来了"
                handleRedPacket(jPushDataParamsBean);
                break;
            case 2://支付消息
                RNActivity.jumpToRNPage(WalpayApp.application, RNActivity.PageType.PAY_MESSAGE_PAGE);
                break;
            case 3://手机话费到账成功
            case 4://手机流量到账成功
                RNActivity.jumpToRNPage(WalpayApp.application, RNActivity.PageType.TOPUP_MSG_LIST_PAGE);
                break;
            default://默认首页
                MainRouter.getSingleton().jumpToHomeDrawPage();
                break;
        }
    }

    private void handleRedPacket(JPushDataParamsBean jPushDataParamsBean) {
        ApiManager.getSingleton().getUserInfo(new GetUserInfoRequestBean(),
                new BaseSubscriber(WalpayApp.application, o -> {
                    UserInfoResponseBean responseBean = (UserInfoResponseBean) o;
                    if (2 != responseBean.getAuthStatus()) {//未实名
                        MainRouter.getSingleton().jumpToHomeDrawPage();
                    } else {//实名
                        ApiManager.getSingleton().updateRedPacketState(new RedPacketStateRequestBean(jPushDataParamsBean.getRedPacketCode()),
                                new BaseSubscriber(WalpayApp.application, os -> {
                                    RNActivityParams params = new RNActivityParams();
                                    params.setPage(RNActivity.PageType.RP_DETAIL_PAGE);
                                    RNActivityParams.Data dataParams = new RNActivityParams.Data();
                                    dataParams.setPacketCode(jPushDataParamsBean.getRedPacketCode());
                                    params.setData(dataParams);
                                    RNActivity.jumpToRNPage(WalpayApp.application, params);
                                }, false));
                    }
                }, false));
    }

    private void jPushConnectionState(Intent intent) {
        //JPush 服务的连接状态
        boolean connectedState = intent.getBooleanExtra(JPushInterface.EXTRA_CONNECTION_CHANGE, false);
        Logger.d(TAG, "connectedState: " + connectedState);
    }

    /**
     * 打印所有的 intent extra 数据
     */
    private static String printBundle(Bundle bundle) {
        StringBuilder sb = new StringBuilder();
        for (String key : bundle.keySet()) {
            if (key.equals(JPushInterface.EXTRA_NOTIFICATION_ID)) {
                sb.append("\nkey:  " + key + ", value:  " + bundle.getInt(key));
            } else if (key.equals(JPushInterface.EXTRA_CONNECTION_CHANGE)) {
                sb.append("\nkey:  " + key + ", value:  " + bundle.getBoolean(key));
            } else if (key.equals(JPushInterface.EXTRA_EXTRA)) {
                if (TextUtils.isEmpty(bundle.getString(JPushInterface.EXTRA_EXTRA))) {
                    Logger.i(TAG, "This message has no Extra data");
                    continue;
                }
                try {
                    JSONObject json = new JSONObject(bundle.getString(JPushInterface.EXTRA_EXTRA));
                    Iterator<String> it = json.keys();
                    while (it.hasNext()) {
                        String myKey = it.next();
                        sb.append("\nkey:  " + key + ", value:   [" +
                                myKey + " - " + json.optString(myKey) + "]");
                    }
                } catch (JSONException e) {
                    Logger.e(TAG, "Get message extra JSON error!");
                }
            } else {
                sb.append("\nkey:  " + key + ", value:  " + bundle.getString(key));
            }
        }
        return sb.toString();
    }
}
