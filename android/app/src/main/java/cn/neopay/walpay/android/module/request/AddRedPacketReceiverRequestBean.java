package cn.neopay.walpay.android.module.request;

/**
 * 添加红包领取人参数
 */
public class AddRedPacketReceiverRequestBean extends BaseRequest {
	/**
	 * 红包领取人手机号，多个手机号用逗号隔开
	 */
	private String phones;


	public String getPhones() {
		return this.phones;
	}

	public void setPhones(String phones) {
		this.phones = phones;
	}
}
