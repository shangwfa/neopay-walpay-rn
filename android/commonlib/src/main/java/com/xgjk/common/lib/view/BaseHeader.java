package com.xgjk.common.lib.view;

import android.app.Activity;
import android.content.Context;
import android.databinding.DataBindingUtil;
import android.support.annotation.AttrRes;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.TextView;

import com.xgjk.common.lib.R;
import com.xgjk.common.lib.databinding.BaseHeaderBinding;
import com.xgjk.common.lib.listener.OnClickEvent;
import com.xgjk.common.lib.utils.ViewUtils;

/**
 * Created by shangwf on 2017/5/2.
 */

public class BaseHeader extends FrameLayout {
    private BaseHeaderBinding mBinding;

    public BaseHeader(@NonNull Context context) {
        super(context);
        initView(context);
    }

    public BaseHeader(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        initView(context);
    }

    public BaseHeader(@NonNull Context context, @Nullable AttributeSet attrs, @AttrRes int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        initView(context);
    }

    private void initView(Context context) {
        final LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        mBinding = DataBindingUtil.inflate(inflater, R.layout.base_header, null, false);
        mBinding.headLeft.setOnClickListener(new OnClickEvent() {
            @Override
            public void singleClick(View v) {
                ((Activity) v.getContext()).finish();
            }
        });
        addView(mBinding.getRoot());
    }

    public void setHeaderOnlyTitle(String title) {
        mBinding.headLeftImg.setVisibility(GONE);
        mBinding.headerTitle.setText(title);
    }

    public void setHeaderLeftImg(String title) {
        mBinding.headerTitle.setText(title);
    }

    public void setHeaderLeftText(String leftText, OnClickListener leftListener, String title) {
        mBinding.headLeftTv.setText(leftText);
        mBinding.headLeftTv.setOnClickListener(leftListener);
        setHeaderLeftImg(title);
        mBinding.headLeftTv.setVisibility(VISIBLE);
        mBinding.headLeftImg.setVisibility(GONE);
    }

    public void setHeaderRightText(String rightText, OnClickListener rightListener, String title) {
        mBinding.headRightTv.setText(rightText);
        mBinding.headRightTv.setOnClickListener(rightListener);
        setHeaderLeftImg(title);
        mBinding.headRightTv.setVisibility(VISIBLE);
        mBinding.headRightImg.setVisibility(GONE);
    }

    public void setHeaderOnlyRightText(String rightText) {
        mBinding.headRightTv.setText(rightText);
    }

    public void setHeaderLeftTextAndRighText(String leftText, OnClickListener leftListener, String title, String rightText, OnClickListener rightListener) {
        mBinding.headLeftTv.setText(leftText);
        mBinding.headLeftTv.setOnClickListener(leftListener);
        setHeaderLeftImg(title);
        mBinding.headRightTv.setText(rightText);
        mBinding.headRightTv.setOnClickListener(rightListener);

        mBinding.headLeftTv.setVisibility(VISIBLE);
        mBinding.headLeftImg.setVisibility(GONE);
        mBinding.headRightTv.setVisibility(VISIBLE);
        mBinding.headRightImg.setVisibility(GONE);
    }

    public void setHeaderLeftImgAndRighImg(String title, int rightImg, OnClickListener rightListener) {
        setHeaderLeftImg(title);
        ViewUtils.setBackground(mBinding.headRightImg, rightImg);
        mBinding.headRightImg.setOnClickListener(rightListener);
        mBinding.headLeftTv.setVisibility(GONE);
        mBinding.headLeftImg.setVisibility(VISIBLE);
        mBinding.headRightTv.setVisibility(GONE);
        mBinding.headRightImg.setVisibility(VISIBLE);
    }

    public void setHeaderLeftImgAndRighImg(String title, int rightImg) {
        setHeaderLeftImg(title);
        ViewUtils.setBackground(mBinding.headRightImg, rightImg);
        mBinding.headLeftTv.setVisibility(GONE);
        mBinding.headLeftImg.setVisibility(VISIBLE);
        mBinding.headRightTv.setVisibility(GONE);
        mBinding.headRightImg.setVisibility(VISIBLE);
    }

    public void setHeaderLeftTitleAndLeftImg(String title, int leftImg) {
        mBinding.headLeftTv.setText(title);
        ViewUtils.setBackground(mBinding.headLeftImg, leftImg);
        mBinding.headLeftTv.setVisibility(VISIBLE);
        mBinding.headLeftImg.setVisibility(VISIBLE);
        mBinding.headRightTv.setVisibility(GONE);
        mBinding.headRightImg.setVisibility(GONE);
    }

    public void setLeftImagClick(OnClickListener leftImagClick) {
        mBinding.headLeft.setOnClickListener(leftImagClick);
    }

    public void setRightImagClick(OnClickListener rightImagClick) {
        mBinding.headRightImg.setOnClickListener(rightImagClick);
    }

    public void showRightImg(boolean isShow) {
        mBinding.headRightImg.setVisibility(isShow ? View.VISIBLE : View.GONE);
    }

    public void hideLeftArrow() {
        mBinding.headLeftImg.setVisibility(INVISIBLE);
    }

    public TextView getRightTextView() {
        return mBinding.headRightTv;
    }

    public void hideLeftImag() {
        mBinding.headLeft.setVisibility(GONE);
    }
}
