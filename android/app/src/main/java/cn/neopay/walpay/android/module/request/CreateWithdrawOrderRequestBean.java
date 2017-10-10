package cn.neopay.walpay.android.module.request;

import java.math.BigDecimal;

/**
 * 提现参数
 */
public class CreateWithdrawOrderRequestBean extends BaseRequest {
	/**
	 * 银行卡id
	 */
	private Long bankCardId;
	/**
	 * 提现金额
	 */
	private BigDecimal withdrawAmount;


	public Long getBankCardId() {
		return this.bankCardId;
	}

	public void setBankCardId(Long bankCardId) {
		this.bankCardId = bankCardId;
	}

	public BigDecimal getWithdrawAmount() {
		return this.withdrawAmount;
	}

	public void setWithdrawAmount(BigDecimal withdrawAmount) {
		this.withdrawAmount = withdrawAmount;
	}
}
