package com.xgjk.common.lib.utils;

import com.orhanobut.logger.Logger;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

import static com.xgjk.common.lib.utils.DateUtils.getCalendar;

/**
 * Created by shangwf on 2017/4/29.
 */

public class FormatUtils {

    public static String getTwoDecimalPlaces(final double value) {
        final DecimalFormat df = new DecimalFormat("#0.00");
        return df.format(value);
    }

    public static String getTwoDecimalPlaces(final String value) {
        final DecimalFormat df = new DecimalFormat("#0.00");
        return df.format(MathUtils.strTodouble(value));
    }

    public static String phoneTuomin(String phone) {
        if (null == phone) {
            return "";
        }

        if (11 == phone.length()) {
            return phone.substring(0, 3) + "****" + phone.substring(7, 11);
        } else {
            return "";
        }
    }

    public static String nameTuomin(String name) {
        if (null == name) {
            return "";
        }

        if (name.length() > 2) {
            return "*" + name.substring(1, name.length() - 1);
        } else {
            return "";
        }
    }

    public static String timeYYMMDD(Date date) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        return format.format(date);
    }

    public static String timeYYMMDDHHMM(Date date) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        return format.format(date);
    }

    public static String time(Date date) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        return format.format(date);
    }

    public static String timestampToYYMMDDHHMM(long timestamp) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        sdf.setTimeZone(TimeZone.getTimeZone("GMT+8"));
        return sdf.format(timestamp);
    }

    public static String today() {
        Calendar cal = getCalendar();
        return timeYYMMDD(cal.getTime());
    }

    public static String yesterday() {
        Calendar cal = getCalendar();
        cal.add(Calendar.DATE, -1);
        return timeYYMMDD(cal.getTime());
    }

    public static String past6Day() {
        Calendar cal = getCalendar();
        cal.add(Calendar.DATE, -7);
        return timeYYMMDD(cal.getTime());
    }

    public static String past29Day() {
        Calendar cal = getCalendar();
        cal.add(Calendar.DATE, -30);
        return timeYYMMDD(cal.getTime());
    }

    /**
     * 隐藏手机中间4位号码
     * 130****0000
     *
     * @param mobile_phone 手机号码
     * @return 130****0000
     */
    public static String hideMobilePhone4(String mobile_phone) {
        return mobile_phone.substring(0, 3) + "****" + mobile_phone.substring(7, 11);
    }

    public static String uploadOssImgUrl(String fileTemplateUrl, String bucket, String directory, String fileName) {
        //http://${bucket}.oss-cn-shanghai.aliyuncs.com/${directory}${fileName}
        String result = fileTemplateUrl.replace("${bucket}", bucket).replace("${directory}", directory).replace("${fileName}", fileName);
        return result;
    }

    public static String getBankcardLast4Num(String bankcardNum) {
        if (StringUtils.isEmpty(bankcardNum)) return "";
        return bankcardNum.substring(bankcardNum.length() - 4, bankcardNum.length());
    }


    /**
     * 功能：如：100000       =>  10万
     * 100500      =>  100,500
     * <p/>
     * 100000000   =>10,000万
     * s输入金额     len保留小数点位数
     */

    public static String formatMoney(String s) {
        String postfix = "";
        if (s == null || s.length() < 1) {
            return "";
        }

        NumberFormat formater;
        double num = Double.parseDouble(s);
        if (num == 0) {
            return "0.00";
        }
        StringBuffer buff = new StringBuffer();
        if (num % 10000 == 0) {
            postfix = "万";
            num = num / 10000;
            buff.append("###,###");
        } else {
            buff.append("###,##0.00");
        }
        formater = new DecimalFormat(buff.toString());
        String result = formater.format(num);
        return result + postfix;
    }

    public static String formatMoney(double value) {
        return formatMoney(String.valueOf(value));
    }


    public static String lastFourBankNum(String bankNum) {
        if (StringUtils.isEmpty(bankNum)) return "";
        return bankNum.substring(bankNum.length() - 4, bankNum.length());
    }

    public static String cutoutDateStr(String date) {
        if (19 != date.length()) {
            return "";
        }
        return date.substring(5, date.length() - 3);
    }

    public static String moreLengthStr(String str, int maxlength) {
        int length = str.length();
        Logger.d("str->" + str.length());
        if (str.length() <= maxlength) {
            return str;
        } else {
            return str.substring(0, maxlength) + "...";
        }
    }
}
