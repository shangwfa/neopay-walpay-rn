package cn.neopay.walpay.android.ui.fragment.newsfragment;

import com.xgjk.common.lib.base.BaseFragment;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.databinding.FragmentNewsLayoutBinding;

/**
 * @author carlos.guo
 * @date 2017/9/27
 * @describe NewsFragment 消息页
 */

public class NewsFragment extends BaseFragment<NewsFragmentPresenter, FragmentNewsLayoutBinding> implements NewsFragmentContract.IView {
    @Override
    public int getLayoutId() {
        return R.layout.fragment_news_layout;
    }

    @Override
    public void initView() {

    }
}
