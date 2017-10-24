package cn.neopay.walpay.android.ui.environment;

import android.support.v7.widget.LinearLayoutManager;

import com.alibaba.android.arouter.facade.annotation.Route;
import com.xgjk.common.lib.adapter.slimadapter.SlimAdapter;
import com.xgjk.common.lib.base.BaseActivity;

import java.util.ArrayList;
import java.util.List;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.adapter.sliminjector.EnvironmentSettingSlimInjector;
import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.databinding.ActivityEnvironmentSettingLayoutBinding;

/**
 * @author carlos.guo
 * @date 2017/10/13
 * @describe EnvironmentSettingActivity app baseUrl 配置页面
 */
@Route(path = IWalpayConstants.TO_ENVIRONMENTSETTING_PAGE)
public class EnvironmentSettingActivity extends BaseActivity<EnvironmentSettingPresenter, ActivityEnvironmentSettingLayoutBinding> implements EnvironmentSettingContract.IView {

    private SlimAdapter mEnSettingAdapter;
    private List<Object> mData;

    @Override
    public int getLayoutId() {
        return R.layout.activity_environment_setting_layout;
    }

    @Override
    public void initView() {
        mPageBinding.commonHeader.setHeaderLeftImg("环境配置");
        LinearLayoutManager layoutManager = new LinearLayoutManager(this);
        layoutManager.setOrientation(LinearLayoutManager.VERTICAL);
        mEnSettingAdapter = SlimAdapter.create().register(R.layout.common_select_layout, new EnvironmentSettingSlimInjector());
        mViewBinding.environmentSettingRv.setLayoutManager(layoutManager);
        mViewBinding.environmentSettingRv.setAdapter(mEnSettingAdapter);
        mData = new ArrayList<>();
        mPresenter.requestEnSettingBean(mData);
    }

    @Override
    public void updateData(List<Object> mData) {
        mEnSettingAdapter.updateData(mData);
    }

    @Override
    public void finishActivity() {
        finish();
    }
}
