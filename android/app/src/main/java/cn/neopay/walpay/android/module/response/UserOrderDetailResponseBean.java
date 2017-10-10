package cn.neopay.walpay.android.module.response;

import java.math.BigDecimal;

/**
 * 账单详情
 */
public class UserOrderDetailResponseBean extends BaseResponse {
	/**
	 * 订单号
	 */
	private String orderNo;
	/**
	 * 交易金额
	 */
	private BigDecimal amount;
	/**
	 * 新光币
	 */
	private Integer neocoin;
	/**
	 * 标题
	 */
	private String title;
	/**
	 * 图标地址
	 */
	private String iconUrl;
	/**
	 * 订单状态
	 */
	private Integer orderStatus;
	/**
	 * 订单状态描述
	 */
	private String orderStatusText;
	/**
	 * 订单类型
	 */
	private Integer orderType;
	/**
	 * 订单类型描述
	 */
	private String orderTypeText;
	/**
	 * 支付方式
	 */
	private Integer payType;
	/**
	 * 银行卡id
	 */
	private Long bankCardId;
	/**
	 * 银行卡号
	 */
	private String bankCardNo;
	/**
	 * 银行代号
	 */
	private String bankCode;
	/**
	 * 银行名称
	 */
	private String bankName;
	/**
	 * 备注
	 */
	private String remark;
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

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getIconUrl() {
		return this.iconUrl;
	}

	public void setIconUrl(String iconUrl) {
		this.iconUrl = iconUrl;
	}

	public Integer getOrderStatus() {
		return this.orderStatus;
	}

	public void setOrderStatus(Integer orderStatus) {
		this.orderStatus = orderStatus;
	}

	public String getOrderStatusText() {
		return this.orderStatusText;
	}

	public void setOrderStatusText(String orderStatusText) {
		this.orderStatusText = orderStatusText;
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

	public Integer getPayType() {
		return this.payType;
	}

	public void setPayType(Integer payType) {
		this.payType = payType;
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

	public String getBankCode() {
		return this.bankCode;
	}

	public void setBankCode(String bankCode) {
		this.bankCode = bankCode;
	}

	public String getBankName() {
		return this.bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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
