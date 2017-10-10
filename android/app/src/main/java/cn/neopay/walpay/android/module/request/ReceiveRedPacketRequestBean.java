package cn.neopay.walpay.android.module.request;

/**
 * 收红包参数
 */
public class ReceiveRedPacketRequestBean extends BaseRequest {
	/**
	 * 红包代号
	 */
	private String code;


	public String getCode() {
		return this.code;
	}

	public void setCode(String code) {
		this.code = code;
	}
}
