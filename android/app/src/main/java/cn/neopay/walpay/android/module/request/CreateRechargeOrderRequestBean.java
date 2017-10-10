package cn.neopay.walpay.android.module.request;

import java.math.BigDecimal;

/**
 * 充值参数
 */
public class CreateRechargeOrderRequestBean extends BaseRequest {
	/**
	 * 银行卡id
	 */
	private Long bankCardId;
	/**
	 * 充值金额
	 */
	private BigDecimal rechargeAmount;


	public Long getBankCardId() {
		return this.bankCardId;
	}

	public void setBankCardId(Long bankCardId) {
		this.bankCardId = bankCardId;
	}

	public BigDecimal getRechargeAmount() {
		return this.rechargeAmount;
	}

	public void setRechargeAmount(BigDecimal rechargeAmount) {
		this.rechargeAmount = rechargeAmount;
	}
}
