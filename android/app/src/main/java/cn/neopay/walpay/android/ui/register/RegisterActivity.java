package cn.neopay.walpay.android.ui.register;

import android.support.annotation.NonNull;
import android.text.TextPaint;
import android.text.style.ClickableSpan;
import android.view.View;

import com.alibaba.android.arouter.facade.annotation.Autowired;
import com.alibaba.android.arouter.facade.annotation.Route;
import com.xgjk.common.lib.base.BaseActivity;
import com.xgjk.common.lib.utils.ResUtils;
import com.xgjk.common.lib.utils.SpannableUtils;
import com.xgjk.common.lib.utils.ViewUtils;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.databinding.ActivityRegisterLayoutBinding;
import cn.neopay.walpay.android.module.bean.RegisterParameterBean;
import cn.neopay.walpay.android.module.request.VerifyRegisterPhoneRequestBean;
import cn.neopay.walpay.android.utils.InputCheckUtils;

/**
 * @author carlos.guo
 * @date 2017/9/26
 * @describe Register Activity 注册页面
 */
@Route(path = IWalpayConstants.TO_REGISTER_PAGE)
public class RegisterActivity extends BaseActivity<RegisterPresenter, ActivityRegisterLayoutBinding> implements RegisterContract.IView {

    @Autowired
    public String userName;
    private boolean isProtocolSelected;

    @Override
    public int getLayoutId() {
        return R.layout.activity_register_layout;
    }

    @Override
    public int getExceptionLayoutId() {
        return 0;
    }

    @Override
    public void initView() {
        setHeader();
        setViewInit();
        handlerViewClick();

    }

    private void handlerViewClick() {
        mViewBinding.registerPhone.getEditText().setOnFocusChangeListener((v, hasFocus) -> handleRegisterPhoneLostFocus(hasFocus));
        mViewBinding.registerBtn.setOnClickListener(v -> handleRegisterBtnClick());
        mViewBinding.registerAgreementCheckbox.setValue(SpannableUtils.getBuilder("我已同意并阅读")
                .append("《新光通宝用户服务协议》")
                .setClickSpan(getClickSpan())
                .create());
        mViewBinding.registerAgreementCheckbox.setCommonCallBack(isSelected -> isProtocolSelected = isSelected);
    }

    private void handleRegisterBtnClick() {
        RegisterParameterBean registerParameterBean = new RegisterParameterBean(mViewBinding.registerPhone.getText(),
                mViewBinding.registerVerification.getText(),
                mViewBinding.registerLoginPassword.getText(),
                mViewBinding.registerPayPwd.getText(),
                isProtocolSelected);
        mPresenter.register(registerParameterBean);
    }

    private void handleRegisterPhoneLostFocus(boolean hasFocus) {
        if (!hasFocus) {
            String registerPhone = mViewBinding.registerPhone.getEditText().getText().toString();
            if (InputCheckUtils.checkPhone(registerPhone)) {
                VerifyRegisterPhoneRequestBean requestBean = new VerifyRegisterPhoneRequestBean();
                requestBean.setPhone(registerPhone);
                mPresenter.verifyRegisterPhone(requestBean);
            }
        }
    }

    private void setViewInit() {
        ViewUtils.setEditTextValue(mViewBinding.registerPhone.getEditText(), userName);
        mViewBinding.registerPhone.setInputData(IWalpayConstants.COMMONINPUTVIEW_TYPE_PHONE, ResUtils.getText(this, R.string.str_input_phone), R.mipmap.img_phone_gray);
        mViewBinding.registerVerification.setInputData(IWalpayConstants.COMMONINPUTVIEW_TYPE_VERIFICATION_CODE, ResUtils.getText(this, R.string.verify_code_hint), R.mipmap.img_auth_code);
        mViewBinding.registerVerification.setPhoneEdit(mViewBinding.registerPhone.getEditText());
        mViewBinding.registerVerification.setVerificationCode(IWalpayConstants.VERIFICATION_CODE_TYPE_REGISTER);
        mViewBinding.registerLoginPassword.setInputData(IWalpayConstants.COMMONINPUTVIEW_TYPE_PASSWORD, ResUtils.getText(this, R.string.str_setting_login_pwd_hint), R.mipmap.img_pwd_gray);
        mViewBinding.registerPayPwd.setInputData(IWalpayConstants.COMMONINPUTVIEW_TYPE_PAYPWD, getString(R.string.str_settings_pay_pwd_hint), R.mipmap.img_pay_pwd);
        mViewBinding.registerBtn.setText(getString(R.string.str_common_register));
    }

    private void setHeader() {
        mPageBinding.commonHeader.setHeaderLeftImg(getString(R.string.str_common_register));
    }

    @Override
    public boolean isShowExceptionView() {
        return false;
    }

    @Override
    public void finishActivity() {
        finish();
    }

    @NonNull
    private ClickableSpan getClickSpan() {
        return new ClickableSpan() {
            @Override
            public void onClick(View widget) {
                //TODO 处理注册时点击协议效果 这中处理方式需要优化
//                        ConfigSettingDTO configSettingInfo = StoreManager.getSingleton().get(false, Constants.CONFIG_SETTING, ConfigSettingDTO.class);
//                        if (null != configSettingInfo) {
//                            final H5ActivityParams activityParams = new H5ActivityParams();
//                            activityParams.setLoadUrl(configSettingInfo.getConfigUrls().getRegisterAgreementUrl());
//                            MainRouter.jumpToH5Page(activityParams);
//                        }
            }

            @Override
            public void updateDrawState(TextPaint ds) {
                ds.setColor(ResUtils.getColor(RegisterActivity.this, R.color.color_two_type));
                ds.setUnderlineText(false);
            }
        };
    }
}
