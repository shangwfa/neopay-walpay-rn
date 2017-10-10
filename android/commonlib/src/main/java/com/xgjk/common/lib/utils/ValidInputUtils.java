package com.xgjk.common.lib.utils;

import android.content.Context;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by shangwf on 2017/4/29.
 */

public class ValidInputUtils {

    /**
     * 检查手机号有效性
     * 正则表达式："\\d{11}";
     *
     * @param phonenumber
     * @return 修改手机号校验的实现： 不为空，且位数为11则符合
     */
    public static boolean phoneFormat(String phonenumber) {
        if (phonenumber != null) {
            String patternStr = "(13\\d|14[57]|15[^4,\\D]|17[13678]|18\\d)\\d{8}|170[0589]\\d{7}";
            Pattern pattern = Pattern.compile(patternStr, Pattern.CASE_INSENSITIVE);
            Matcher matcher = pattern.matcher(phonenumber);
            return matcher.matches();
        } else {
            return false;
        }
    }

    /**
     * 检查登录密码的有效性
     *
     * @param password
     * @return
     */
    public static boolean isValididPassword(String password) {
        if (password != null) {
            Pattern pattern = Pattern.compile("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$", Pattern.CASE_INSENSITIVE);
            Matcher matcher = pattern.matcher(password);
            return matcher.matches();
        } else {
            return false;
        }
    }

    /**
     * 检查支付密码的有效性
     *
     * @param password
     * @return
     */
    public static boolean isValididPayPassword(String password) {
        if (password != null) {
            Pattern pattern = Pattern.compile("\\d{6}", Pattern.CASE_INSENSITIVE);
            Matcher matcher = pattern.matcher(password);
            return matcher.matches();
        } else {
            return false;
        }
    }
    /**
     * 检查支付密码的有效性
     *
     * @param password
     * @return
     */
    public static boolean isValididPayPasswordBetter(String password) {
        if (password != null) {
            String patternStr = "^(?=.*\\d+)(?!.*?([\\d])\\1{5})[\\d]{6}$";
            Pattern pattern = Pattern.compile(patternStr, Pattern.CASE_INSENSITIVE);
            Matcher matcher = pattern.matcher(password);
            return matcher.matches();
        } else {
            return false;
        }
    }

    /**
     * 检查字符串是否包含中文
     *
     * @param text
     * @return
     */
    public static boolean stringContainChinese(String text) {
        return (text.getBytes().length != text.length());
    }

    /**
     * 检查支付宝姓名的有效性
     *
     * @param alipayName
     * @return
     */
    public static boolean alipayNameFormat(String alipayName) {
        if (alipayName != null) {
            Pattern pattern = Pattern.compile("^[\\u4E00-\\u9FA5]{1,20}(?:·[\\u4E00-\\u9FA5]{1,20})*$", Pattern.CASE_INSENSITIVE);
            Matcher matcher = pattern.matcher(alipayName);
            return matcher.matches();
        } else {
            return false;
        }
    }

    /**
     * 检查邮箱的有效性
     *
     * @param alipayName
     * @return
     */
    public static boolean emailFormat(String alipayName) {
        if (alipayName != null) {
            Pattern pattern = Pattern.compile("^[A-Za-z0-9+]+[A-Za-z0-9\\.\\_\\-+]*@([A-Za-z0-9\\-]+\\.)+[A-Za-z0-9]+$", Pattern.CASE_INSENSITIVE);
            Matcher matcher = pattern.matcher(alipayName);
            return matcher.matches();
        } else {
            return false;
        }

    }

    /**
     * 检查身份证号的有效性
     * 规则： 15位纯数字
     * 18位纯数字 或者 17位数字，最后一位X/x
     *
     * @param input
     * @return
     */
    public static boolean isValididNumber(String input) {
        Pattern pattern = Pattern.compile("^(\\d{15}$|^\\d{18}$|^\\d{17}(\\d|X|x))$", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(input);
        return matcher.matches();
    }


    public static boolean isValidverfycode(String verfycode) {
        Pattern pattern = Pattern.compile("\\d{6}", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(verfycode);
        return matcher.matches();
    }


    public static boolean isValidePhone(String phone) {
        return ValidInputUtils.phoneFormat(phone);
    }


    /**
     * 提前字符串中的大写字符
     *
     * @param context
     * @param input   输入的字符串
     * @return
     */
    public static String getUpCase(Context context, String input) {
        StringBuilder result = new StringBuilder();
        Pattern pattern = Pattern.compile("[A-Z]");
        Matcher matcher = pattern.matcher(input);
        while (matcher.find()) {
            result.append(matcher.group());
        }
        return result.toString();
    }

    public static boolean isValideIdCars(String idCard) {
        Pattern pattern = Pattern.compile(ConstUtils.REGEX_IDCARD, Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(idCard);
        return matcher.matches();
    }


    public static boolean isCommonValide(String value, String regex) {
        Pattern pattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(value);
        return matcher.matches();
    }
}
