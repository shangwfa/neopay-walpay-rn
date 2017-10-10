package cn.neopay.walpay.android.module.request;

/**
 * 创建手机充值订单参数
 */
public class CreatePhoneRechargeOrderRequestBean extends BaseRequest {
	/**
	 * 手机号
	 */
	private String phone;
	/**
	 * 充值产品id
	 */
	private Long productId;
	/**
	 * 支付方式
	 */
	private Integer payType;
	/**
	 * 银行卡id
	 */
	private Long bankCardId;
	/**
	 * 支付密码
	 */
	private String payPassword;


	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Long getProductId() {
		return this.productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
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

	public String getPayPassword() {
		return this.payPassword;
	}

	public void setPayPassword(String payPassword) {
		this.payPassword = payPassword;
	}
}
