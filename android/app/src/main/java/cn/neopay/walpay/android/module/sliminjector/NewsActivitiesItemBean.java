package cn.neopay.walpay.android.module.sliminjector;

import android.view.View;

/**
 * @author carlos.guo
 * @date 2017/10/18
 * @describe NewsItemBean 消息 活动页面
 */

public class NewsActivitiesItemBean {
    private String avatar;
    private String name;
    private String time;
    private int isSelectState;
    private String content;
    private int msgType;
    private int payNoticeType;
    private View.OnClickListener onClickListener;

    public View.OnClickListener getOnClickListener() {
        return onClickListener;
    }

    public void setOnClickListener(View.OnClickListener onClickListener) {
        this.onClickListener = onClickListener;
    }

    public int getPayNoticeType() {
        return payNoticeType;
    }

    public void setPayNoticeType(int payNoticeType) {
        this.payNoticeType = payNoticeType;
    }

    public int getMsgType() {
        return msgType;
    }

    public void setMsgType(int msgType) {
        this.msgType = msgType;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getIsSelectState() {
        return isSelectState;
    }

    public void setIsSelectState(int isSelectState) {
        this.isSelectState = isSelectState;
    }

}
