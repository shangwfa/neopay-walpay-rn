package cn.neopay.walpay.android.module.response;

/**
 * 获取商户信息结果
 */
public class MerchantInfoResponseBean extends BaseResponse {
	/**
	 * 标题
	 */
	private String merchantName;


	public String getMerchantName() {
		return this.merchantName;
	}

	public void setMerchantName(String merchantName) {
		this.merchantName = merchantName;
	}
}
