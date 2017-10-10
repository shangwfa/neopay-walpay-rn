package cn.neopay.walpay.android.module.response;

import java.math.BigDecimal;

/**
 * 余额信息
 */
public class UserBalanceResponseBean extends BaseResponse {
	/**
	 * 可用金额
	 */
	private BigDecimal balance;
	/**
	 * 冻结金额
	 */
	private BigDecimal frozenBalance;


	public BigDecimal getBalance() {
		return this.balance;
	}

	public void setBalance(BigDecimal balance) {
		this.balance = balance;
	}

	public BigDecimal getFrozenBalance() {
		return this.frozenBalance;
	}

	public void setFrozenBalance(BigDecimal frozenBalance) {
		this.frozenBalance = frozenBalance;
	}
}
