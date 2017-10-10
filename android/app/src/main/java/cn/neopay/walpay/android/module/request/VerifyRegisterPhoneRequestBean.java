package cn.neopay.walpay.android.module.request;

/**
 * 判断手机号是否注册参数
 */
public class VerifyRegisterPhoneRequestBean extends BaseRequest {
	/**
	 * 手机号
	 */
	private String phone;


	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
}
