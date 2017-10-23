package cn.neopay.walpay.android.ui.backcard;

import com.xgjk.common.lib.base.BaseActivity;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.databinding.ActivityBackcardLayoutBinding;

/**
 * @author carlos.guo
 * @date 2017/9/28
 * @describe BackCard Activity 我的银行卡页面
 */

public class BackCardActivity extends BaseActivity<BackCardPresenter, ActivityBackcardLayoutBinding> implements BackCardContract.IView {
    @Override
    public int getLayoutId() {
        return R.layout.activity_backcard_layout;
    }

    @Override
    public void initView() {

    }
}
