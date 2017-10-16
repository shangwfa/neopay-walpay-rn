package cn.neopay.walpay.android.ui.environment;

import java.util.List;

import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.module.sliminjector.EnvironmentSettingItemBean;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe
 */

public class EnvironmentSettingPresenter extends EnvironmentSettingContract.Presenter {
    @Override
    public void requestEnSettingBean(List<Object> mData) {
        handleEnSettingBean(mData);
    }

    private void handleEnSettingBean(List<Object> mData) {
        EnvironmentSettingItemBean testBean = new EnvironmentSettingItemBean();
        testBean.setCurrentEnvironment("测试环境");
        testBean.setEnvironmentType(IWalpayConstants.TEST_TAG);

        EnvironmentSettingItemBean devBean = new EnvironmentSettingItemBean();
        devBean.setCurrentEnvironment("开发环境");
        devBean.setEnvironmentType(IWalpayConstants.DEVELOP_TAG);

        EnvironmentSettingItemBean productBean = new EnvironmentSettingItemBean();
        productBean.setCurrentEnvironment("线上环境");
        productBean.setEnvironmentType(IWalpayConstants.PRODUCT_TAG);

        EnvironmentSettingItemBean mockBean = new EnvironmentSettingItemBean();
        mockBean.setCurrentEnvironment("mock环境");
        mockBean.setEnvironmentType(IWalpayConstants.MOCK_TAG);

        mData.add(testBean);
        mData.add(devBean);
        mData.add(productBean);
        mData.add(mockBean);

        mView.updateData(mData);
    }
}
