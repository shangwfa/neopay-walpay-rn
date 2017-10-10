package cn.neopay.walpay.android.http;

import com.xgjk.common.lib.utils.ToastUtils;

/**
 * Created by shangwf on 2017/5/16.
 */

public class ApiException extends RuntimeException {
    public final int retCode;
    public final String retMsg;
    private static boolean isShowToast = false;

    public ApiException(int retCode, String retMsg) {
        super(processCode(retCode, retMsg));
        this.retCode = retCode;
        this.retMsg = retMsg;
    }

    private static String processCode(int retCode, String retMsg) {
        isShowToast = true;
        switch (retCode) {
            default:
                break;
        }

        if (isShowToast) ToastUtils.show(retMsg);
        return retMsg;
    }
}
