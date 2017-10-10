package cn.neopay.walpay.android.module.request;

/**
 * 获取用户当日可充值信息参数
 */
public class GetBankCardRechargeableInfoRequestBean extends BaseRequest {
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
