package cn.neopay.walpay.android.module.request;

/**
 * 获取手机充值产品列表参数
 */
public class QueryPhoneRechargeProductListRequestBean extends BaseRequest {
	/**
	 * 手机号
	 */
	private String phone;
	/**
	 * 充值产品类型
	 */
	private Integer productType;


	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Integer getProductType() {
		return this.productType;
	}

	public void setProductType(Integer productType) {
		this.productType = productType;
	}
}
