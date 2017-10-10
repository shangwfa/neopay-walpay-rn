package cn.neopay.walpay.android.module.request;

/**
 * 登录用户参数
 */
public class LoginUserRequestBean extends BaseRequest {
    /**
     * 手机号
     */
    private String phone;
    /**
     * 登录密码
     */
    private String password;

    /**
     * 终端
     */
    private Integer terminal;

    public LoginUserRequestBean(String phone, String password) {
        this.phone = phone;
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getTerminal() {
        return terminal;
    }

    public void setTerminal(Integer terminal) {
        this.terminal = terminal;
    }
}
