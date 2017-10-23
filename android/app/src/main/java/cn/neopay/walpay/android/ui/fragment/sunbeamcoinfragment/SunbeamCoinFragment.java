package cn.neopay.walpay.android.ui.fragment.sunbeamcoinfragment;

import android.view.View;

import com.xgjk.common.lib.base.BaseFragment;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.databinding.FragmentSunbeamcoinLayoutBinding;

/**
 * @author carlos.guo
 * @date 2017/9/27
 * @describe SunbeamCoinFragment 新光币页
 */

public class SunbeamCoinFragment extends BaseFragment<SunbeamCoinFragmentPresenter, FragmentSunbeamcoinLayoutBinding> implements SunbeamCoinFragmentContract.IView {
    @Override
    public int getLayoutId() {
        return R.layout.fragment_sunbeamcoin_layout;
    }

    @Override
    public void initView() {
        mPageBinding.commonHeader.setVisibility(View.GONE);
    }
}
