package cn.neopay.walpay.android.utils;

import com.xgjk.common.lib.utils.DateUtils;

import java.util.Date;

/**
 * @author carlos.guo
 * @date 2017/12/1
 * @describe
 */

public class DateHandle {
    /**
     * @param dataMs
     * @return 时间格式 11/26 11:20
     */
    public static String getMDHSTime(long dataMs) {
        return DateUtils.convertDate2String(new Date(dataMs), "mm-dd HH:mm").replace("-", "/");
    }
}
