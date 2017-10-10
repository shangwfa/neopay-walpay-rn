package cn.neopay.walpay.android.module.request;

/**
 * 绑定银行卡参数
 */
public class BindBankCardRequestBean extends BaseRequest {
	/**
	 * 姓名
	 */
	private String name;
	/**
	 * 身份证号
	 */
	private String idCardNo;
	/**
	 * 银行卡号
	 */
	private String bankCardNo;
	/**
	 * 银行卡号
	 */
	private String bankCode;
	/**
	 * 预留手机号
	 */
	private String bindPhone;
	/**
	 * 短信验证码
	 */
	private String smsCode;


	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIdCardNo() {
		return this.idCardNo;
	}

	public void setIdCardNo(String idCardNo) {
		this.idCardNo = idCardNo;
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

	public String getBindPhone() {
		return this.bindPhone;
	}

	public void setBindPhone(String bindPhone) {
		this.bindPhone = bindPhone;
	}

	public String getSmsCode() {
		return this.smsCode;
	}

	public void setSmsCode(String smsCode) {
		this.smsCode = smsCode;
	}
}
