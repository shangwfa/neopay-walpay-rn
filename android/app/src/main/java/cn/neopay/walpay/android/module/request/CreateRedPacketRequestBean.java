package cn.neopay.walpay.android.module.request;

import java.math.BigDecimal;

/**
 * 创建红包参数
 */
public class CreateRedPacketRequestBean extends BaseRequest {
	/**
	 * 红包数量
	 */
	private Integer count;
	/**
	 * 红包类型
	 */
	private Integer packetType;
	/**
	 * 红包总金额
	 */
	private BigDecimal amount;
	/**
	 * 新光币数量
	 */
	private Integer neocoin;
	/**
	 * 红包主题id
	 */
	private Long themeId;
	/**
	 * 红包留言
	 */
	private String message;


	public Integer getCount() {
		return this.count;
	}

	public void setCount(Integer count) {
		this.count = count;
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

	public Long getThemeId() {
		return this.themeId;
	}

	public void setThemeId(Long themeId) {
		this.themeId = themeId;
	}

	public String getMessage() {
		return this.message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
