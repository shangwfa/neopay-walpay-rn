package cn.neopay.walpay.android.module.sliminjector;

import android.view.View;

/**
 * @author carlos.guo
 * @date 2017/10/18
 * @describe NewsItemBean 消息页面
 */

public class NewsItemBean {
    private String avatar;
    private String name;
    private long time;
    private int isSelectState;
    private String content;
    private String typeClick;
    private View.OnClickListener onClickListener;
    private Integer msgType;
    private Long id;
    private String noticeUrl;

    public String getNoticeUrl() {
        return noticeUrl;
    }

    public void setNoticeUrl(String noticeUrl) {
        this.noticeUrl = noticeUrl;
    }

    public Integer getMsgType() {
        return msgType;
    }

    public void setMsgType(Integer msgType) {
        this.msgType = msgType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public View.OnClickListener getOnClickListener() {
        return onClickListener;
    }

    public void setOnClickListener(View.OnClickListener onClickListener) {
        this.onClickListener = onClickListener;
    }

    public String getTypeClick() {
        return typeClick;
    }

    public void setTypeClick(String typeClick) {
        this.typeClick = typeClick;
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

    public long getTime() {
        return time;
    }

    public void setTime(long time) {
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
