package cn.neopay.walpay.android.module.response;

import java.math.BigDecimal;

/**
 * 获取用户当日可充值信息结果
 */
public class BankCardRechargeableInfoResponseBean extends BaseResponse {
	/**
	 * 单日充值金额限额
	 */
	private BigDecimal dayLimit;
	/**
	 * 单月充值金额限额
	 */
	private BigDecimal monthLimit;
	/**
	 * 可充值金额
	 */
	private BigDecimal rechargeableAmount;


	public BigDecimal getDayLimit() {
		return this.dayLimit;
	}

	public void setDayLimit(BigDecimal dayLimit) {
		this.dayLimit = dayLimit;
	}

	public BigDecimal getMonthLimit() {
		return this.monthLimit;
	}

	public void setMonthLimit(BigDecimal monthLimit) {
		this.monthLimit = monthLimit;
	}

	public BigDecimal getRechargeableAmount() {
		return this.rechargeableAmount;
	}

	public void setRechargeableAmount(BigDecimal rechargeableAmount) {
		this.rechargeableAmount = rechargeableAmount;
	}
}
