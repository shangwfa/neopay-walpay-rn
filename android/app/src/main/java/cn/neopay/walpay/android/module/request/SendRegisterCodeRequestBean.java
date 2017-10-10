package cn.neopay.walpay.android.module.request;

/**
 * 发送注册的短信验证码参数
 */
public class SendRegisterCodeRequestBean extends BaseRequest {
    /**
     * 手机号
     */
    private String phone;

    public SendRegisterCodeRequestBean(String phone) {
        this.phone = phone;
    }

    public String getPhone() {
        return this.phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
