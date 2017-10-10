package cn.neopay.walpay.android.module.request;

/**
 * 获取我参与的活动列表参数
 */
public class QueryUserActivityPageRequestBean extends BaseRequest {
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
