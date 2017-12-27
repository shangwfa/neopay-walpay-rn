package cn.neopay.walpay.android.ui.forgotpwd;

import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;

import com.alibaba.android.arouter.facade.annotation.Autowired;
import com.alibaba.android.arouter.facade.annotation.Route;
import com.xgjk.common.lib.base.BaseActivity;
import com.xgjk.common.lib.utils.ResUtils;
import com.xgjk.common.lib.utils.ViewUtils;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.databinding.ActivityForgotpwdLayoutBinding;
import cn.neopay.walpay.android.module.bean.ResetPwdParameterBean;
import cn.neopay.walpay.android.utils.BusniessUtils;
import cn.neopay.walpay.android.utils.InputCheckUtils;

/**
 * @author carlos.guo
 * @date 2017/9/26
 * @describe ForgotPwdActivity 忘记密码、重置密码页面
 */
@Route(path = IWalpayConstants.TO_FORGOTPWD_PAGE)
public class ForgotPwdActivity extends BaseActivity<ForgotPwdPresenter, ActivityForgotpwdLayoutBinding> implements ForgotPwdContract.IView {
    @Autowired
    public String userName;
    @Autowired
    public String forgotPwdType;

    @Override
    public int getLayoutId() {
        return R.layout.activity_forgotpwd_layout;
    }

    @Override
    public void initView() {
        ViewUtils.setEditTextValue(mViewBinding.commonInputPhone.getEditText(), userName);
        mViewBinding.commonInputPhone.setEnable(false);
        switch (forgotPwdType) {
            case IWalpayConstants.FORGOTPWD_TYPE_LOGIN:
                mPageBinding.commonHeader.setHeaderLeftImg("重置登录密码");
                mViewBinding.commonInputPassword.setInputData(IWalpayConstants.COMMONINPUTVIEW_TYPE_PASSWORD, ResUtils.getText(this, R.string.reset_setting_login_pwd_hint), R.mipmap.img_pwd_gray);
                mViewBinding.commonInputVerification.setVerificationCode(IWalpayConstants.VERIFICATION_CODE_TYPE_RESET_PWD);
                mViewBinding.commonRealMsg.setVisibility(View.GONE);
                break;
            case IWalpayConstants.FORGOTPWD_TYPE_PAY:
                mPageBinding.commonHeader.setHeaderLeftImg("重置支付密码");
                mViewBinding.commonInputPhone.getEditText().setText(BusniessUtils.getUserName());
                mViewBinding.commonInputPhone.getEditText().setEnabled(false);
                mViewBinding.commonInputPassword.setInputData(IWalpayConstants.COMMONINPUTVIEW_TYPE_PAY, "设置支付密码，6位数字", R.mipmap.img_pay_pwd);
                mViewBinding.commonInputVerification.setVerificationCode(IWalpayConstants.VERIFICATION_CODE_TYPE_RESET_PAY_PWD);
                mViewBinding.commonRealMsg.setVisibility(View.VISIBLE);
                mViewBinding.commonRealMsg.setInputData(IWalpayConstants.COMMONINPUTVIEW_TYPE_REAL_MSG, "请输入实名认证的身份证号", R.mipmap.img_id_card);
                break;
            default:
                break;
        }

        mViewBinding.commonInputPhone.setInputData(IWalpayConstants.COMMONINPUTVIEW_TYPE_PHONE, ResUtils.getText(this, R.string.str_input_phone), R.mipmap.img_phone_gray);
        mViewBinding.commonInputVerification.setInputData(IWalpayConstants.COMMONINPUTVIEW_TYPE_VERIFICATION_CODE, getString(R.string.str_input_smscode), R.mipmap.img_auth_code);
        mViewBinding.commonInputVerification.setPhoneEdit(mViewBinding.commonInputPhone.getEditText());
        handleViewClick();
    }

    private void handleViewClick() {
        mViewBinding.passwordBtn.setOnClickListener((v) -> {
            ResetPwdParameterBean resetPwdParameterBean = new ResetPwdParameterBean(forgotPwdType,
                    mViewBinding.commonInputPhone.getText(),
                    mViewBinding.commonInputVerification.getText(),
                    mViewBinding.commonInputPassword.getText(),
                    mViewBinding.commonRealMsg.getText());
            mPresenter.resetPassword(resetPwdParameterBean);
        });

        mViewBinding.commonInputPhone.getEditText().setOnFocusChangeListener((v, hasFocus) -> {
            if (!hasFocus) {
                String registerPhone = mViewBinding.commonInputPhone.getEditText().getText().toString();
                InputCheckUtils.checkPhone(registerPhone);
            }
        });

        mViewBinding.commonInputPassword.getEditText().addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                switch (forgotPwdType) {
                    case IWalpayConstants.FORGOTPWD_TYPE_LOGIN:
                        if (18 == s.length()) {
                            InputCheckUtils.checkPassword(s.toString());
                        }
//                        handleIsEnabled(s);
                        break;
                    case IWalpayConstants.FORGOTPWD_TYPE_PAY:
                        break;
                }
            }
        });
    }

    private void handleIsEnabled(Editable s) {
        if (6 <= s.length()) {
            mViewBinding.passwordBtn.setEnabled(true);
        } else {
            mViewBinding.passwordBtn.setEnabled(false);
        }
    }

    @Override
    public void finishActivity() {
        finish();
    }
}
