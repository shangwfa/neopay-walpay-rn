package cn.neopay.walpay.android.module.request;

/**
 * 重置支付密码参数
 */
public class ResetPayPasswordRequestBean extends BaseRequest {
	/**
	 * 手机号
	 */
	private String phone;

	/**
	 * 短信验证码
	 */
	private String smsCode;
	/**
	 * 支付密码
	 */
	private String payPassword;
	/**
	 * 身份证号
	 */
	private String certNo;

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getCertNo() {
		return certNo;
	}

	public void setCertNo(String certNo) {
		this.certNo = certNo;
	}

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
