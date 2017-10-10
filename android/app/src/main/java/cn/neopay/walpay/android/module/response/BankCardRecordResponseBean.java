package cn.neopay.walpay.android.module.response;

import java.math.BigDecimal;

/**
 * 银行卡交易记录
 */
public class BankCardRecordResponseBean extends BaseResponse {
	/**
	 * 订单号
	 */
	private String orderNo;
	/**
	 * 订单类型
	 */
	private Integer orderType;
	/**
	 * 订单类型描述
	 */
	private String orderTypeText;
	/**
	 * 标题
	 */
	private String title;
	/**
	 * 交易金额
	 */
	private BigDecimal amount;
	/**
	 * 创建时间
	 */
	private String createTime;
	/**
	 * 创建时间
	 */
	private Long createTimeMs;


	public String getOrderNo() {
		return this.orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public Integer getOrderType() {
		return this.orderType;
	}

	public void setOrderType(Integer orderType) {
		this.orderType = orderType;
	}

	public String getOrderTypeText() {
		return this.orderTypeText;
	}

	public void setOrderTypeText(String orderTypeText) {
		this.orderTypeText = orderTypeText;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public BigDecimal getAmount() {
		return this.amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
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
}
