package com.xgjk.common.lib.manager;

import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.text.TextUtils;

import com.peng.one.push.OnePush;
import com.peng.one.push.core.OnOnePushRegisterListener;
import com.peng.one.push.entity.OnePushCommand;
import com.xgjk.common.lib.utils.RomUtils;

/**
 * Created by shangwf on 2017/8/9.
 */

public class PushManager {

    private static final String PUSH_DATA = "PUSH_DATA";
    private static final String ACTION_LOG = "com.peng.one.push.ACTION_LOG";
    public static final String LOG_LINE = "-----------------%s-----------------";

    public static void init(Context context) {
        OnePush.init((Application) context, new OnOnePushRegisterListener() {
            @Override
            public boolean onRegisterPush(int platformCode, String platformName) {
                //platformCode和platformName就是在<meta/>标签中，对应的"平台标识码"和平台名称
                if (RomUtils.isHuaweiRom()) {
                    return platformCode == 102;
                } else {
                    return platformCode == 101;
                }
            }
        });
        OnePush.register();
    }


    public static void sendLogBroadcast(Context context, String log) {
        Intent intent = new Intent(ACTION_LOG);
        intent.putExtra(PUSH_DATA, log);
        context.sendBroadcast(intent);
    }


    public static String generateLogByOnePushCommand(OnePushCommand onePushCommand) {
        StringBuilder builder = new StringBuilder();
        String type ;
        switch (onePushCommand.getType()) {
            case OnePushCommand.TYPE_ADD_TAG:
                type = "添加标签";
                break;
            case OnePushCommand.TYPE_DEL_TAG:
                type = "删除标签";
                break;
            case OnePushCommand.TYPE_BIND_ALIAS:
                type = "绑定别名";
                break;
            case OnePushCommand.TYPE_UNBIND_ALIAS:
                type = "解绑别名";
                break;
            case OnePushCommand.TYPE_REGISTER:
                type = "注册推送";
                break;
            case OnePushCommand.TYPE_UNREGISTER:
                type = "取消注册推送";
                break;
            case OnePushCommand.TYPE_AND_OR_DEL_TAG:
                type = "添加或删除标签";
                break;
            default:
                type = "未定义类型";
                break;
        }
        builder.append(String.format(LOG_LINE, type)).append("\n");
        if (!TextUtils.isEmpty(onePushCommand.getToken())) {
            builder.append("推送token：").append(onePushCommand.getToken()).append("\n");
        }
        if (!TextUtils.isEmpty(onePushCommand.getExtraMsg())) {
            builder.append("额外信息(tag/alias)：").append(onePushCommand.getExtraMsg()).append("\n");
        }
        builder.append("操作结果：").append(onePushCommand.getResultCode() == OnePushCommand.RESULT_OK ? "成功" : onePushCommand.getError());
        return builder.toString();
    }
}
