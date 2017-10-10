package cn.neopay.walpay.android.module.request;

/**
 * 重置支付密码参数
 */
public class ResetPayPasswordRequestBean extends BaseRequest {
	/**
	 * 短信验证码
	 */
	private String smsCode;
	/**
	 * 支付密码
	 */
	private String payPassword;


	public String getSmsCode() {
		return this.smsCode;
	}

	public void setSmsCode(String smsCode) {
		this.smsCode = smsCode;
	}

	public String getPayPassword() {
		return this.payPassword;
	}

	public void setPayPassword(String payPassword) {
		this.payPassword = payPassword;
	}
}
