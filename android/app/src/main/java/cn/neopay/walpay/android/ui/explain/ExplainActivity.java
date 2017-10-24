package cn.neopay.walpay.android.ui.explain;

import com.alibaba.android.arouter.facade.annotation.Autowired;
import com.alibaba.android.arouter.facade.annotation.Route;
import com.xgjk.common.lib.base.BaseActivity;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.databinding.ActivityExplainLayoutBinding;

/**
 * @author carlos.guo
 * @date 2017/10/11
 * @describe ExplainActivity 说明页面 扫一扫说明
 */
@Route(path = IWalpayConstants.TO_EXPLAIN_PAGE)
public class ExplainActivity extends BaseActivity<ExplainPresenter, ActivityExplainLayoutBinding> implements ExplainContract.IView {
    @Autowired
    String titleType;

    @Override
    public int getLayoutId() {
        return R.layout.activity_explain_layout;
    }

    @Override
    public void initView() {
        mPageBinding.commonHeader.setHeaderLeftImg(String.format("%s使用说明", titleType));
    }
}
