package cn.neopay.walpay.android.module.request;

/**
 * @author carlos.guo
 * @date 2017/12/29
 * @describe
 */

public class UpdateJPushMsgRequestBean extends BaseRequest {
    /**
     * 推送id  "注册ID不能为空"
     */
    private String registrationId;


    public UpdateJPushMsgRequestBean() {
    }

    public UpdateJPushMsgRequestBean(String registrationId) {
        this.registrationId = registrationId;
    }

    public String getRegistrationId() {
        return registrationId;
    }

    public void setRegistrationId(String registrationId) {
        this.registrationId = registrationId;
    }
}
