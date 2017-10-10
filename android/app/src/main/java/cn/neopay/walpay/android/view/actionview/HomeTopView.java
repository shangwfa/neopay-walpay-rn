package cn.neopay.walpay.android.view.actionview;

import android.content.Context;
import android.databinding.DataBindingUtil;
import android.support.annotation.AttrRes;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.widget.FrameLayout;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.databinding.HomeTopViewBinding;

/**
 * @author carlos.guo
 * @date 2017/10/9
 * @describe HomeTopView home页的上部分view
 */

public class HomeTopView extends FrameLayout {

    private HomeTopViewBinding mBinding;

    public HomeTopView(@NonNull Context context) {
        super(context);
        initView(context);
    }

    public HomeTopView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        initView(context);
    }

    public HomeTopView(@NonNull Context context, @Nullable AttributeSet attrs, @AttrRes int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        initView(context);
    }

    private void initView(Context context) {
        final LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        mBinding = DataBindingUtil.inflate(inflater, R.layout.home_top_view, null, false);
        addView(mBinding.getRoot());
        handleView();
    }

    private void handleView() {
        mBinding.homeSignIv.setOnClickListener(v -> {
            //TODO 跳转签到页面
        });

        mBinding.homeScanLl.setOnClickListener(v -> {
            //TODO 跳转扫一扫页面
        });

        mBinding.homePayCodeLl.setOnClickListener(v -> {
            //TODO 跳转收钱码页面
        });

        mBinding.homeBalanceLl.setOnClickListener(v -> {
            //TODO 跳转余额页面
        });
    }
}
