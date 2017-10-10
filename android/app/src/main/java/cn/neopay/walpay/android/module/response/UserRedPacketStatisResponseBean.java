package cn.neopay.walpay.android.module.response;

import java.math.BigDecimal;

/**
 * 用户红包统计
 */
public class UserRedPacketStatisResponseBean extends BaseResponse {
	/**
	 * 领取红包数量
	 */
	private Integer receiveCount;
	/**
	 * 领取红包金额
	 */
	private BigDecimal receiveAmount;
	/**
	 * 领取新光币数量
	 */
	private Integer receiveNeocoin;
	/**
	 * 发送红包数量
	 */
	private Integer sendCount;
	/**
	 * 发送红包金额
	 */
	private BigDecimal sendAmount;
	/**
	 * 发送新光币数量
	 */
	private Integer sendNeocoin;
	/**
	 * 是否是最佳手气
	 */
	private Boolean best;


	public Integer getReceiveCount() {
		return this.receiveCount;
	}

	public void setReceiveCount(Integer receiveCount) {
		this.receiveCount = receiveCount;
	}

	public BigDecimal getReceiveAmount() {
		return this.receiveAmount;
	}

	public void setReceiveAmount(BigDecimal receiveAmount) {
		this.receiveAmount = receiveAmount;
	}

	public Integer getReceiveNeocoin() {
		return this.receiveNeocoin;
	}

	public void setReceiveNeocoin(Integer receiveNeocoin) {
		this.receiveNeocoin = receiveNeocoin;
	}

	public Integer getSendCount() {
		return this.sendCount;
	}

	public void setSendCount(Integer sendCount) {
		this.sendCount = sendCount;
	}

	public BigDecimal getSendAmount() {
		return this.sendAmount;
	}

	public void setSendAmount(BigDecimal sendAmount) {
		this.sendAmount = sendAmount;
	}

	public Integer getSendNeocoin() {
		return this.sendNeocoin;
	}

	public void setSendNeocoin(Integer sendNeocoin) {
		this.sendNeocoin = sendNeocoin;
	}

	public Boolean getBest() {
		return this.best;
	}

	public void setBest(Boolean best) {
		this.best = best;
	}
}
