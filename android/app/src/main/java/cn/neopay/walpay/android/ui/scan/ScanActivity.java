package cn.neopay.walpay.android.ui.scan;

import android.Manifest;
import android.graphics.Rect;
import android.os.Bundle;
import android.os.Handler;
import android.view.SurfaceHolder;
import android.view.animation.Animation;
import android.view.animation.LinearInterpolator;
import android.view.animation.TranslateAnimation;

import com.alibaba.android.arouter.facade.annotation.Route;
import com.google.zxing.Result;
import com.orhanobut.logger.Logger;
import com.tbruyelle.rxpermissions.RxPermissions;
import com.xgjk.common.lib.base.BaseActivity;
import com.xgjk.common.lib.utils.ToastUtils;
import com.xgjk.common.lib.utils.ViewUtils;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.databinding.ActivityScanLayoutBinding;
import cn.neopay.walpay.android.manager.dialogmanager.DialogManager;
import cn.neopay.walpay.android.manager.routermanager.MainRouter;
import cn.neopay.walpay.android.view.zxing.camera.CameraManager;
import cn.neopay.walpay.android.view.zxing.decode.DecodeThread;
import cn.neopay.walpay.android.view.zxing.utils.BeepManager;
import cn.neopay.walpay.android.view.zxing.utils.CaptureActivityHandler;
import cn.neopay.walpay.android.view.zxing.utils.InactivityTimer;

/**
 * @author carlos.guo
 * @date 2017/10/11
 * @describe ScanActivity 扫一扫页面
 */
@Route(path = IWalpayConstants.TO_SCAN_PAGE)
public class ScanActivity extends BaseActivity<ScanPresenter, ActivityScanLayoutBinding> implements ScanContract.IView, SurfaceHolder.Callback {
    private InactivityTimer inactivityTimer;
    private BeepManager beepManager;
    private Rect mCropRect = null;
    private CameraManager cameraManager;
    private boolean isHasSurface = false;
    private CaptureActivityHandler handler;

    @Override
    public int getLayoutId() {
        return R.layout.activity_scan_layout;
    }

    @Override
    public int getExceptionLayoutId() {
        return 0;
    }

    @Override
    public void initView() {
        mPageBinding.commonHeader.setHeaderLeftImgAndRighImg("扫一扫", R.mipmap.img_right_arrows, v -> {
            DialogManager.getSingleton().showScanBottomDialog(this, () -> MainRouter.getSingleton().jumpToExplainPage("扫一扫"));
        });
        initScanLine();
        initScan();
    }

    private void initScanLine() {
        //动画
        TranslateAnimation animation = new TranslateAnimation(Animation.RELATIVE_TO_PARENT, 0.0f, Animation.RELATIVE_TO_PARENT, 0.0f, Animation.RELATIVE_TO_PARENT, 0.0f, Animation.RELATIVE_TO_PARENT, 0.9f);
        animation.setDuration(2000);
        animation.setRepeatCount(-1);
        animation.setRepeatMode(Animation.RESTART);
        animation.setInterpolator(new LinearInterpolator());
        mViewBinding.captureScanLineIv.startAnimation(animation);
    }

    private void initScan() {
        inactivityTimer = new InactivityTimer(this);
        beepManager = new BeepManager(this);
        new RxPermissions(this)
                .request(Manifest.permission.CAMERA)
                .subscribe(granted -> {
                    if (!granted) {
                        DialogManager.getSingleton().showCarmerTipDialog(this);
                    }
                });

    }

    @Override
    public boolean isShowExceptionView() {
        return false;
    }

    public void handleDecode(Result rawResult, Bundle bundle) {
        inactivityTimer.onActivity();
        beepManager.playBeepSoundAndVibrate();
        final String qrcode = rawResult.getText();//获取到二维码值
        Logger.d(qrcode);
        //TODO 处理结果
        ToastUtils.show(qrcode);
    }

    @Override
    protected void onResume() {
        super.onResume();
        cameraManager = new CameraManager(this);

        handler = null;
        if (isHasSurface) {
            initCamera(mViewBinding.capturePreviewSv.getHolder());
        } else {
            mViewBinding.capturePreviewSv.getHolder().addCallback(this);
        }
        inactivityTimer.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (handler != null) {
            handler.quitSynchronously();
            handler = null;
        }
        inactivityTimer.onPause();
        beepManager.close();
        cameraManager.closeDriver();
        if (!isHasSurface) {
            mViewBinding.capturePreviewSv.getHolder().removeCallback(this);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        inactivityTimer.shutdown();
    }


    @Override
    public void surfaceCreated(SurfaceHolder holder) {
        if (!isHasSurface) {
            isHasSurface = true;
            initCamera(holder);
        }
    }

    @Override
    public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {
    }

    @Override
    public void surfaceDestroyed(SurfaceHolder holder) {
        isHasSurface = false;
    }

    public CameraManager getCameraManager() {
        return cameraManager;
    }

    public Handler getHandler() {
        return handler;
    }

    public Rect getCropRect() {
        return mCropRect;
    }

    /**
     * 初始化截取的矩形区域
     */
    private void initCrop() {
        int cameraWidth = cameraManager.getCameraResolution().y;
        int cameraHeight = cameraManager.getCameraResolution().x;

        /** 获取布局中扫描框的位置信息 */
        int[] location = new int[2];
        mViewBinding.captureCropViewRl.getLocationInWindow(location);

        int cropLeft = location[0];
        int cropTop = location[1] - ViewUtils.getStatusBarHeight(this);

        int cropWidth = mViewBinding.captureCropViewRl.getWidth();
        int cropHeight = mViewBinding.captureCropViewRl.getHeight();

        /** 获取布局容器的宽高 */
        int containerWidth = mViewBinding.scanLl.getWidth();
        int containerHeight = mViewBinding.scanLl.getHeight();

        /** 计算最终截取的矩形的左上角顶点x坐标 */
        int x = cropLeft * cameraWidth / containerWidth;
        /** 计算最终截取的矩形的左上角顶点y坐标 */
        int y = cropTop * cameraHeight / containerHeight;

        /** 计算最终截取的矩形的宽度 */
        int width = cropWidth * cameraWidth / containerWidth;
        /** 计算最终截取的矩形的高度 */
        int height = cropHeight * cameraHeight / containerHeight;

        /** 生成最终的截取的矩形 */
        mCropRect = new Rect(x, y, width + x, height + y);
    }

    /**
     * 功能：摄像头初始化
     *
     * @param surfaceHolder
     */
    private void initCamera(SurfaceHolder surfaceHolder) {
        if (surfaceHolder == null) {
            throw new IllegalStateException("No SurfaceHolder provided");
        }
        if (cameraManager.isOpen()) {
            return;
        }
        try {
            cameraManager.openDriver(surfaceHolder);
            if (handler == null) {
                handler = new CaptureActivityHandler(this, cameraManager, DecodeThread.ALL_MODE);
            }

            initCrop();
        } catch (Exception e) {
            //启动摄像头异常操作
            e.printStackTrace();
        }
    }
}
