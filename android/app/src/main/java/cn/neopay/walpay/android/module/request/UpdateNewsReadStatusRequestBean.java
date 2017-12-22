package cn.neopay.walpay.android.module.request;

/**
 * 更新首页消息的状态
 */
public class UpdateNewsReadStatusRequestBean extends BaseRequest {
    private Integer msgType;
    private Long id;

    public int getMsgType() {
        return msgType;
    }

    public void setMsgType(int msgType) {
        this.msgType = msgType;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
