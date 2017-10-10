package cn.neopay.walpay.android.module.bean;

import java.io.Serializable;

/**
 * @author carlos.guo
 * @date 2017/9/21
 * @describe
 */

public class UserInfoBean implements Serializable {
    private String accessToken;
    private String uuid;//用户ID
    private String userName;
    private String phone;

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
}
