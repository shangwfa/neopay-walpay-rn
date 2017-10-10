package cn.neopay.walpay.android.module.request;

/**
 * 注册用户参数
 */
public class RegisterUserRequestBean extends BaseRequest {
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
	/**
	 * 支付密码
	 */
	private String payPassword;


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

	public String getPayPassword() {
		return this.payPassword;
	}

	public void setPayPassword(String payPassword) {
		this.payPassword = payPassword;
	}
}
