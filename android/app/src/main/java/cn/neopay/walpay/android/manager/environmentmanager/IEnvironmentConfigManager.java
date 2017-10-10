package cn.neopay.walpay.android.manager.environmentmanager;

/**
 * @author carlos.guo
 * @date 2017/9/21
 * @describe IEnvironmentConfigManager  interface
 */

public interface IEnvironmentConfigManager {

    ApplicationEnvironment getCurrentEnvironment();
    void setCurrentEnvironment(ApplicationEnvironment env);

    ApplicationEnvironment parseCurrentEnvironment(String id);


    String getCurrentEnvHttpUrl();

    String getCurrentEnvHttpUrl(ApplicationEnvironment env);

    String getCurrentEnvBuglyId();

    String getCurrentEnvBuglyId(ApplicationEnvironment env);


    enum ApplicationEnvironment {
        TEST, DEVELOP, PRODUCT, UNKNOWN
    }
}
