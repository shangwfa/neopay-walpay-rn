package cn.neopay.walpay.android.module.response;

import java.math.BigDecimal;

/**
 * 查询我的资产结果
 */
public class UserAssetInfoResponseBean extends BaseResponse {
	/**
	 * 可用金额
	 */
	private BigDecimal balance;
	/**
	 * 冻结金额
	 */
	private BigDecimal frozenBalance;
	/**
	 * 新光币可用数量
	 */
	private Integer neocoinCount;
	/**
	 * 新光币冻结数量
	 */
	private Integer neocoinFrozenCount;


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

	public Integer getNeocoinCount() {
		return this.neocoinCount;
	}

	public void setNeocoinCount(Integer neocoinCount) {
		this.neocoinCount = neocoinCount;
	}

	public Integer getNeocoinFrozenCount() {
		return this.neocoinFrozenCount;
	}

	public void setNeocoinFrozenCount(Integer neocoinFrozenCount) {
		this.neocoinFrozenCount = neocoinFrozenCount;
	}
}
