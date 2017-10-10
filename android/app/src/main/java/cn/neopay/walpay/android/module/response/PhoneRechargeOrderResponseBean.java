package cn.neopay.walpay.android.module.response;

import java.math.BigDecimal;

/**
 * 手机充值订单
 */
public class PhoneRechargeOrderResponseBean extends BaseResponse {
	/**
	 * 订单号
	 */
	private String orderNo;
	/**
	 * 手机号
	 */
	private String phone;
	/**
	 * 充值产品名称
	 */
	private String productName;
	/**
	 * 支付金额
	 */
	private BigDecimal amount;
	/**
	 * 运营商类型
	 */
	private Integer operatorType;
	/**
	 * 支付方式
	 */
	private Integer payType;
	/**
	 * 支付方式描述
	 */
	private String payTypeText;
	/**
	 * 充值银行卡
	 */
	private Long bankCardId;
	/**
	 * 充值银行卡卡号
	 */
	private String bankCardNo;
	/**
	 * 手机充值订单状态
	 */
	private Integer status;
	/**
	 * 手机充值订单状态描述
	 */
	private String statusText;
	/**
	 * 订单创建时间
	 */
	private String createTime;
	/**
	 * 订单创建时间
	 */
	private Long createTimeMs;
	/**
	 * 订单更新时间
	 */
	private String updateTime;
	/**
	 * 订单更新时间
	 */
	private Long updateTimeMs;


	public String getOrderNo() {
		return this.orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getProductName() {
		return this.productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public BigDecimal getAmount() {
		return this.amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public Integer getOperatorType() {
		return this.operatorType;
	}

	public void setOperatorType(Integer operatorType) {
		this.operatorType = operatorType;
	}

	public Integer getPayType() {
		return this.payType;
	}

	public void setPayType(Integer payType) {
		this.payType = payType;
	}

	public String getPayTypeText() {
		return this.payTypeText;
	}

	public void setPayTypeText(String payTypeText) {
		this.payTypeText = payTypeText;
	}

	public Long getBankCardId() {
		return this.bankCardId;
	}

	public void setBankCardId(Long bankCardId) {
		this.bankCardId = bankCardId;
	}

	public String getBankCardNo() {
		return this.bankCardNo;
	}

	public void setBankCardNo(String bankCardNo) {
		this.bankCardNo = bankCardNo;
	}

	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getStatusText() {
		return this.statusText;
	}

	public void setStatusText(String statusText) {
		this.statusText = statusText;
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
}
