package cn.neopay.walpay.android.module.response;

/**
 * @author carlos.guo
 * @date 2017/9/21
 * @describe
 */

public class LoginResponseBean extends BaseResponse {
    private String accessToken;
    private String uuid;
    private String userName;
    private String phone;
    private String status;

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "LoginResponseBean{" +
                "accessToken='" + accessToken + '\'' +
                ", uuid='" + uuid + '\'' +
                ", userName='" + userName + '\'' +
                ", phone='" + phone + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
