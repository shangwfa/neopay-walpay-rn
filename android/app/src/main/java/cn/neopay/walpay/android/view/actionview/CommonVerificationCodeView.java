package cn.neopay.walpay.android.view.actionview;

import android.app.Activity;
import android.content.Context;
import android.databinding.DataBindingUtil;
import android.support.annotation.AttrRes;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.widget.EditText;
import android.widget.FrameLayout;

import com.xgjk.common.lib.utils.Countdown;
import com.xgjk.common.lib.utils.ToastUtils;
import com.xgjk.common.lib.utils.ViewUtils;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.databinding.CommonVerificationCodeViewLayoutBinding;
import cn.neopay.walpay.android.http.BaseSubscriber;
import cn.neopay.walpay.android.manager.apimanager.ApiManager;
import cn.neopay.walpay.android.module.request.SendRegisterCodeRequestBean;
import cn.neopay.walpay.android.utils.InputCheckUtils;

/**
 * Created by shangwf on 2017/5/2.
 * CommonVerificationCodeView 通用的验证码view
 */

public class CommonVerificationCodeView extends FrameLayout {
    private CommonVerificationCodeViewLayoutBinding mBinding;

    public CommonVerificationCodeView(@NonNull Context context) {
        super(context);
        initView(context);
    }

    public CommonVerificationCodeView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        initView(context);
    }

    public CommonVerificationCodeView(@NonNull Context context, @Nullable AttributeSet attrs, @AttrRes int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        initView(context);
    }

    private void initView(Context context) {
        final LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        mBinding = DataBindingUtil.inflate(inflater, R.layout.common_verification_code_view_layout, null, false);
        final Countdown mCountdown = new Countdown(mBinding.verificationCode, "60s");
        mCountdown.setCountdownListener(new Countdown.CountdownListener() {
            @Override
            public void onStart() {
            }

            @Override
            public void onFinish() {
                if (null != mCallback) {
                    mCallback.callback(false);
                }
                ViewUtils.setBackground(mBinding.verificationCode, R.drawable.shape_verification_code_box);
                ViewUtils.setTextViewColor(mBinding.verificationCode, R.color.color_two_type);
            }

            @Override
            public void onUpdate(int currentRemainingSeconds) {
                mBinding.verificationCode.setText(String.format("%ds", currentRemainingSeconds));
            }
        });
        mBinding.getRoot().setOnClickListener((v) -> {
            if (null == mEditText) {
                ToastUtils.show("手机输入控件未设置");
                return;
            } else if (!InputCheckUtils.checkPhone(mEditText.getText().toString())) {
                return;
            }

            ApiManager.getSingleton().sendRegisterCode(new SendRegisterCodeRequestBean(mEditText.getText().toString()),
                    new BaseSubscriber((Activity) context, o ->
                            handleRegisterCode(mCountdown)
                            , false));

        });
        addView(mBinding.getRoot());
    }

    private void handleRegisterCode(Countdown mCountdown) {
        ToastUtils.show(getContext().getString(R.string.str_send_smscode));
        mCountdown.start();
        ViewUtils.setBackground(mBinding.verificationCode, R.drawable.shape_round_gray);
        ViewUtils.setTextViewColor(mBinding.verificationCode, R.color.common_white);
        if (null != mCallback) {
            mCallback.callback(true);
        }
    }


    private int codeType = 1;//默认注册

    public void setCodeType(int codeType) {
        this.codeType = codeType;
    }

    private EditText mEditText;

    public void setmEditText(EditText mEditText) {
        this.mEditText = mEditText;
    }

    private Callback mCallback;

    public void setmCallback(Callback mCallback) {
        this.mCallback = mCallback;
    }

    public interface Callback {
        void callback(boolean isStart);
    }
}
