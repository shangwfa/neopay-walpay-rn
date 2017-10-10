package cn.neopay.walpay.android.module.request;

/**
 * 添加意见反馈参数
 */
public class AddFeedbackRequestBean extends BaseRequest {
	/**
	 * 手机号码
	 */
	private String phone;
	/**
	 * 反馈内容
	 */
	private String content;


	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}
}
