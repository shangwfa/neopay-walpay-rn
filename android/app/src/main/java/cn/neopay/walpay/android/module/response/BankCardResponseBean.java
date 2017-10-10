package cn.neopay.walpay.android.module.response;

/**
 * 银行卡
 */
public class BankCardResponseBean extends BaseResponse {
	/**
	 * 银行卡id
	 */
	private Long bankCardId;
	/**
	 * 银行代号
	 */
	private String bankCode;
	/**
	 * 银行名称
	 */
	private String bankName;
	/**
	 * 银行卡号
	 */
	private String bankCardNo;
	/**
	 * 银行卡类型
	 */
	private Integer bankCardType;
	/**
	 * 银行图标地址
	 */
	private String iconUrl;


	public Long getBankCardId() {
		return this.bankCardId;
	}

	public void setBankCardId(Long bankCardId) {
		this.bankCardId = bankCardId;
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

	public String getBankCardNo() {
		return this.bankCardNo;
	}

	public void setBankCardNo(String bankCardNo) {
		this.bankCardNo = bankCardNo;
	}

	public Integer getBankCardType() {
		return this.bankCardType;
	}

	public void setBankCardType(Integer bankCardType) {
		this.bankCardType = bankCardType;
	}

	public String getIconUrl() {
		return this.iconUrl;
	}

	public void setIconUrl(String iconUrl) {
		this.iconUrl = iconUrl;
	}
}
