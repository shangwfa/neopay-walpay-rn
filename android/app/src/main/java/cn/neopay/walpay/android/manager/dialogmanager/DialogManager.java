package cn.neopay.walpay.android.manager.dialogmanager;

import android.content.Context;

import cn.neopay.walpay.android.view.dialog.CertificationDialog;
import cn.neopay.walpay.android.view.dialog.CommonBottomDialog;
import cn.neopay.walpay.android.view.dialog.CommonDialog;

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

    public void showScanBottomDialog(Context context, CommonBottomDialog.IEnsureTvCallback iEnsureTvCallback) {
        CommonBottomDialog dialog = new CommonBottomDialog(context);
        dialog.setEnsureText("使用说明");
        dialog.setCancelText("关闭弹窗");
        dialog.setEnsureTvCallBackListener(iEnsureTvCallback);
        dialog.show();
    }
}
