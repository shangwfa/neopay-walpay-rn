package cn.neopay.walpay.android.ui.fragment.homefragment;

import com.xgjk.common.lib.base.BaseFragment;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.databinding.FragmentHomeLayoutBinding;

/**
 * @author carlos.guo
 * @date 2017/9/27
 * @describe HomeFragment 首页
 */

public class HomeFragment extends BaseFragment<HomeFragmentPresenter, FragmentHomeLayoutBinding> implements HomeFragmentContract.IView {
    @Override
    public int getLayoutId() {
        return R.layout.fragment_home_layout;
    }

    @Override
    public void initView() {

    }
}
