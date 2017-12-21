package cn.neopay.walpay.android.module.request;

/**
 * 发送重置登录密码短信验证码参数
 */
public class SendResetLoginPasswordCodeRequestBean extends BaseRequest {
	/**
	 * 手机号
	 */
	private String phone;

	public SendResetLoginPasswordCodeRequestBean(String phone) {
		this.phone = phone;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
}
