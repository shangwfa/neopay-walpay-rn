package cn.neopay.walpay.android.view.dialog;

import android.content.Context;
import android.databinding.DataBindingUtil;
import android.support.annotation.NonNull;
import android.view.Gravity;
import android.view.LayoutInflater;

import com.xgjk.common.lib.base.BaseDialog;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.databinding.CommonShareLayoutBinding;

/**
 * Created by shangwf on 2017/5/8.
 */

public class ShareDialog extends BaseDialog {

    public ShareDialog(@NonNull Context context) {
        super(context);
        initView(context, "");
    }

    public ShareDialog(@NonNull Context context, String imgTag) {
        super(context);
        initView(context, imgTag);
    }

    private void initView(final Context context, String imgTag) {
        final LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        final CommonShareLayoutBinding mBinding = DataBindingUtil.inflate(inflater, R.layout.common_share_layout, null, false);
        mBinding.shareClose.setOnClickListener((v -> cancel()));
        setContentView(mBinding.getRoot());
        setFullScreenWidth();
        mLayoutParams.gravity = Gravity.BOTTOM;
        mBinding.shareWeixinFriendLl.setOnClickListener(view -> {
            cancel();
        });

        mBinding.shareWeixinCircleLl.setOnClickListener(view -> {
            cancel();
        });
    }

}
