package cn.neopay.walpay.android.module.response;

import java.math.BigDecimal;

/**
 * 用户账单记录
 */
public class UserOrderResponseBean extends BaseResponse {
	/**
	 * 订单号
	 */
	private String orderNo;
	/**
	 * 标题
	 */
	private String title;
	/**
	 * 图标地址
	 */
	private String iconUrl;
	/**
	 * 交易金额
	 */
	private BigDecimal amount;
	/**
	 * 新光币数量
	 */
	private Integer neocoin;
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
	 * 创建时间
	 */
	private String createTime;


	public String getOrderNo() {
		return this.orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
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

	public String getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
}
