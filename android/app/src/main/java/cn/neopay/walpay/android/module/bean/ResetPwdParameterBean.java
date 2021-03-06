package cn.neopay.walpay.android.module.bean;

/**
 * @author carlos.guo
 * @date 2017/9/27
 * @describe
 */

public class ResetPwdParameterBean {
    String forgotPwdType;
    String phone;
    String verificationCode;
    String newPassword;
    String realMsg;

    public ResetPwdParameterBean(String forgotPwdType, String phone, String verificationCode, String newPassword, String realMsg) {
        this.forgotPwdType = forgotPwdType;
        this.phone = phone;
        this.verificationCode = verificationCode;
        this.newPassword = newPassword;
        this.realMsg = realMsg;
    }

    public String getForgotPwdType() {
        return forgotPwdType;
    }

    public void setForgotPwdType(String forgotPwdType) {
        this.forgotPwdType = forgotPwdType;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getRealMsg() {
        return realMsg;
    }

    public void setRealMsg(String realMsg) {
        this.realMsg = realMsg;
    }
}
