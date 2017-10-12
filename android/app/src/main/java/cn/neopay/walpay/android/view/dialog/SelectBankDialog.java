package cn.neopay.walpay.android.view.dialog;

import android.content.Context;
import android.databinding.DataBindingUtil;
import android.support.annotation.NonNull;
import android.view.Gravity;
import android.view.LayoutInflater;

import com.xgjk.common.lib.base.BaseDialog;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.databinding.SelectBankDialogLayoutBinding;

/**
 * Created by shangwf on 2017/5/10.
 */

public class SelectBankDialog extends BaseDialog {
    private SelectBankDialogLayoutBinding mBinding;

    public SelectBankDialog(@NonNull Context context) {
        super(context);
        initView(context);
    }

    public SelectBankDialog(@NonNull Context context, String title) {
        super(context);
        initView(context);
    }

    private void initView(final Context context) {
        final LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        mBinding = DataBindingUtil.inflate(inflater, R.layout.select_bank_dialog_layout, null, false);
        setContentView(mBinding.getRoot());
        mLayoutParams.gravity = Gravity.CENTER;
    }

}
