package cn.neopay.walpay.android.module.response;

/**
 * 注册用户结果
 */
public class RegisterUserResponseBean extends BaseResponse {
	/**
	 * 用户uuid
	 */
	private String uuid;


	public String getUuid() {
		return this.uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
}
