package cn.neopay.walpay.android.module.response;

/**
 * 检查应用新版本结果
 */
public class AppVersionResponseBean extends BaseResponse {
	/**
	 * 更新类型
	 */
	private Integer updateType;
	/**
	 * 版本号
	 */
	private Integer versionNo;
	/**
	 * 版本名称
	 */
	private String versionName;
	/**
	 * 介绍
	 */
	private String description;
	/**
	 * 下载地址
	 */
	private String downloadUrl;


	public Integer getUpdateType() {
		return this.updateType;
	}

	public void setUpdateType(Integer updateType) {
		this.updateType = updateType;
	}

	public Integer getVersionNo() {
		return this.versionNo;
	}

	public void setVersionNo(Integer versionNo) {
		this.versionNo = versionNo;
	}

	public String getVersionName() {
		return this.versionName;
	}

	public void setVersionName(String versionName) {
		this.versionName = versionName;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDownloadUrl() {
		return this.downloadUrl;
	}

	public void setDownloadUrl(String downloadUrl) {
		this.downloadUrl = downloadUrl;
	}
}
