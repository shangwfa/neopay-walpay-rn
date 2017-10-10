package cn.neopay.walpay.android.module.response;

import java.math.BigDecimal;

/**
 * 红包交易明细
 */
public class RedPacketRecordResponseBean extends BaseResponse {
	/**
	 * 红包代号
	 */
	private String code;
	/**
	 * 来源类型
	 */
	private Integer originType;
	/**
	 * 红包类型
	 */
	private Integer packetType;
	/**
	 * 红包总金额
	 */
	private BigDecimal amount;
	/**
	 * 新光币总数
	 */
	private Integer neocoin;
	/**
	 * 创建时间
	 */
	private String createTime;
	/**
	 * 创建时间
	 */
	private Long createTimeMs;
	/**
	 * 是否是最佳手气
	 */
	private Boolean best;


	public String getCode() {
		return this.code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Integer getOriginType() {
		return this.originType;
	}

	public void setOriginType(Integer originType) {
		this.originType = originType;
	}

	public Integer getPacketType() {
		return this.packetType;
	}

	public void setPacketType(Integer packetType) {
		this.packetType = packetType;
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

	public String getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public Long getCreateTimeMs() {
		return this.createTimeMs;
	}

	public void setCreateTimeMs(Long createTimeMs) {
		this.createTimeMs = createTimeMs;
	}

	public Boolean getBest() {
		return this.best;
	}

	public void setBest(Boolean best) {
		this.best = best;
	}
}
