package cn.neopay.walpay.android.manager.dialogmanager;

import android.content.Context;

import com.xgjk.common.lib.manager.ActivityManager;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.manager.routermanager.MainRouter;
import cn.neopay.walpay.android.module.request.VerifyRegisterPhoneRequestBean;
import cn.neopay.walpay.android.view.dialog.CertificationDialog;
import cn.neopay.walpay.android.view.dialog.CommonBottomDialog;
import cn.neopay.walpay.android.view.dialog.CommonDialog;
import cn.neopay.walpay.android.view.dialog.PhotoSelectDialog;
import cn.neopay.walpay.android.view.dialog.SelectBankDialog;

import static com.xgjk.common.lib.utils.StringUtils.getString;

/**
 * @author carlos.guo
 * @date 2017/10/11
 * @describe DialogManager 弹窗管理器
 */

public class DialogManager {
    private static DialogManager singleton;

    private DialogManager() {
    }

    public static DialogManager getSingleton() {
        if (singleton == null) {
            synchronized (DialogManager.class) {
                if (singleton == null) {
                    singleton = new DialogManager();
                }
            }
        }
        return singleton;
    }

    public void showCertificationDialog(Context context, CertificationDialog.INowCertificationCallback INowCertificationCallback) {
        CertificationDialog dialog = new CertificationDialog(context);
        dialog.setNowCertificationCallback(INowCertificationCallback);
        dialog.show();
    }

    public void showCarmerTipDialog(Context context) {
        final CommonDialog dialog = new CommonDialog(context, "相机权限未开启，如需使用请进入设置中开启相机权限");
        dialog.setCancelText("取消");
        dialog.setEnsureText("");
        dialog.show();
    }

    public void showVerfyPhoneDialog(Context context, VerifyRegisterPhoneRequestBean requestBean) {
        CommonDialog loginDialog = new CommonDialog(context);
        loginDialog.setTitle(String.format(getString(R.string.str_phone_exist_tips)))
                .setEnsureText(getString(R.string.str_go_login))
                .setEnsureListener(v1 -> {
                    loginDialog.dismiss();
                    ActivityManager.getInstance().killAllActivity();
                    MainRouter.getSingleton().jumpToLoginPage(requestBean.getPhone());
                })
                .HideCancelLayout()
                .show();
    }

    public void showScanBottomDialog(Context context, CommonBottomDialog.IEnsureTvCallback iEnsureTvCallback) {
        CommonBottomDialog dialog = new CommonBottomDialog(context);
        dialog.setEnsureText("使用说明");
        dialog.setCancelText("关闭弹窗");
        dialog.setEnsureTvCallBackListener(iEnsureTvCallback);
        dialog.show();
    }

    public void showSelectBankDialog(Context context) {
        SelectBankDialog dialog = new SelectBankDialog(context);
        dialog.show();
    }

    //选取照片Dialog
    public static void showPhotoSelectDialog(Context context) {
        PhotoSelectDialog dialogChooseImage = new PhotoSelectDialog(context);
        dialogChooseImage.show();
    }

    public static void showReadSDDialog(Context context) {
        final CommonDialog dialog = new CommonDialog(context, "SD卡读权限未开启，如需使用请进入设置中开启SD卡读权限");
        dialog.setCancelText("取消");
        dialog.setEnsureText("");
        dialog.show();
    }
}
