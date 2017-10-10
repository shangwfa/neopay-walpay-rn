package cn.neopay.walpay.android.module.response;

import java.math.BigDecimal;

/**
 * 红包领取信息
 */
public class RedPacketReceiveResponseBean extends BaseResponse {
	/**
	 * 用户uuid
	 */
	private String uuid;
	/**
	 * 用户头像地址
	 */
	private String avatarUrl;
	/**
	 * 用户昵称
	 */
	private String nickName;
	/**
	 * 领取金额
	 */
	private BigDecimal amount;
	/**
	 * 领取新光币数量
	 */
	private Integer neocoin;
	/**
	 * 领取时间
	 */
	private String receiveTime;
	/**
	 * 领取时间
	 */
	private Long receiveTimeMs;


	public String getUuid() {
		return this.uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public String getAvatarUrl() {
		return this.avatarUrl;
	}

	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}

	public String getNickName() {
		return this.nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
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

	public String getReceiveTime() {
		return this.receiveTime;
	}

	public void setReceiveTime(String receiveTime) {
		this.receiveTime = receiveTime;
	}

	public Long getReceiveTimeMs() {
		return this.receiveTimeMs;
	}

	public void setReceiveTimeMs(Long receiveTimeMs) {
		this.receiveTimeMs = receiveTimeMs;
	}
}
