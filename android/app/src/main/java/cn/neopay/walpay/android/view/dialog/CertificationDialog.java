package cn.neopay.walpay.android.view.dialog;

import android.content.Context;
import android.databinding.DataBindingUtil;
import android.support.annotation.NonNull;
import android.view.Gravity;
import android.view.LayoutInflater;

import com.xgjk.common.lib.base.BaseDialog;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.databinding.CertificationDialogLayoutBinding;

/**
 * @author carlos.guo
 * @date 2017/10/11
 * @describe CertificationDialog 实名认证
 */
public class CertificationDialog extends BaseDialog {
    private CertificationDialogLayoutBinding mBinding;

    public CertificationDialog(@NonNull Context context) {
        super(context);
        initView(context);
    }

    public CertificationDialog(@NonNull Context context, String title) {
        super(context);
        initView(context);
    }

    private void initView(final Context context) {
        final LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        mBinding = DataBindingUtil.inflate(inflater, R.layout.certification_dialog_layout, null, false);
        setContentView(mBinding.getRoot());
        mLayoutParams.gravity = Gravity.CENTER;
        mBinding.nowCertificationTv.setOnClickListener(v -> {
            mINowCertificationCallback.click();
            dismiss();
        });
        mBinding.notCertificationTv.setOnClickListener(v -> dismiss());
    }

    private INowCertificationCallback mINowCertificationCallback;

    public void setNowCertificationCallback(INowCertificationCallback mINowCertificationCallback) {
        this.mINowCertificationCallback = mINowCertificationCallback;
    }

    public interface INowCertificationCallback {
        void click();
    }

}
