package cn.neopay.walpay.android.module.request;

/**
 * 获取余额交易月统计参数
 */
public class QueryBalanceStatisListRequestBean extends BaseRequest {
	/**
	 * 起始月份代号，yyyy-MM
	 */
	private String startMonthCode;
	/**
	 * 结束月份代号，yyyy-MM
	 */
	private String endMonthCode;


	public String getStartMonthCode() {
		return this.startMonthCode;
	}

	public void setStartMonthCode(String startMonthCode) {
		this.startMonthCode = startMonthCode;
	}

	public String getEndMonthCode() {
		return this.endMonthCode;
	}

	public void setEndMonthCode(String endMonthCode) {
		this.endMonthCode = endMonthCode;
	}
}
