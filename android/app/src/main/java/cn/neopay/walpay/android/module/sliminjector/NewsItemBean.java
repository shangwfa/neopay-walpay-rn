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
    private View.OnClickListener onClickListener;

    public View.OnClickListener getOnClickListener() {
        return onClickListener;
    }

    public void setOnClickListener(View.OnClickListener onClickListener) {
        this.onClickListener = onClickListener;
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
