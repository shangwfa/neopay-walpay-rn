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
import cn.neopay.walpay.android.databinding.HomeMiddleViewBinding;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;
import cn.neopay.walpay.android.ui.RNActivity;
import cn.neopay.walpay.android.utils.BusniessUtils;

/**
 * @author carlos.guo
 * @date 2017/10/9
 * @describe HomeMiddleView home页的中部分view
 */

public class HomeMiddleView extends FrameLayout {

    private HomeMiddleViewBinding mBinding;
    private UserInfoResponseBean mUserInfoBean;

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
        mBinding.homeCardBagLl.setOnClickListener(v -> RNActivity.jumpToRNPage(context, RNActivity.PageType.CARD_PACK_PAGE));

        mBinding.homeBigRedBagLl.setOnClickListener(v -> {
            BusniessUtils.handleCertification(context, mUserInfoBean, () -> {
                //TODO 跳转 大红包
            });
        });

        mBinding.homeRechargeLl.setOnClickListener(v -> {
//            BusniessUtils.handleCertification(context, mUserInfoBean, () -> {
//                //TODO 跳转 手机充值
//            });
            RNActivity.jumpToRNPage(context, RNActivity.PageType.PHONE_CHARGE_PAGE);
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

    public UserInfoResponseBean getmUserInfoBean() {
        return mUserInfoBean;
    }

    public void setmUserInfoBean(UserInfoResponseBean mUserInfoBean) {
        this.mUserInfoBean = mUserInfoBean;
    }

}
