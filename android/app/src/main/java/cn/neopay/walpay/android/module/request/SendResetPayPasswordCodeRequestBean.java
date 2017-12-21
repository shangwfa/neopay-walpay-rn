package cn.neopay.walpay.android.module.request;

/**
 * 发送重置支付密码验证码参数
 */
public class SendResetPayPasswordCodeRequestBean extends BaseRequest {
    /**
     * 手机号
     */
    private String phone;

    public SendResetPayPasswordCodeRequestBean(String phone) {
        this.phone = phone;
    }
}
