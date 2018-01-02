package cn.neopay.walpay.android.http;

import android.app.Activity;
import android.content.Context;

import com.xgjk.common.lib.base.BaseApp;
import com.xgjk.common.lib.utils.NetWorkUtils;
import com.xgjk.common.lib.utils.ResUtils;
import com.xgjk.common.lib.utils.ToastUtils;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.view.dialog.LoadingDialog;
import rx.Subscriber;

/**
 * Created by shangwf on 2017/5/16.
 */

public class BaseSubscriber<T> extends Subscriber<T> {

    private LoadingDialog mLoadingDialog;
    private final Activity mActivity;
    private final SuccessCallback<T> mCallback;
    private ErrorCallback mErrorCallback;
    private boolean mIsShowLoading = true;

    public BaseSubscriber(Activity activity, SuccessCallback<T> mCallback) {
        this.mActivity = activity;
        this.mCallback = mCallback;
    }

    public BaseSubscriber(Activity activity, SuccessCallback<T> mCallback, boolean isShowLoading) {
        this.mActivity = activity;
        this.mCallback = mCallback;
        this.mIsShowLoading = isShowLoading;
    }

    public BaseSubscriber(Context activity, SuccessCallback<T> mCallback, boolean isShowLoading) {
        this.mActivity = (Activity) activity;
        this.mCallback = mCallback;
        this.mIsShowLoading = isShowLoading;
    }

    public BaseSubscriber(Activity activity, SuccessCallback<T> mCallback, ErrorCallback errorCallback) {
        this.mActivity = activity;
        this.mCallback = mCallback;
        this.mErrorCallback = errorCallback;
    }

    public BaseSubscriber(Activity activity, SuccessCallback<T> mCallback, boolean isShowLoading, ErrorCallback errorCallback) {
        this.mActivity = activity;
        this.mCallback = mCallback;
        this.mErrorCallback = errorCallback;
        this.mIsShowLoading = isShowLoading;
    }

    @Override
    public void onStart() {
        //检查网络
        if (!NetWorkUtils.isConnectedByState(BaseApp.application)) {
            ToastUtils.show(ResUtils.getText(mActivity, R.string.net_not_link));
            return;
        }
        if (null != mActivity && isShowLoading()) {
            mLoadingDialog = LoadingDialog.createDialog(mActivity);
            mLoadingDialog.show();
        }
    }

    @Override
    public void onCompleted() {
        dismissLoadingDialog();
    }

    @Override
    public void onNext(T t) {
        dismissLoadingDialog();
        mCallback.callback(t);
    }

    @Override
    public void onError(Throwable e) {
        try {
            if (!(e instanceof ApiException)) {
                e.printStackTrace();
                if (isShowNetErrorToast()) {
                    ToastUtils.show(ResUtils.getText(mActivity, R.string.net_error));
                }
            }
            dismissLoadingDialog();
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }

        if (null != mErrorCallback) {
            mErrorCallback.callback(e);
        }

    }

    private void dismissLoadingDialog() {
        if (null != mActivity && isShowLoading() && null != mLoadingDialog && mLoadingDialog.isShowing()) {
            mLoadingDialog.dismiss();
        }
    }

    public boolean isShowLoading() {
        return mIsShowLoading;
    }

    public boolean isShowNetErrorToast() {
        return true;
    }

    public interface SuccessCallback<T> {
        void callback(T t);
    }

    public interface ErrorCallback {
        void callback(Throwable t);
    }
}
