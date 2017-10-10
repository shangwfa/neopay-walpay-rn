package cn.neopay.walpay.android.module.response;

/**
 * 判断手机号是否注册结果
 */
public class VerifyRegisterPhoneResponseBean extends BaseResponse {
	/**
	 * 是否已经注册
	 */
	private Boolean registered;


	public Boolean getRegistered() {
		return this.registered;
	}

	public void setRegistered(Boolean registered) {
		this.registered = registered;
	}
}
