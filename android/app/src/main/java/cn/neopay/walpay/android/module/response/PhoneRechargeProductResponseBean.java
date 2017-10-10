package cn.neopay.walpay.android.module.response;

import java.math.BigDecimal;

/**
 * 手机充值产品
 */
public class PhoneRechargeProductResponseBean extends BaseResponse {
	/**
	 * 充值产品id
	 */
	private Long productId;
	/**
	 * 充值产品类型
	 */
	private Integer productType;
	/**
	 * 充值产品名称
	 */
	private String name;
	/**
	 * 价格
	 */
	private BigDecimal price;
	/**
	 * 原价格
	 */
	private BigDecimal originPrice;


	public Long getProductId() {
		return this.productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public Integer getProductType() {
		return this.productType;
	}

	public void setProductType(Integer productType) {
		this.productType = productType;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public BigDecimal getPrice() {
		return this.price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public BigDecimal getOriginPrice() {
		return this.originPrice;
	}

	public void setOriginPrice(BigDecimal originPrice) {
		this.originPrice = originPrice;
	}
}
