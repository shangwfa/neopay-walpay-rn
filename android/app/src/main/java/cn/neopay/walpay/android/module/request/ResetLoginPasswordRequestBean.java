package cn.neopay.walpay.android.module.request;

/**
 * 重置登录密码参数
 */
public class ResetLoginPasswordRequestBean extends BaseRequest {
	/**
	 * 手机号
	 */
	private String phone;
	/**
	 * 短信验证码
	 */
	private String smsCode;
	/**
	 * 登录密码
	 */
	private String password;


	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getSmsCode() {
		return this.smsCode;
	}

	public void setSmsCode(String smsCode) {
		this.smsCode = smsCode;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
