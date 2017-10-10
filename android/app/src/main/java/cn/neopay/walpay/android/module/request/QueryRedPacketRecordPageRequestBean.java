package cn.neopay.walpay.android.module.request;

/**
 * 红包交易明细参数
 */
public class QueryRedPacketRecordPageRequestBean extends BaseRequest {
	/**
	 * 页码
	 */
	private Integer pageNo;
	/**
	 * 分页单位
	 */
	private Integer pageSize;


	public Integer getPageNo() {
		return this.pageNo;
	}

	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}

	public Integer getPageSize() {
		return this.pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
}
