package cn.neopay.walpay.android.module.response;

import java.math.BigDecimal;

/**
 * 余额交易月统计
 */
public class BalanceStatisResponseBean extends BaseResponse {
	/**
	 * 月份代号，yyyy-MM
	 */
	private String monthCode;
	/**
	 * 收入
	 */
	private BigDecimal income;
	/**
	 * 支出
	 */
	private BigDecimal expense;


	public String getMonthCode() {
		return this.monthCode;
	}

	public void setMonthCode(String monthCode) {
		this.monthCode = monthCode;
	}

	public BigDecimal getIncome() {
		return this.income;
	}

	public void setIncome(BigDecimal income) {
		this.income = income;
	}

	public BigDecimal getExpense() {
		return this.expense;
	}

	public void setExpense(BigDecimal expense) {
		this.expense = expense;
	}
}
