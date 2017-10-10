package cn.neopay.walpay.android.module.request;

/**
 * 修改用户信息参数
 */
public class ModifyUserInfoRequestBean extends BaseRequest {
	/**
	 * 昵称
	 */
	private String nickName;
	/**
	 * 头像地址
	 */
	private String avatarUrl;


	public String getNickName() {
		return this.nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getAvatarUrl() {
		return this.avatarUrl;
	}

	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}
}
