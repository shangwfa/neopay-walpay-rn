package cn.neopay.walpay.android.module.request;

/**
 * @author carlos.guo
 * @date 2017/9/21
 * @describe
 */

public class LoginRequestBean extends BaseRequest {
    private String username;
    private String password;

    public LoginRequestBean(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
