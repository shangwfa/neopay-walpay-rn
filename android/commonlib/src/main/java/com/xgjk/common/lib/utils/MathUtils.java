package com.xgjk.common.lib.utils;

import java.math.BigDecimal;
import java.text.DecimalFormat;

/**
 * Created by shangwf on 2017/4/29.
 */

public class MathUtils {
    /**
     * doule数值过大时，防止显示为科学计数法
     */
    public static String doubleToStr(double d) {
        final DecimalFormat df = new DecimalFormat("0.##");
        df.setGroupingUsed(false);
        return df.format(d);
    }

    /**
     * 0--表示相等,1--表示d1大于d2,-1表示d1<d2
     */
    private static int doubleCompare(double d1, double d2) {
        double precision = 0.001;
        double result = d1 - d2;
        if (Math.abs(result) < precision) {
            return 0;
        } else if (result > precision) {
            return 1;
        } else {
            return -1;
        }
    }


    private static int doubleStrCompare(String d1, String d2) {
        double precision = 0.001;
        double result = strTodouble(d1) - strTodouble(d2);
        if (Math.abs(result) < precision) {
            return 0;
        } else if (result > precision) {
            return 1;
        } else {
            return -1;
        }
    }

    /**
     * 判断两个double值不相等
     */
    public static boolean noDoubleEqual(double d1, double d2) {
        return 0 != doubleCompare(d1, d2);
    }

    /**
     * 判断两个double字符串值相等
     */
    public static boolean doubleStrEqual(String d1, String d2) {
        return 0 == doubleStrCompare(d1, d2);
    }

    /**
     * 判断两个double值相等
     */
    public static boolean doubleEqual(double d1, double d2) {
        return 0 == doubleCompare(d1, d2);
    }

    /**
     * 判断是否是小数
     *
     * @param value
     * @return
     */
    public static boolean isPointNum(double value) {
        return value - (int) value > 0;
    }

    /**
     * 直接用double进行加减乘除会不精确
     * 提供精确的加法运算。
     *
     * @param v1 被加数
     * @param v2 加数
     * @return 两个参数的和
     */

    public static double add(double v1, double v2) {
        BigDecimal b1 = new BigDecimal(Double.toString(v1));
        BigDecimal b2 = new BigDecimal(Double.toString(v2));
        return b1.add(b2).doubleValue();
    }

    /**
     * 提供精确的减法运算。
     *
     * @param v1 被减数
     * @param v2 减数
     * @return 两个参数的差
     */

    public static double sub(double v1, double v2) {
        BigDecimal b1 = new BigDecimal(Double.toString(v1));
        BigDecimal b2 = new BigDecimal(Double.toString(v2));
        return b1.subtract(b2).doubleValue();
    }

    /**
     * 提供精确的乘法运算。
     *
     * @param v1 被乘数
     * @param v2 乘数
     * @return 两个参数的积
     */

    public static double mul(double v1, double v2) {
        BigDecimal b1 = new BigDecimal(Double.toString(v1));
        BigDecimal b2 = new BigDecimal(Double.toString(v2));
        return b1.multiply(b2).doubleValue();
    }

    public static double strTodouble(String str) {
        try {
            if(StringUtils.isEmpty(str)){
                return 0;
            }
            return Double.valueOf(str);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    public static Long strToLong(String str) {
        try {
            return Long.valueOf(str);
        } catch (Exception e) {
            e.printStackTrace();
            return 0L;
        }
    }
}
