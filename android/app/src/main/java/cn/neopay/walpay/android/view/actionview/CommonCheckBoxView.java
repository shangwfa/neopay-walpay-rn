package cn.neopay.walpay.android.view.actionview;

import android.content.Context;
import android.databinding.DataBindingUtil;
import android.support.annotation.AttrRes;
import android.support.annotation.DrawableRes;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.text.SpannableStringBuilder;
import android.text.method.LinkMovementMethod;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.widget.FrameLayout;

import com.xgjk.common.lib.utils.ViewUtils;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.databinding.CommonCheckboxViewBinding;

/**
 * Created by shangwf on 2017/5/3.
 */

public class CommonCheckBoxView extends FrameLayout {

    public CommonCheckBoxView(@NonNull Context context) {
        super(context);
        initView(context);
    }

    public CommonCheckBoxView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        initView(context);
    }

    public CommonCheckBoxView(@NonNull Context context, @Nullable AttributeSet attrs, @AttrRes int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        initView(context);
    }

    @DrawableRes
    private int iconSelected;
    @DrawableRes
    private int iconUnSelected;

    private CommonCheckboxViewBinding mBinding;

    private void initView(Context context) {
        final LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        mBinding = DataBindingUtil.inflate(inflater, R.layout.common_checkbox_view, null, false);
        iconSelected = R.mipmap.img_checkbox_selected;
        iconUnSelected = R.mipmap.img_checkbox_unselected;
        ViewUtils.setBackground(mBinding.commonIcon, iconUnSelected);
        addView(mBinding.getRoot());

        mBinding.getRoot().setOnClickListener(v -> setSelectEnable(!isSelected));
    }

    private boolean isSelected;

    private void setSelectEnable(boolean enable) {
        isSelected = enable;
        ViewUtils.setBackground(mBinding.commonIcon, enable ? iconSelected : iconUnSelected);
        if (null != callBack) {
            callBack.callback(enable);
        }
    }

    public void setValue(String value) {
        mBinding.commonValue.setText(value);
    }

    public void setValue(SpannableStringBuilder value) {
        mBinding.commonValue.setText(value);
        mBinding.commonValue.setHighlightColor(getResources().getColor(android.R.color.transparent));//解决点击底色变灰色的问题
        mBinding.commonValue.setMovementMethod(LinkMovementMethod.getInstance());
    }

    public void setValue(CharSequence value) {
        mBinding.commonValue.setText(value);
    }

    public interface CommonCallBack {
        void callback(boolean isSelected);
    }

    private CommonCallBack callBack;

    public void setCommonCallBack(CommonCallBack callBack) {
        this.callBack = callBack;
    }
}
