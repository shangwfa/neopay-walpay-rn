package cn.neopay.walpay.android.module.bean;

/**
 * @author carlos.guo
 * @date 2017/9/26
 * @describe Register Method Parameter Bean
 */

public class RegisterParameterBean {
    private String name;
    private String verification;
    private String loginPassword;
    private String payPwd;
    private boolean isProtocolSelected;

    public RegisterParameterBean(String name, String verification, String loginPassword, String payPwd, boolean isProtocolSelected) {
        this.name = name;
        this.verification = verification;
        this.loginPassword = loginPassword;
        this.payPwd = payPwd;
        this.isProtocolSelected = isProtocolSelected;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVerification() {
        return verification;
    }

    public void setVerification(String verification) {
        this.verification = verification;
    }

    public String getLoginPassword() {
        return loginPassword;
    }

    public void setLoginPassword(String loginPassword) {
        this.loginPassword = loginPassword;
    }

    public String getPayPwd() {
        return payPwd;
    }

    public void setPayPwd(String payPwd) {
        this.payPwd = payPwd;
    }

    public boolean isProtocolSelected() {
        return isProtocolSelected;
    }

    public void setProtocolSelected(boolean protocolSelected) {
        isProtocolSelected = protocolSelected;
    }
}
