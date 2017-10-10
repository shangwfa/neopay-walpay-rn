package cn.neopay.walpay.android.module.request;

/**
 * 添加分享记录参数
 */
public class AddShareRequestBean extends BaseRequest {
	/**
	 * 分享内容
	 */
	private String content;


	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}
}
