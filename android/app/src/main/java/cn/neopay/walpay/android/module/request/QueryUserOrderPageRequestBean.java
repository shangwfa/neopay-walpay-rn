package cn.neopay.walpay.android.module.request;

/**
 * 查询用户账单记录参数
 */
public class QueryUserOrderPageRequestBean extends BaseRequest {
	/**
	 * 页码
	 */
	private Integer pageNo;
	/**
	 * 分页单位
	 */
	private Integer pageSize;
	/**
	 * 订单类型
	 */
	private Integer orderType;
	/**
	 * 收支方向
	 */
	private Integer direction;
	/**
	 * 起始时间
	 */
	private String startTime;
	/**
	 * 结束时间
	 */
	private String endTime;


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

	public Integer getOrderType() {
		return this.orderType;
	}

	public void setOrderType(Integer orderType) {
		this.orderType = orderType;
	}

	public Integer getDirection() {
		return this.direction;
	}

	public void setDirection(Integer direction) {
		this.direction = direction;
	}

	public String getStartTime() {
		return this.startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return this.endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
}
