package cn.neopay.walpay.android.view.dialog;

import android.content.Context;
import android.databinding.DataBindingUtil;
import android.support.annotation.NonNull;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;

import com.xgjk.common.lib.base.BaseDialog;
import com.xgjk.common.lib.listener.OnClickEvent;
import com.xgjk.common.lib.utils.ViewUtils;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.databinding.CommonDialogLayoutBinding;

/**
 * Created by shangwf on 2017/5/10.
 */

public class CommonDialog extends BaseDialog {
    private CommonDialogLayoutBinding mBinding;

    public CommonDialog(@NonNull Context context) {
        super(context);
        initView(context);
    }

    public CommonDialog(@NonNull Context context, String title) {
        super(context);
        initView(context, title);
    }

    private void initView(final Context context) {
        final LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        mBinding = DataBindingUtil.inflate(inflater, R.layout.common_dialog_layout, null, false);
        setContentView(mBinding.getRoot());
        mLayoutParams.gravity = Gravity.CENTER;
    }

    private void initView(final Context context, String title) {
        initView(context);
        mBinding.tvTip.setText(title);
        mBinding.btnEnsure.setOnClickListener(new OnClickEvent() {
            @Override
            public void singleClick(View v) {
                if (null != mCallback) {
                    mCallback.ensure();
                    dismiss();
                }
            }
        });
        mBinding.btnCancel.setOnClickListener(new OnClickEvent() {
            @Override
            public void singleClick(View v) {
                dismiss();
            }
        });
    }

    public CommonDialog setTitle(String title) {
        mBinding.tvTip.setText(title);
        return this;
    }

    public CommonDialog setEnsureText(String ensureText) {
        ViewUtils.setTextViewVisibilityAccordingToStr(mBinding.btnEnsure,ensureText);
        return this;
    }

    public CommonDialog setEnsureListener(View.OnClickListener listener) {
        mBinding.btnEnsure.setOnClickListener(listener);
        return this;
    }

    public CommonDialog setCancelText(String ensureText) {
        mBinding.btnCancel.setText(ensureText);
        return this;
    }

    public CommonDialog setCancelListener(View.OnClickListener listener) {
        mBinding.btnCancel.setOnClickListener(listener);
        return this;
    }

    public CommonDialog HideEnsureLayout() {
        mBinding.btnEnsure.setVisibility(View.GONE);
        return this;
    }

    public CommonDialog HideCancelLayout() {
        mBinding.btnCancel.setVisibility(View.GONE);
        return this;
    }

    public CommonDialog ShowEnsureLayout() {
        mBinding.btnEnsure.setVisibility(View.VISIBLE);
        return this;
    }

    public CommonDialog ShowCancelLayout() {
        mBinding.btnCancel.setVisibility(View.VISIBLE);
        return this;
    }

    private Callback mCallback;

    public void setCallback(Callback mCallback) {
        this.mCallback = mCallback;
    }

    public interface Callback {
        void ensure();
    }
}
