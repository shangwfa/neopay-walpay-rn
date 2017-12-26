package cn.neopay.walpay.android.utils;

import com.xgjk.common.lib.utils.StringUtils;
import com.xgjk.common.lib.utils.ToastUtils;
import com.xgjk.common.lib.utils.ValidInputUtils;

import java.util.regex.Pattern;

/**
 * Created by shangwf on 2017/5/8.
 * InputCheckUtils 通用的输入的检测
 */

public class InputCheckUtils {
    public static boolean checkAuthStoreName(String name) {
        if (StringUtils.isEmpty(name)) {
            ToastUtils.show("店铺名称不能为空");
            return false;
        } else {
            return true;
        }
    }

    public static boolean checkStoreName(String name) {
        if (StringUtils.isEmpty(name)) {
            ToastUtils.show("店铺名称不能为空");
            return false;
        }
        if (name.length() > 8) {
            ToastUtils.show("最多可输入8个字符，请重新输入");
            return false;
        } else {
            return true;
        }
    }

    public static boolean checkName(String name) {
        if (StringUtils.isEmpty(name)) {
            ToastUtils.show("请设置姓名");
            return false;
        } else {
            return true;
        }
    }

    public static boolean checkIdCard(String idCard) {
        if (StringUtils.isEmpty(idCard)) {
            ToastUtils.show("身份证号不能为空");
            return false;
        } else if (ValidInputUtils.isValideIdCars(idCard)) {
            return true;
        } else {
            ToastUtils.show("身份证号不正确");
            return false;
        }
    }

    public static boolean checkBussinessLicense(String bussniessLicenes) {
        if (StringUtils.isEmpty(bussniessLicenes)) {
            ToastUtils.show("营业执照号不能为空");
            return false;
        } else {
            return true;
        }
    }

    public static boolean checkTaxCertificate(String taxCertificate) {
        if (StringUtils.isEmpty(taxCertificate)) {
            ToastUtils.show("税务登记证不能为空");
            return false;
        } else {
            return true;
        }
    }

    public static boolean checkCompanyName(String name) {
        if (StringUtils.isEmpty(name)) {
            ToastUtils.show("公司全称不能为空");
            return false;
        } else {
            return true;
        }
    }

    public static boolean checkLegalPersonName(String name) {
        if (StringUtils.isEmpty(name)) {
            ToastUtils.show("法人姓名不能为空");
            return false;
        } else {
            return true;
        }
    }

    public static boolean checkOrganizationCode(String code) {
        if (StringUtils.isEmpty(code)) {
            ToastUtils.show("组织机构代码不能为空");
            return false;
        } else {
            return true;
        }
    }

    public static boolean checkAccountLicence(String accountLicence) {
        if (StringUtils.isEmpty(accountLicence)) {
            ToastUtils.show("开户许可证不能为空");
            return false;
        } else {
            return true;
        }
    }

    public static boolean checkPhone(String phone) {
        if (StringUtils.isEmpty(phone)) {
            ToastUtils.show("请先输入手机号");
            return false;
        } else if (ValidInputUtils.isValidePhone(phone)) {
            return true;
        } else {
            ToastUtils.show("请输入正确的手机号");
            return false;
        }
    }

    public static boolean checkbranchBankCode(String branchBankCode) {
        if (StringUtils.isEmpty(branchBankCode)) {
            ToastUtils.show("选择开户银行");
            return false;
        } else {
            return true;
        }
    }

    public static boolean checkBankCardPhone(String phone) {
        if (StringUtils.isEmpty(phone)) {
            ToastUtils.show("银行预留账号不能为空");
            return false;
        } else if (ValidInputUtils.isValidePhone(phone)) {
            return true;
        } else {
            ToastUtils.show("请输入正确手机号");
            return false;
        }
    }

    public static boolean checkBankcard(String bankcard) {
        if (StringUtils.isEmpty(bankcard)) {
            ToastUtils.show("银行卡号不能为空");
            return false;
        } else {
            return true;
        }
    }

    public static boolean checkOpenAccountBankName(String bankcard) {
        if (StringUtils.isEmpty(bankcard)) {
            ToastUtils.show("选择开户银行地点");
            return false;
        } else {
            return true;
        }
    }

    public static boolean checkOpenAccountName(String name) {
        if (StringUtils.isEmpty(name)) {
            ToastUtils.show("开户姓名不能为空");
            return false;
        } else {
            return true;
        }
    }

    public static boolean checkVerificationCode(String verification) {
        if (StringUtils.isEmpty(verification)) {
            ToastUtils.show("请输入验证码");
            return false;
        } else if (ValidInputUtils.isValidverfycode(verification)) {
            return true;
        } else {
            ToastUtils.show("验证码错误，请重新获取");
            return false;
        }
    }

    public static boolean checkPassword(String password) {
        if (StringUtils.isEmpty(password)) {
            ToastUtils.show("密码不能为空");
            return false;
        } else if (ValidInputUtils.isValididPassword(password)) {
            return true;
        } else {
            ToastUtils.show("登录密码为6至18位字母加数字");
            return false;
        }
    }

    public static boolean checkNewPayPassword(String password) {
        if (StringUtils.isEmpty(password)) {
            ToastUtils.show("请设置新的支付密码");
            return false;
        } else if (6 > password.length()) {
            ToastUtils.show("支付密码支持6位数字");
            return false;
        } else if (ValidInputUtils.isValididPayPassword(password)) {
            return true;
        } else {
            ToastUtils.show("支付密码支持6位数字");
            return false;
        }
    }

    public static boolean checkNewPassword(String password) {
        if (StringUtils.isEmpty(password)) {
            ToastUtils.show("请设置新的登录密码");
            return false;
        } else if (ValidInputUtils.isValididPassword(password)) {
            return true;
        } else {
            ToastUtils.show("请输入8至20位字母加数字");
            return false;
        }
    }

    public static boolean checkOriginalPassword(String password) {
        if (StringUtils.isEmpty(password)) {
            ToastUtils.show("原始密码不能为空");
            return false;
        } else if (ValidInputUtils.isValididPassword(password)) {
            return true;
        } else {
            ToastUtils.show("登录密码支持6至18位字母加数字");
            return false;
        }
    }

    public static boolean checkLoginPassword(String password) {
        if (StringUtils.isEmpty(password)) {
            ToastUtils.show("请设置登录密码");
            return false;
        } else if (6 > password.length()) {
            ToastUtils.show("登录密码支持6至18位字母加数字");
            return false;
        } else if (ValidInputUtils.isValididPassword(password)) {
            return true;
        } else {
            ToastUtils.show("登录密码支持6至18位字母加数字");
            return false;
        }
    }

    public static boolean checkNickName(String nickName) {
        if (StringUtils.isEmpty(nickName)) {
            ToastUtils.show("请设置昵称");
            return false;
        } else if (nickName.length() > 8) {
            ToastUtils.show("最多可输入8个字符，请重新输入");
            return false;
        } else {
            return true;
        }

    }


    public static boolean checkPayPassword(String payPassword) {
        if (StringUtils.isEmpty(payPassword)) {
            ToastUtils.show("请设置支付密码");
            return false;
        } else if (ValidInputUtils.isValididPayPasswordBetter(payPassword)) {
            return true;
        } else {
            ToastUtils.show("支付密码为6位数字");
            return false;
        }
    }

    public static boolean checkMail(String mail) {
        if (StringUtils.isEmpty(mail)) {
            ToastUtils.show("请设置邮箱");
            return false;
        } else if (ValidInputUtils.emailFormat(mail)) {
            return true;
        } else {
            ToastUtils.show("请输入正确的邮箱");
            return false;
        }
    }

    public static boolean checkStrNoEquals(String strOne, String strTwo) {
        if (StringUtils.isNoEquals(strOne, strTwo)) {
            return true;
        }
        ToastUtils.show("原始密码和新密码不能相等");
        return false;
    }

    /**
     * 正则表达式:验证身份证
     */
    public static boolean checkIdCardNumber(String idCard) {
        final String REGEX_ID_CARD = "(^\\d{15}$)|(^\\d{17}([0-9]|X)$)";
        if (StringUtils.isEmpty(idCard)) {
            ToastUtils.show("请输入实名认证的身份证号");
            return false;
        }
        if (Pattern.matches(REGEX_ID_CARD, idCard)) {
            return true;
        } else {
            ToastUtils.show("请输入有效的身份证号");
            return false;
        }
    }


}
