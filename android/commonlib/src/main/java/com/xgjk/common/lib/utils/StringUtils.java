package com.xgjk.common.lib.utils;

import com.xgjk.common.lib.base.BaseApp;

import java.util.ArrayList;
import java.util.regex.Pattern;

/**
 * Created by shangwf on 2017/4/29.
 */

public class StringUtils {
    public static boolean isBlank(String str) {

        return (null == str || str.trim().length() == 0);
    }

    public static boolean isEmpty(CharSequence str) {

        return (null == str || str.length() == 0);
    }

    public static boolean isEmpty(String string) {
        return null == string || "".equals(string.trim());
    }

    public static String authString(String str) {
        return null == str ? "" : str.trim();
    }

    public static boolean isNotEmpty(String string) {
        return !isEmpty(string);
    }

    public static boolean isNoEmpty(CharSequence str) {

        return !isEmpty(str);
    }

    public static int length(CharSequence str) {

        return null == str ? 0 : str.length();
    }

    /**
     * 把给定的字符串用给定的字符分割
     *
     * @param string 给定的字符串
     * @param ch     给定的字符
     * @return 分割后的字符串数组
     */
    public static String[] split(String string, char ch) {
        ArrayList<String> stringList = new ArrayList<String>();
        char chars[] = string.toCharArray();
        int nextStart = 0;
        for (int w = 0; w < chars.length; w++) {
            if (ch == chars[w]) {
                stringList.add(new String(chars, nextStart, w - nextStart));
                nextStart = w + 1;
                if (nextStart ==
                        chars.length) {    //当最后一位是分割符的话，就再添加一个空的字符串到分割数组中去
                    stringList.add("");
                }
            }
        }
        if (nextStart <
                chars.length) {    //如果最后一位不是分隔符的话，就将最后一个分割符到最后一个字符中间的左右字符串作为一个字符串添加到分割数组中去
            stringList.add(new String(chars, nextStart,
                    chars.length - 1 - nextStart + 1));
        }
        return stringList.toArray(new String[stringList.size()]);
    }

    /**
     * 计算给定的字符串的长度，计算规则是：一个汉字的长度为2，一个字符的长度为1
     *
     * @param string 给定的字符串
     * @return 长度
     */
    public static int countLength(String string) {
        int length = 0;
        char[] chars = string.toCharArray();
        for (int w = 0; w < string.length(); w++) {
            char ch = chars[w];
            if (ch >= '\u0391' && ch <= '\uFFE5') {
                length++;
                length++;
            } else {
                length++;
            }
        }
        return length;
    }

    /**
     * 删除Html标签
     *
     * @param inputString
     * @return
     */
    public static String htmlRemoveTag(String inputString) {
        if (inputString == null)
            return null;
        String htmlStr = inputString; // 含html标签的字符串
        String textStr = "";
        java.util.regex.Pattern p_script;
        java.util.regex.Matcher m_script;
        java.util.regex.Pattern p_style;
        java.util.regex.Matcher m_style;
        java.util.regex.Pattern p_html;
        java.util.regex.Matcher m_html;
        try {
            //定义script的正则表达式{或<script[^>]*?>[\\s\\S]*?<\\/script>
            String regEx_script = "<[\\s]*?script[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?script[\\s]*?>";
            //定义style的正则表达式{或<style[^>]*?>[\\s\\S]*?<\\/style>
            String regEx_style = "<[\\s]*?style[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?style[\\s]*?>";
            String regEx_html = "<[^>]+>"; // 定义HTML标签的正则表达式
            p_script = Pattern.compile(regEx_script, Pattern.CASE_INSENSITIVE);
            m_script = p_script.matcher(htmlStr);
            htmlStr = m_script.replaceAll(""); // 过滤script标签
            p_style = Pattern.compile(regEx_style, Pattern.CASE_INSENSITIVE);
            m_style = p_style.matcher(htmlStr);
            htmlStr = m_style.replaceAll(""); // 过滤style标签
            p_html = Pattern.compile(regEx_html, Pattern.CASE_INSENSITIVE);
            m_html = p_html.matcher(htmlStr);
            htmlStr = m_html.replaceAll(""); // 过滤html标签
            textStr = htmlStr;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return textStr;// 返回文本字符串
    }

    public static String getString(int resId) {
        return BaseApp.application.getString(resId);
    }


    public static boolean isNoEquals(String strOne, String strTwo) {
        return !strOne.equals(strTwo);
    }
}
