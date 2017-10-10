package cn.neopay.walpay.android.module.response;

import java.math.BigDecimal;

/**
 * 计算提现手续费结果
 */
public class WithdrawFeeResponseBean extends BaseResponse {
	/**
	 * 提现金额
	 */
	private BigDecimal withdrawAmount;
	/**
	 * 提现手续费
	 */
	private BigDecimal withdrawFee;


	public BigDecimal getWithdrawAmount() {
		return this.withdrawAmount;
	}

	public void setWithdrawAmount(BigDecimal withdrawAmount) {
		this.withdrawAmount = withdrawAmount;
	}

	public BigDecimal getWithdrawFee() {
		return this.withdrawFee;
	}

	public void setWithdrawFee(BigDecimal withdrawFee) {
		this.withdrawFee = withdrawFee;
	}
}
