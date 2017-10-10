package cn.neopay.walpay.android.module.response;

/**
 * 用户信息
 */
public class UserInfoResponseBean extends BaseResponse {
    /**
     * 用户uuid
     */
    private String uuid;
    /**
     * 手机号
     */
    private String phone;
    /**
     * 会员状态
     */
    private Integer userStatus;
    /**
     * 姓名
     */
    private String name;
    /**
     * 昵称
     */
    private String nickName;
    /**
     * 头像地址
     */
    private String avatarUrl;
    /**
     * 实名认证状态
     */
    private Integer authStatus;
    /**
     * 用户token
     */
    private String accessToken;

    public String getUuid() {
        return this.uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getPhone() {
        return this.phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Integer getUserStatus() {
        return this.userStatus;
    }

    public void setUserStatus(Integer userStatus) {
        this.userStatus = userStatus;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

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

    public Integer getAuthStatus() {
        return this.authStatus;
    }

    public void setAuthStatus(Integer authStatus) {
        this.authStatus = authStatus;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    @Override
    public String toString() {
        return "UserInfoResponseBean{" +
                "uuid='" + uuid + '\'' +
                ", phone='" + phone + '\'' +
                ", userStatus=" + userStatus +
                ", name='" + name + '\'' +
                ", nickName='" + nickName + '\'' +
                ", avatarUrl='" + avatarUrl + '\'' +
                ", authStatus=" + authStatus +
                ", accessToken='" + accessToken + '\'' +
                '}';
    }
}
