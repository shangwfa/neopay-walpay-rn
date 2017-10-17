package cn.neopay.walpay.android.manager.jpushmanager;

import android.content.Context;

import cn.jpush.android.api.JPushMessage;
import cn.jpush.android.service.JPushMessageReceiver;

/**
 * @author carlos.guo
 * @date 2017/10/13
 * @describe  JPushTagAliasManager tag/alias的接收器(仅仅包含tag/alias新接口部分)
 */
public class JPushTagAliasManager extends JPushMessageReceiver {
    @Override
    public void onTagOperatorResult(Context context, JPushMessage jPushMessage) {
        JPushTagAliasOperatorHelper.getInstance().onTagOperatorResult(context, jPushMessage);
        super.onTagOperatorResult(context, jPushMessage);
    }

    @Override
    public void onCheckTagOperatorResult(Context context, JPushMessage jPushMessage) {
        JPushTagAliasOperatorHelper.getInstance().onCheckTagOperatorResult(context, jPushMessage);
        super.onCheckTagOperatorResult(context, jPushMessage);
    }

    @Override
    public void onAliasOperatorResult(Context context, JPushMessage jPushMessage) {
        JPushTagAliasOperatorHelper.getInstance().onAliasOperatorResult(context, jPushMessage);
        super.onAliasOperatorResult(context, jPushMessage);
    }

}

