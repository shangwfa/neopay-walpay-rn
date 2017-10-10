package cn.neopay.walpay.android.module.response;

/**
 * 创建红包结果
 */
public class RedPacketResponseBean extends BaseResponse {
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
