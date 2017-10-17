package cn.neopay.walpay.android.module.sliminjector;

/**
 * @author carlos.guo
 * @date 2017/10/13
 * @describe EnvironmentSettingItemBean 环境配置 item
 */

public class EnvironmentSettingItemBean {
    private String currentEnvironment;//测试 、开发 、线上 、mock本地
    private String EnvironmentType;//环境的类型
    private boolean isSelect;//是否选择


    public String getCurrentEnvironment() {
        return currentEnvironment;
    }

    public void setCurrentEnvironment(String currentEnvironment) {
        this.currentEnvironment = currentEnvironment;
    }

    public boolean isSelect() {
        return isSelect;
    }

    public void setSelect(boolean select) {
        isSelect = select;
    }

    public String getEnvironmentType() {
        return EnvironmentType;
    }

    public void setEnvironmentType(String environmentType) {
        EnvironmentType = environmentType;
    }
}
