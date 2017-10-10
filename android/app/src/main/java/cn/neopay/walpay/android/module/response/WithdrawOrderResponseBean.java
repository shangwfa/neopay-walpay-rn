package cn.neopay.walpay.android.module.response;

/**
 * 提现订单
 */
public class WithdrawOrderResponseBean extends BaseResponse {
	/**
	 * 提现订单号
	 */
	private String orderNo;


	public String getOrderNo() {
		return this.orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
}
