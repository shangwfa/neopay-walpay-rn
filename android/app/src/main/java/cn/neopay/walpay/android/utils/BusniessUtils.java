package cn.neopay.walpay.android.utils;

import android.content.Context;
import android.text.TextUtils;

import com.xgjk.common.lib.manager.storage.StoreManager;

import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.manager.dialogmanager.DialogManager;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;
import cn.neopay.walpay.android.ui.RNActivity;

/**
 * Created by shangwf on 2017/5/18.
 */

public class BusniessUtils {

    private static UserInfoResponseBean userInfoBean;

    public static String getAccessToken() {
        return StoreManager.getSingleton().getString(false, IWalpayConstants.ACCESS_TOKEN, "");
    }

    public static String getUserName() {
        final UserInfoResponseBean userInfoBean = StoreManager.getSingleton().get(true, IWalpayConstants.USER_INFO, UserInfoResponseBean.class);
        return null == userInfoBean ? "" : userInfoBean.getPhone();
    }

    public static void handleCertification(Context context, UserInfoResponseBean userInfoBean, ICertificationCallBack iCertificationCallBack) {
        if (null == userInfoBean) {
            return;
        }

        if (null == userInfoBean.getAuthStatus() || 2 != userInfoBean.getAuthStatus()) { //未认证
            DialogManager.getSingleton().showCertificationDialog(context, () -> RNActivity.jumpToRNPage(context, RNActivity.PageType.BIND_BANK_CARD));
        } else {//认证
            iCertificationCallBack.authenticated();
        }
    }

    public interface ICertificationCallBack {
        void authenticated();
    }

    public ICertificationCallBack iCertificationCallBack;

    public void setCertificationCallBack(ICertificationCallBack iCertificationCallBack) {
        this.iCertificationCallBack = iCertificationCallBack;
    }

    public static String handleBankNickName(String bankName, String bankNum) {
        String bankNumStr = TextUtils.substring(bankNum, bankNum.length() - 4, bankNum.length());
        return String.format("%s(%s)", bankName, bankNumStr);
    }

    public static String handleBalanceNickName(String balanceName, String balanceNum) {
        return String.format("%s(%s)", balanceName, balanceNum);
    }
}
