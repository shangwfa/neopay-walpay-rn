package cn.neopay.walpay.android.module.bean;

import com.xgjk.common.lib.base.BaseApp;
import com.xgjk.common.lib.manager.storage.StoreManager;
import com.xgjk.common.lib.utils.DeviceUtils;

import cn.neopay.walpay.android.constans.IWalpayConstants;

/**
 * Created by shangwf on 2017/9/25.
 */

public class NetCommonParamsBean {
    private String loginTerminalType="1";
    private String deviceType= DeviceUtils.getBuildMANUFACTURER();
    private String deviceVersion=android.os.Build.VERSION.RELEASE;
    private String macUrl= DeviceUtils.getMacAddress(BaseApp.application);
    private String operator= DeviceUtils.getSimOperatorName(BaseApp.application);
    private String deviceId= DeviceUtils.getSerialNumber();
    private String accessToken= StoreManager.getSingleton().getString(false, IWalpayConstants.ACCESS_TOKEN,"");


    public String getLoginTerminalType() {
        return loginTerminalType;
    }

    public void setLoginTerminalType(String loginTerminalType) {
        this.loginTerminalType = loginTerminalType;
    }

    public String getDeviceType() {
        return deviceType;
    }

    public void setDeviceType(String deviceType) {
        this.deviceType = deviceType;
    }

    public String getDeviceVersion() {
        return deviceVersion;
    }

    public void setDeviceVersion(String deviceVersion) {
        this.deviceVersion = deviceVersion;
    }

    public String getMacUrl() {
        return macUrl;
    }

    public void setMacUrl(String macUrl) {
        this.macUrl = macUrl;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
