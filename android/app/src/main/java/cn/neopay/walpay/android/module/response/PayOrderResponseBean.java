package cn.neopay.walpay.android.module.response;

/**
 * 创建支付订单结果
 */
public class PayOrderResponseBean extends BaseResponse {
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
