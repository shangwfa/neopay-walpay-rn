package cn.neopay.walpay.android.module.response;

import java.math.BigDecimal;

/**
 * 获取红包限额结果
 */
public class RedPacketLimitResponseBean extends BaseResponse {
	/**
	 * 总金额最低限额
	 */
	private BigDecimal minAmount;
	/**
	 * 总金额最高限额
	 */
	private BigDecimal maxAmount;
	/**
	 * 总新光币最低限额
	 */
	private Integer minNeocoin;
	/**
	 * 总新光币最高限额
	 */
	private Integer maxNeocoin;


	public BigDecimal getMinAmount() {
		return this.minAmount;
	}

	public void setMinAmount(BigDecimal minAmount) {
		this.minAmount = minAmount;
	}

	public BigDecimal getMaxAmount() {
		return this.maxAmount;
	}

	public void setMaxAmount(BigDecimal maxAmount) {
		this.maxAmount = maxAmount;
	}

	public Integer getMinNeocoin() {
		return this.minNeocoin;
	}

	public void setMinNeocoin(Integer minNeocoin) {
		this.minNeocoin = minNeocoin;
	}

	public Integer getMaxNeocoin() {
		return this.maxNeocoin;
	}

	public void setMaxNeocoin(Integer maxNeocoin) {
		this.maxNeocoin = maxNeocoin;
	}
}
