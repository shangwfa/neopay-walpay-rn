package cn.neopay.walpay.android.module.request;

/**
 * 解绑银行卡参数
 */
public class UnbindBankCardRequestBean extends BaseRequest {
	/**
	 * 银行卡id
	 */
	private Long bankCardId;


	public Long getBankCardId() {
		return this.bankCardId;
	}

	public void setBankCardId(Long bankCardId) {
		this.bankCardId = bankCardId;
	}
}
