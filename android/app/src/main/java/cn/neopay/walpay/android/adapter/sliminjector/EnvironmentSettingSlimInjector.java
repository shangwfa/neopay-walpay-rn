package cn.neopay.walpay.android.adapter.sliminjector;

import android.view.View;

import com.xgjk.common.lib.adapter.slimadapter.SlimInjector;
import com.xgjk.common.lib.adapter.slimadapter.viewinjector.IViewInjector;
import com.xgjk.common.lib.manager.ActivityManager;
import com.xgjk.common.lib.utils.ToastUtils;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.manager.environmentmanager.EnvironmentConfigManager;
import cn.neopay.walpay.android.manager.environmentmanager.IEnvironmentConfigManager;
import cn.neopay.walpay.android.manager.routermanager.MainRouter;
import cn.neopay.walpay.android.module.sliminjector.EnvironmentSettingItemBean;
import cn.neopay.walpay.android.utils.BusniessUtils;

/**
 * @author carlos.guo
 * @date 2017/10/13
 * @describe EnvironmentSettingSlimInjector 环境配置 item
 */

public class EnvironmentSettingSlimInjector implements SlimInjector<EnvironmentSettingItemBean> {
    @Override
    public void onInject(EnvironmentSettingItemBean data, IViewInjector injector) {
        if (null == data) {
            return;
        }
        injector.text(R.id.pay_mode_tv, data.getCurrentEnvironment());
        String currentEnvType = EnvironmentConfigManager.getSingleton().getCurrentEnvType();
        injector.background(R.id.pay_mode_icon_iv, currentEnvType.equals(data.getEnvironmentType()) ? R.mipmap.img_state_selected : R.mipmap.img_state_unselected);
        injector.clicked(R.id.pay_mode_rl, v -> handleEnVironment(data, v));
    }

    private void handleEnVironment(EnvironmentSettingItemBean data, View v) {
        String environmentType = data.getEnvironmentType();
        switch (environmentType) {
            case IWalpayConstants.TEST_TAG:
                EnvironmentConfigManager.getSingleton().setCurrentEnvironment(IEnvironmentConfigManager.ApplicationEnvironment.TEST);
                break;
            case IWalpayConstants.DEVELOP_TAG:
                EnvironmentConfigManager.getSingleton().setCurrentEnvironment(IEnvironmentConfigManager.ApplicationEnvironment.DEVELOP);
                break;
            case IWalpayConstants.PRODUCT_TAG:
                EnvironmentConfigManager.getSingleton().setCurrentEnvironment(IEnvironmentConfigManager.ApplicationEnvironment.PRODUCT);
                break;
            case IWalpayConstants.MOCK_TAG:
                EnvironmentConfigManager.getSingleton().setCurrentEnvironment(IEnvironmentConfigManager.ApplicationEnvironment.MOCK);
                break;
        }
        ActivityManager.getInstance().killAllActivity();
        MainRouter.getSingleton().jumpToLoginPage(BusniessUtils.getUserName());
        ToastUtils.show(String.format("当前环境为：%s环境", data.getCurrentEnvironment()));
    }
}
