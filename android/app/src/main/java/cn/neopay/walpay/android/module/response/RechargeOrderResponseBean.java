package cn.neopay.walpay.android.module.response;

import cn.neopay.walpay.android.module.response.BaseResponse;

/**
 * 充值订单
 */
public class RechargeOrderResponseBean extends BaseResponse {
	/**
	 * 充值订单号
	 */
	private String orderNo;


	public String getOrderNo() {
		return this.orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
}
