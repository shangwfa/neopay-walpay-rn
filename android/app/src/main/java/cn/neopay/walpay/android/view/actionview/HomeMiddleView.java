package cn.neopay.walpay.android.view.actionview;

import android.content.Context;
import android.databinding.DataBindingUtil;
import android.support.annotation.AttrRes;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.widget.FrameLayout;

import com.xgjk.common.lib.utils.StringUtils;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.databinding.HomeMiddleViewBinding;
import cn.neopay.walpay.android.manager.routermanager.MainRouter;
import cn.neopay.walpay.android.module.activityParams.RNActivityParams;
import cn.neopay.walpay.android.utils.BusniessUtils;

/**
 * @author carlos.guo
 * @date 2017/10/9
 * @describe HomeMiddleView home页的中部分view
 */

public class HomeMiddleView extends FrameLayout {

    private HomeMiddleViewBinding mBinding;

    public HomeMiddleView(@NonNull Context context) {
        super(context);
        initView(context);
    }

    public HomeMiddleView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        initView(context);
    }

    public HomeMiddleView(@NonNull Context context, @Nullable AttributeSet attrs, @AttrRes int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        initView(context);
    }

    private void initView(Context context) {
        final LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        mBinding = DataBindingUtil.inflate(inflater, R.layout.home_middle_view, null, false);
        addView(mBinding.getRoot());
        handleView(context);
    }

    private void handleView(Context context) {
        mBinding.homeCardBagLl.setOnClickListener(v -> {
            //TODO 跳转 卡包
            RNActivityParams activityParams=new RNActivityParams();
            activityParams.setRnPage("splash");
            MainRouter.getSingleton().jumpToRNPage(v.getContext(),activityParams);
        });

        mBinding.homeBigRedBagLl.setOnClickListener(v -> {
            // //TODO 跳转 大红包
            BusniessUtils.handleCertification(context, () -> {
            });
        });

        mBinding.homeRechargeLl.setOnClickListener(v -> {
            //TODO 跳转 手机充值
            BusniessUtils.handleCertification(context, () -> {
            });
        });

        mBinding.homeSeasonsLl.setOnClickListener(v -> {
            //TODO 跳转 四季严选
        });

        mBinding.homeCateLl.setOnClickListener(v -> {
            //TODO 跳转 天下美食
        });


        mBinding.homeExpressLl.setOnClickListener(v -> {
            //TODO 跳转 快递跑腿
        });


        mBinding.homeEmployeeLoansLl.setOnClickListener(v -> {
            //TODO 跳转 员工贷款
        });

        mBinding.homeCreditCardLl.setOnClickListener(v -> {
            //TODO 跳转 信用卡申请
        });
    }
}
