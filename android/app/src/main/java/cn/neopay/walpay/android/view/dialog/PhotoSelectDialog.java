package cn.neopay.walpay.android.view.dialog;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.databinding.DataBindingUtil;
import android.support.annotation.NonNull;
import android.view.Gravity;
import android.view.LayoutInflater;

import com.tbruyelle.rxpermissions.RxPermissions;

import com.xgjk.common.lib.base.BaseDialog;
import com.xgjk.common.lib.utils.PhotoUtils;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.databinding.DbDialogPickerPictrueBinding;
import cn.neopay.walpay.android.manager.dialogmanager.DialogManager;

/**
 * Created by shangwf on 2017/5/8.
 */

public class PhotoSelectDialog extends BaseDialog {

    public PhotoSelectDialog(@NonNull Context context) {
        super(context);
        initView(context, "");
    }

    public PhotoSelectDialog(@NonNull Context context, String imgTag) {
        super(context);
        initView(context, imgTag);
    }

    private void initView(final Context context, String imgTag) {
        final LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        final DbDialogPickerPictrueBinding mBinding = DataBindingUtil.inflate(inflater, R.layout.db_dialog_picker_pictrue, null, false);
        mBinding.tvCancel.setOnClickListener((v -> cancel()));

        mBinding.tvCamera.setOnClickListener(v -> new RxPermissions((Activity) context)
                .request(Manifest.permission.CAMERA)
                .subscribe(granted -> {
                    if (granted) {
                        PhotoUtils.openSystemCameraImage((Activity) context, imgTag);

                    } else {
                        DialogManager.getSingleton().showCarmerTipDialog(context);
                    }
                    cancel();
                }));

        mBinding.tvFile.setOnClickListener(v -> new RxPermissions((Activity) context)
                .request(Manifest.permission.READ_EXTERNAL_STORAGE)
                .subscribe(granted -> {
                    if (granted) {
                        PhotoUtils.openSystemLocalImag((Activity) context, imgTag);
                    } else {
                        DialogManager.getSingleton().showReadSDDialog(context);
                    }
                    cancel();
                }));

        setContentView(mBinding.getRoot());
        setFullScreenWidth();
        mLayoutParams.gravity = Gravity.BOTTOM;
    }

}
