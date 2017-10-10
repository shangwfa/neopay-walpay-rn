package cn.neopay.walpay.android.module.request;

/**
 * 检查应用新版本参数
 */
public class CheckAppVersionRequestBean extends BaseRequest {
	/**
	 * 应用版本号
	 */
	private Integer versionNo;


	public Integer getVersionNo() {
		return this.versionNo;
	}

	public void setVersionNo(Integer versionNo) {
		this.versionNo = versionNo;
	}
}
