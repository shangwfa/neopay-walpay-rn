package cn.neopay.walpay.android.module.request;

/**
 * 查询账单详情参数
 */
public class GetUserOrderDetailRequestBean extends BaseRequest {
	/**
	 * 订单号
	 */
	private String orderNo;


	public String getOrderNo() {
		return this.orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
}
