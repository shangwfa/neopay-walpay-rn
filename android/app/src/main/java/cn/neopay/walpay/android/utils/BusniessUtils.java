package cn.neopay.walpay.android.utils;

import com.orhanobut.logger.Logger;
import com.xgjk.common.lib.manager.storage.StoreManager;

import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;

/**
 * Created by shangwf on 2017/5/18.
 */

public class BusniessUtils {

    public static String getAccessToken() {
        final UserInfoResponseBean userInfoBean = StoreManager.getSingleton().get(true, IWalpayConstants.USER_INFO, UserInfoResponseBean.class);
        return null == userInfoBean ? "" : userInfoBean.getAccessToken();
    }

    public static String getUserName() {
        final UserInfoResponseBean userInfoBean = StoreManager.getSingleton().get(true, IWalpayConstants.USER_INFO, UserInfoResponseBean.class);
        return null == userInfoBean ? "" : userInfoBean.getPhone();
    }
}
