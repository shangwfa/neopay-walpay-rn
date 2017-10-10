package cn.neopay.walpay.android.module.response;

/**
 * 红包主题
 */
public class RedPacketThemeResponseBean extends BaseResponse {
	/**
	 * 红包主题id
	 */
	private Long themeId;
	/**
	 * 红包主题图片地址
	 */
	private String imageUrl;


	public Long getThemeId() {
		return this.themeId;
	}

	public void setThemeId(Long themeId) {
		this.themeId = themeId;
	}

	public String getImageUrl() {
		return this.imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
}
