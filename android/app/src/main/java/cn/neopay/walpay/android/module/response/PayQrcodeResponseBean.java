package cn.neopay.walpay.android.module.response;

/**
 * 创建付款码结果
 */
public class PayQrcodeResponseBean extends BaseResponse {
	/**
	 * 付款码内容
	 */
	private String content;


	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}
}
