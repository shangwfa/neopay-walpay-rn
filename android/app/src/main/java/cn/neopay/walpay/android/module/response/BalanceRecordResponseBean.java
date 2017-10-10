package cn.neopay.walpay.android.module.response;

import java.math.BigDecimal;

/**
 * 获取余额交易记录结果
 */
public class BalanceRecordResponseBean extends BaseResponse {
	/**
	 * 订单号
	 */
	private String orderNo;
	/**
	 * 订单类型
	 */
	private Integer orderType;
	/**
	 * 标题
	 */
	private String title;
	/**
	 * 交易金额
	 */
	private BigDecimal amount;
	/**
	 * 余额
	 */
	private BigDecimal balance;
	/**
	 * 创建时间
	 */
	private String createTime;


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

	public BigDecimal getBalance() {
		return this.balance;
	}

	public void setBalance(BigDecimal balance) {
		this.balance = balance;
	}

	public String getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
}
