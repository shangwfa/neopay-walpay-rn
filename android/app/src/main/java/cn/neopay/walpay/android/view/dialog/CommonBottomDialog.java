package cn.neopay.walpay.android.view.dialog;

import android.content.Context;
import android.databinding.DataBindingUtil;
import android.support.annotation.NonNull;
import android.view.Gravity;
import android.view.LayoutInflater;

import com.xgjk.common.lib.base.BaseDialog;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.databinding.CommonBottomDialogLayoutBinding;

/**
 * @author carlos.guo
 * @date 2017/10/11
 * @describe CommonBottomDialog 通用底部弹窗 扫一扫、
 */
public class CommonBottomDialog extends BaseDialog {

    private CommonBottomDialogLayoutBinding mBinding;

    public CommonBottomDialog(@NonNull Context context) {
        super(context);
        initView(context);
    }


    private void initView(final Context context) {
        final LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        mBinding = DataBindingUtil.inflate(inflater, R.layout.common_bottom_dialog_layout, null, false);
        setContentView(mBinding.getRoot());
        setFullScreen();
        mLayoutParams.gravity = Gravity.BOTTOM;
        handleViewClick();
    }

    public void setEnsureText(String ensureText) {
        mBinding.ensureTv.setText(ensureText);
    }

    public void setCancelText(String cancelText) {
        mBinding.cancelTv.setText(cancelText);
    }

    private void handleViewClick() {
        mBinding.cancelTv.setOnClickListener((v -> cancel()));
        mBinding.ensureTv.setOnClickListener(v -> {
            dismiss();
            mEnsureTvCallback.click();
        });
    }

    public interface IEnsureTvCallback {
        void click();
    }

    private IEnsureTvCallback mEnsureTvCallback;

    public void setEnsureTvCallBackListener(IEnsureTvCallback ensureTvCallback) {
        this.mEnsureTvCallback = ensureTvCallback;
    }
}
