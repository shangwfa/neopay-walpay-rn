package cn.neopay.walpay.android.view.commoninputview;

import android.content.Context;
import android.databinding.DataBindingUtil;
import android.support.annotation.AttrRes;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.text.Editable;
import android.text.InputFilter;
import android.text.InputType;
import android.text.TextWatcher;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.widget.EditText;
import android.widget.FrameLayout;

import com.xgjk.common.lib.utils.StringUtils;
import com.xgjk.common.lib.utils.ViewUtils;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.databinding.CommonLoginViewLayoutBinding;
import cn.neopay.walpay.android.utils.InputCheckUtils;

/**
 * Created by shangwf on 2017/5/3.
 * CommonLoginView 通用的login输入view
 */

public class CommonLoginView extends FrameLayout {

    private CommonLoginViewLayoutBinding mBinding;
    private boolean isEyeOpen = false;
    private String mInputType;

    public CommonLoginView(@NonNull Context context) {
        super(context);
        initView(context);
    }

    public CommonLoginView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        initView(context);
    }

    public CommonLoginView(@NonNull Context context, @Nullable AttributeSet attrs, @AttrRes int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        initView(context);
    }

    private void initView(Context context) {
        final LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        mBinding = DataBindingUtil.inflate(inflater, R.layout.common_login_view_layout, null, false);
        mBinding.commonInputEdt.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                mBinding.commonActionClose.setVisibility(StringUtils.isEmpty(s.toString()) ? GONE : VISIBLE);
                handleTextFormat(s);
            }
        });
        mBinding.commonInputEdt.setOnFocusChangeListener((v, hasFocus) -> {
            if (hasFocus && StringUtils.isNoEmpty(getEditText())) {
                mBinding.commonActionClose.setVisibility(VISIBLE);
            } else {
                mBinding.commonActionClose.setVisibility(GONE);
            }
        });

        mBinding.commonActionClose.setOnClickListener(v -> mBinding.commonInputEdt.setText(""));
        addView(mBinding.getRoot());
    }

    private void handleTextFormat(Editable s) {
        if (null == mInputType) {
            return;
        }
        switch (mInputType) {
            case LoginInputType.LOGIN_PHONE:
                if (11 == s.length()) {
                    InputCheckUtils.checkPhone(s.toString());
                }
                break;
            case LoginInputType.LOGIN_PWD:
                if (18 == s.length()) {
                    InputCheckUtils.checkPassword(s.toString());
                }
                break;
        }
    }

    public void setType(String inputType, int imgId) {
        mInputType = inputType;
        switch (mInputType) {
            case LoginInputType.LOGIN_PHONE:
                mBinding.commonInputEdt.setInputType(InputType.TYPE_CLASS_PHONE);
                mBinding.commonInputEdt.setFilters(new InputFilter[]{new InputFilter.LengthFilter(11)});
                ViewUtils.setBackground(mBinding.commonInputIcon, imgId);
                break;
            case LoginInputType.LOGIN_PWD:
                mBinding.commonInputEdt.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD);
                ViewUtils.setBackground(mBinding.commonInputIcon, imgId);
                mBinding.commonInputEdt.setFilters(new InputFilter[]{new InputFilter.LengthFilter(18)});
                handleActionEyeState(R.mipmap.img_pwd_show, R.mipmap.img_pwd_close);
                break;
        }
    }

    private void handleActionEyeState(int showImgId, int hideImgId) {
        mBinding.commonActionEye.setVisibility(VISIBLE);
        ViewUtils.setBackground(mBinding.commonActionEye, hideImgId);
        mBinding.commonActionEye.setOnClickListener(v -> {
            if (isEyeOpen) {
                ViewUtils.setBackground(mBinding.commonActionEye, hideImgId);
                mBinding.commonInputEdt.setInputType(InputType.TYPE_TEXT_VARIATION_PASSWORD | InputType.TYPE_CLASS_TEXT);
            } else {
                ViewUtils.setBackground(mBinding.commonActionEye, showImgId);
                mBinding.commonInputEdt.setInputType(InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD);
            }
            isEyeOpen = !isEyeOpen;
            ViewUtils.setSelection(mBinding.commonInputEdt);
        });
    }


    public String getEditText() {
        return mBinding.commonInputEdt.getText().toString();
    }

    public EditText getEditTextView() {
        return mBinding.commonInputEdt;
    }

    public void setHint(String hint) {
        mBinding.commonInputEdt.setHint(hint);
    }

    public interface LoginInputType {
        String LOGIN_PHONE = "login_phone";
        String LOGIN_PWD = "login_pwd";
    }
}
