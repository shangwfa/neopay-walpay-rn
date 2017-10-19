package cn.neopay.walpay.android.module.sliminjector;

/**
 * @author carlos.guo
 * @date 2017/10/18
 * @describe NewsRedPacketItemBean
 * //TODO 模拟news bean 数据
 */

public class NewsRedPacketItemBean {
    private String avatar;
    private boolean isSelect;
    private String name;
    private String time;
    private String content;
    private String contentTitle;
    private String contentFrom;

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

    public String getContentTitle() {
        return contentTitle;
    }

    public void setContentTitle(String contentTitle) {
        this.contentTitle = contentTitle;
    }

    public String getContentFrom() {
        return contentFrom;
    }

    public void setContentFrom(String contentFrom) {
        this.contentFrom = contentFrom;
    }

    public boolean isSelect() {
        return isSelect;
    }

    public void setSelect(boolean select) {
        isSelect = select;
    }
}
