package cn.neopay.walpay.android.view.commoninputview;

import android.content.Context;
import android.databinding.DataBindingUtil;
import android.support.annotation.AttrRes;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.text.Editable;
import android.text.InputFilter;
import android.text.InputType;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.text.method.DigitsKeyListener;
import android.text.method.HideReturnsTransformationMethod;
import android.text.method.PasswordTransformationMethod;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.EditText;
import android.widget.FrameLayout;

import com.xgjk.common.lib.utils.StringUtils;
import com.xgjk.common.lib.utils.ViewUtils;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.databinding.CommonInputViewLayoutBinding;
import cn.neopay.walpay.android.utils.InputCheckUtils;
import cn.neopay.walpay.android.view.actionview.CommonVerificationCodeView;

/**
 * Created by shangwf on 2017/5/2.
 * CommonInputView 通用的输入view
 */

public class CommonInputView extends FrameLayout {
    private CommonInputViewLayoutBinding mBinding;
    private boolean enableClear = true;
    private String mInputType;

    public CommonInputView(@NonNull Context context) {
        super(context);
        initView(context);
    }

    public CommonInputView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        initView(context);
    }

    public CommonInputView(@NonNull Context context, @Nullable AttributeSet attrs, @AttrRes int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        initView(context);
    }

    private void initView(Context context) {
        final LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        mBinding = DataBindingUtil.inflate(inflater, R.layout.common_input_view_layout, null, false);
        addView(mBinding.getRoot());
        handleViewClick();
    }

    private void handleViewClick() {
        mBinding.value.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                if (enableClear) {
                    mBinding.commonInputClose.setVisibility(StringUtils.isEmpty(s.toString()) ? View.INVISIBLE : VISIBLE);
                }

                if (null == mInputType) {
                    return;
                }
                switch (mInputType) {
                    case IWalpayConstants.COMMONINPUTVIEW_TYPE_PASSWORD:
                        if (18 == s.length()) {
                            InputCheckUtils.checkPassword(s.toString());
                        }
                        break;
                    case IWalpayConstants.COMMONINPUTVIEW_TYPE_PAYPWD:
                        if (6 == s.length()) {
                            InputCheckUtils.checkPayPassword(s.toString());
                        }
                        break;
                }
            }
        });
        mBinding.value.setOnFocusChangeListener((v, hasFocus) -> {
            if (hasFocus && StringUtils.isNoEmpty(mBinding.value.getText().toString())) {
                mBinding.commonInputClose.setVisibility(VISIBLE);
            } else {
                mBinding.commonInputClose.setVisibility(INVISIBLE);
            }

        });
        mBinding.commonInputClose.setOnClickListener(v -> {
            mBinding.value.setText("");
        });
    }

    public void setInputData(String inputType, String hint, int imgId) {
        setViewInit(inputType, "", hint, "", imgId, true);
    }

    public void setInputData(String inputType, String name, String hint) {
        setViewInit(inputType, name, hint, "", 0, false);
    }

    private void setViewInit(String inputType, String name, String hint, String value, int imgId, boolean isShowImg) {
        this.mInputType = inputType;
        switch (mInputType) {
            case IWalpayConstants.COMMONINPUTVIEW_TYPE_PHONE:
                setPhone();
                break;
            case IWalpayConstants.COMMONINPUTVIEW_TYPE_VERIFICATION_CODE:
                setVerificationCode();
                break;
            case IWalpayConstants.COMMONINPUTVIEW_TYPE_PASSWORD:
                setPassword();
                break;
            case IWalpayConstants.COMMONINPUTVIEW_TYPE_NUM_AND_STR:
                setNumStr();
                break;
            case IWalpayConstants.COMMONINPUTVIEW_TYPE_PAY:
                setPay();
                break;
            case IWalpayConstants.COMMONINPUTVIEW_TYPE_PAYPWD:
                setPayPwd();
                break;
            default:
                break;
        }
        if (isShowImg) {
            mBinding.key.setVisibility(GONE);
            mBinding.iconImg.setVisibility(VISIBLE);
            mBinding.iconImg.setBackgroundResource(imgId);
        } else {
            mBinding.key.setVisibility(VISIBLE);
            mBinding.iconImg.setVisibility(GONE);
            mBinding.key.setText(name);
        }
        if (TextUtils.isEmpty(value)) {
            mBinding.value.setHint(hint);
        } else {
            ViewUtils.setEditTextValue(mBinding.value, value);
            mBinding.commonInputClose.setVisibility(INVISIBLE);
        }
    }

    private void setPayPwd() {
        mBinding.value.setFilters(new InputFilter[]{new InputFilter.LengthFilter(6)});
        handleActionEyeState(R.mipmap.img_pwd_close, R.mipmap.img_pwd_show, true);
    }

    private void setPay() {
        setPayEye(R.mipmap.img_pwd_close, R.mipmap.img_pwd_show);
    }


    private void setNumStr() {
        mBinding.value.setInputType(InputType.TYPE_CLASS_NUMBER);
        mBinding.value.setKeyListener(DigitsKeyListener.getInstance("0123456789abcdefghigklmnopqrstuvwxyz"));
        mBinding.rlVerificationCode.setVisibility(GONE);
    }

    private void setPhone() {
        mBinding.value.setInputType(InputType.TYPE_CLASS_PHONE);
        mBinding.value.setFilters(new InputFilter[]{new InputFilter.LengthFilter(11)});
    }

    private void setVerificationCode() {
        mBinding.value.setKeyListener(DigitsKeyListener.getInstance("0123456789abcdefghigklmnopqrstuvwxyz"));
        mBinding.verificationCode.setVisibility(VISIBLE);
        mBinding.rlVerificationCode.setVisibility(VISIBLE);
        mBinding.value.setFilters(new InputFilter[]{new InputFilter.LengthFilter(6)});
    }

    private boolean isEyeOpen = false;

    private void setPassword() {
        mBinding.value.setFilters(new InputFilter[]{new InputFilter.LengthFilter(18)});
        handleActionEyeState(R.mipmap.img_pwd_close, R.mipmap.img_pwd_show, false);
    }

    private void setPayEye(int hideImgId, int showImgId) {
        mBinding.passWordEye.setVisibility(VISIBLE);
        mBinding.value.setInputType(InputType.TYPE_CLASS_NUMBER);
        mBinding.value.setTransformationMethod(PasswordTransformationMethod.getInstance());
        ViewUtils.setBackground(mBinding.passWordEye, showImgId);
        mBinding.value.setInputType(InputType.TYPE_CLASS_NUMBER);
        mBinding.passWordEye.setOnClickListener((v -> {
            if (isEyeOpen) {
                ViewUtils.setBackground(mBinding.passWordEye, showImgId);
                mBinding.value.setTransformationMethod(PasswordTransformationMethod.getInstance());
            } else {
                ViewUtils.setBackground(mBinding.passWordEye, hideImgId);
                mBinding.value.setTransformationMethod(HideReturnsTransformationMethod.getInstance());
            }
            isEyeOpen = !isEyeOpen;
            ViewUtils.setSelection(mBinding.value);
        }));
    }

    private void handleActionEyeState(int hideImgId, int showImgId, boolean isPureDigital) {
        mBinding.passWordEye.setVisibility(VISIBLE);
        ViewUtils.setBackground(mBinding.passWordEye, hideImgId);
        mBinding.value.setTransformationMethod(PasswordTransformationMethod.getInstance());
        int PureDigital = isPureDigital ? InputType.TYPE_CLASS_NUMBER : InputType.TYPE_CLASS_TEXT;
        mBinding.value.setInputType(InputType.TYPE_TEXT_VARIATION_PASSWORD | PureDigital);
        mBinding.passWordEye.setOnClickListener((v -> {
            if (isEyeOpen) {
                ViewUtils.setBackground(mBinding.passWordEye, hideImgId);
                mBinding.value.setInputType(InputType.TYPE_TEXT_VARIATION_PASSWORD | PureDigital);
                mBinding.value.setTransformationMethod(PasswordTransformationMethod.getInstance());
            } else {
                ViewUtils.setBackground(mBinding.passWordEye, showImgId);
                mBinding.value.setInputType(InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD | PureDigital);
                mBinding.value.setTransformationMethod(HideReturnsTransformationMethod.getInstance());
            }
            isEyeOpen = !isEyeOpen;
            ViewUtils.setSelection(mBinding.value);
        }));
    }

    public String getText() {
        return mBinding.value.getText().toString();
    }

    public void setLine(boolean isShowLine) {
        mBinding.commonInputLine.setVisibility(isShowLine ? VISIBLE : GONE);
    }

    public CommonVerificationCodeView getVerificationCode() {
        return mBinding.verificationCode;
    }

    public void setPhoneEdit(EditText phoneEdit) {
        mBinding.verificationCode.setmEditText(phoneEdit);
    }

    public EditText getEditText() {
        return mBinding.value;
    }

    public void setVerificationCode(int codeType) {
        mBinding.verificationCode.setCodeType(codeType);
    }

    public void setEnable(boolean enable) {
        mBinding.value.setVisibility(enable ? VISIBLE : INVISIBLE);
        mBinding.noEditValue.setVisibility(enable ? INVISIBLE : VISIBLE);
    }

    public void setMaxLength(int length) {
        InputFilter[] inputFilter = {new InputFilter.LengthFilter(length)};
        mBinding.value.setFilters(inputFilter);
    }

    public void setEnableClear(boolean enableClear) {
        this.enableClear = enableClear;
        mBinding.commonInputClose.setVisibility(enableClear ? VISIBLE : GONE);
    }

    public void setNoEditText(String value) {
        mBinding.noEditValue.setText(value);
        mBinding.noEditValue.setVisibility(View.VISIBLE);
        mBinding.value.setVisibility(GONE);
    }

    public void setNoEditTextColor(int colorId) {
        ViewUtils.setTextViewColor(mBinding.noEditValue, colorId);
    }

    public String getNoEditText() {
        return mBinding.noEditValue.getText().toString();
    }
}
