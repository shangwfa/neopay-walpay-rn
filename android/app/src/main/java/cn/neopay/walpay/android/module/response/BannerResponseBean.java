package cn.neopay.walpay.android.module.response;

/**
 * 获取首页banner列表结果
 */
public class BannerResponseBean extends BaseResponse {
	/**
	 * 标题
	 */
	private String title;
	/**
	 * 图片地址
	 */
	private String imageUrl;
	/**
	 * 链接地址
	 */
	private String linkUrl;


	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getImageUrl() {
		return this.imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getLinkUrl() {
		return this.linkUrl;
	}

	public void setLinkUrl(String linkUrl) {
		this.linkUrl = linkUrl;
	}
}
