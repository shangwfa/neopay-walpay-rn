package cn.neopay.walpay.android.module.sliminjector;

/**
 * @author carlos.guo
 * @date 2017/10/18
 * @describe NewsItemBean 消息页面
 * //TODO 模式news bean
 */

public class NewsActivitiesItemBean {
    private String avatar;
    private String name;
    private String time;
    private boolean isSelect;
    private String content;

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

    public boolean isSelect() {
        return isSelect;
    }

    public void setSelect(boolean select) {
        isSelect = select;
    }
}
