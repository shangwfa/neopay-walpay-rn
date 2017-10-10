package cn.neopay.walpay.android.module.response;

/**
 * 付款方式
 */
public class RecentPayTypeResponseBean extends BaseResponse {
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
}
