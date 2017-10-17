package cn.neopay.walpay.android.manager.environmentmanager;

import com.xgjk.common.lib.manager.storage.StoreManager;

import cn.neopay.walpay.android.constans.IWalpayConstants;

import static cn.neopay.walpay.android.constans.IWalpayConstants.DEVELOP_TAG;
import static cn.neopay.walpay.android.constans.IWalpayConstants.MOCK_TAG;
import static cn.neopay.walpay.android.constans.IWalpayConstants.PRODUCT_TAG;
import static cn.neopay.walpay.android.constans.IWalpayConstants.TEST_TAG;

/**
 * @author carlos.guo
 * @date 2017/9/21
 * @describe Environment Config Manager
 */

public class EnvironmentConfigManager implements IEnvironmentConfigManager {
    private ApplicationEnvironment env;

    private static EnvironmentConfigManager singleton;

    private EnvironmentConfigManager() {
    }

    public static EnvironmentConfigManager getSingleton() {
        if (singleton == null) {
            synchronized (EnvironmentConfigManager.class) {
                if (singleton == null) {
                    singleton = new EnvironmentConfigManager();
                }
            }
        }
        return singleton;
    }

    @Override
    public ApplicationEnvironment getCurrentEnvironment() {
        if (null == env) {
            String envId = StoreManager.getSingleton().getString(false, IWalpayConstants.HTTP_URL_KEY, PRODUCT_TAG);
            this.env = parseCurrentEnvironment(envId);
        }
        return env;
    }

    @Override
    public void setCurrentEnvironment(ApplicationEnvironment env) {
        this.env = env;
        switch (env) {
            case TEST:
                StoreManager.getSingleton().putString(false, IWalpayConstants.HTTP_URL_KEY, TEST_TAG);
                break;
            case DEVELOP:
                StoreManager.getSingleton().putString(false, IWalpayConstants.HTTP_URL_KEY, DEVELOP_TAG);
                break;
            case PRODUCT:
                StoreManager.getSingleton().putString(false, IWalpayConstants.HTTP_URL_KEY, PRODUCT_TAG);
                break;
            case MOCK:
                StoreManager.getSingleton().putString(false, IWalpayConstants.HTTP_URL_KEY, MOCK_TAG);
                break;
            default:
                break;
        }
    }

    @Override
    public ApplicationEnvironment parseCurrentEnvironment(String id) {
        switch (id) {
            case TEST_TAG:
                return ApplicationEnvironment.TEST;// 测试环境
            case DEVELOP_TAG:
                return ApplicationEnvironment.DEVELOP;// 开发环境
            case MOCK_TAG:
                return ApplicationEnvironment.MOCK;//mock环境
            case PRODUCT_TAG:
            default:
                return ApplicationEnvironment.PRODUCT;// 线上环境
        }
    }


    @Override
    public String getCurrentEnvHttpUrl() {
        return getCurrentEnvHttpUrl(getCurrentEnvironment());
    }

    @Override
    public String getCurrentEnvHttpUrl(ApplicationEnvironment env) {
        switch (env) {
            case TEST:
                return IWalpayConstants.BASE_HTTPURL_TEST;
            case DEVELOP:
                return IWalpayConstants.BASE_HTTPURL_DEVELOP;
            case MOCK:
                return IWalpayConstants.BASE_HTTPURL_MOCK;
            case PRODUCT:
            default:
                return IWalpayConstants.BASE_HTTPURL_PRODUCT;
        }
    }

    @Override
    public String getCurrentEnvBuglyId() {
        return getCurrentEnvBuglyId(getCurrentEnvironment());
    }

    @Override
    public String getCurrentEnvBuglyId(ApplicationEnvironment env) {
        switch (env) {
            case TEST:
                return IWalpayConstants.BUGLY_APP_ID_TEST;
            case DEVELOP:
                return IWalpayConstants.BUGLY_APP_ID_DEVELOP;
            case PRODUCT:
            default:
                return IWalpayConstants.BUGLY_APP_ID_PRODUCT;
        }
    }

    @Override
    public String getCurrentEnvType() {
        switch (this.env) {
            case TEST:
                return IWalpayConstants.TEST_TAG;
            case DEVELOP:
                return IWalpayConstants.DEVELOP_TAG;
            case MOCK:
                return IWalpayConstants.MOCK_TAG;
            case PRODUCT:
            default:
                return IWalpayConstants.PRODUCT_TAG;
        }
    }
}
