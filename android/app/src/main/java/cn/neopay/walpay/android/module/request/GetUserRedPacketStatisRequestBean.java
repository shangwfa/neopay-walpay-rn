package cn.neopay.walpay.android.module.request;

/**
 * 获取用户红包统计参数
 */
public class GetUserRedPacketStatisRequestBean extends BaseRequest {
	/**
	 * 月份代号，yyyy-MM，空表示全部
	 */
	private String monthCode;


	public String getMonthCode() {
		return this.monthCode;
	}

	public void setMonthCode(String monthCode) {
		this.monthCode = monthCode;
	}
}
