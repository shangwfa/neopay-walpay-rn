package cn.neopay.walpay.android.module.response;

import java.math.BigDecimal;

/**
 * 获取我的中奖统计结果
 */
public class UserActivityStatisResponseBean extends BaseResponse {
	/**
	 * 参与活动次数
	 */
	private Integer joinActivityCount;
	/**
	 * 中奖次数
	 */
	private Integer winCount;
	/**
	 * 中奖金额
	 */
	private BigDecimal amount;
	/**
	 * 中奖新光币数量
	 */
	private Integer neocoin;
	/**
	 * 平台总共发布活动次数
	 */
	private Integer platformActivityCount;
	/**
	 * 奖池金额
	 */
	private BigDecimal poolAmount;
	/**
	 * 奖池新光币数量
	 */
	private Integer poolNeocoin;


	public Integer getJoinActivityCount() {
		return this.joinActivityCount;
	}

	public void setJoinActivityCount(Integer joinActivityCount) {
		this.joinActivityCount = joinActivityCount;
	}

	public Integer getWinCount() {
		return this.winCount;
	}

	public void setWinCount(Integer winCount) {
		this.winCount = winCount;
	}

	public BigDecimal getAmount() {
		return this.amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public Integer getNeocoin() {
		return this.neocoin;
	}

	public void setNeocoin(Integer neocoin) {
		this.neocoin = neocoin;
	}

	public Integer getPlatformActivityCount() {
		return this.platformActivityCount;
	}

	public void setPlatformActivityCount(Integer platformActivityCount) {
		this.platformActivityCount = platformActivityCount;
	}

	public BigDecimal getPoolAmount() {
		return this.poolAmount;
	}

	public void setPoolAmount(BigDecimal poolAmount) {
		this.poolAmount = poolAmount;
	}

	public Integer getPoolNeocoin() {
		return this.poolNeocoin;
	}

	public void setPoolNeocoin(Integer poolNeocoin) {
		this.poolNeocoin = poolNeocoin;
	}
}
