package cn.neopay.walpay.android.module.request;

/**
 * 获取红包领取信息参数
 */
public class QueryRedPacketReceiveListRequestBean extends BaseRequest {
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
