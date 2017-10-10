package cn.neopay.walpay.android.module.response;

import java.math.BigDecimal;

/**
 * 红包
 */
public class RecentRedPacketResponseBean extends BaseResponse {
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
	 * 红包领取状态
	 */
	private Integer receiveStatus;
	/**
	 * 红包数量
	 */
	private Integer count;
	/**
	 * 红包总金额
	 */
	private BigDecimal amount;
	/**
	 * 新光币总数
	 */
	private Integer neocoin;
	/**
	 * 红包留言
	 */
	private String message;
	/**
	 * 红包来源
	 */
	private String origin;
	/**
	 * 红包图片背景
	 */
	private String imageUrl;
	/**
	 * 创建时间
	 */
	private String createTime;
	/**
	 * 创建时间
	 */
	private Long createTimeMs;
	/**
	 * 更新时间
	 */
	private String updateTime;
	/**
	 * 更新时间
	 */
	private Long updateTimeMs;
	/**
	 * 当前用户是否已领取
	 */
	private Boolean received;


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

	public Integer getReceiveStatus() {
		return this.receiveStatus;
	}

	public void setReceiveStatus(Integer receiveStatus) {
		this.receiveStatus = receiveStatus;
	}

	public Integer getCount() {
		return this.count;
	}

	public void setCount(Integer count) {
		this.count = count;
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

	public String getMessage() {
		return this.message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getOrigin() {
		return this.origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	public String getImageUrl() {
		return this.imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
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

	public String getUpdateTime() {
		return this.updateTime;
	}

	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}

	public Long getUpdateTimeMs() {
		return this.updateTimeMs;
	}

	public void setUpdateTimeMs(Long updateTimeMs) {
		this.updateTimeMs = updateTimeMs;
	}

	public Boolean getReceived() {
		return this.received;
	}

	public void setReceived(Boolean received) {
		this.received = received;
	}
}
