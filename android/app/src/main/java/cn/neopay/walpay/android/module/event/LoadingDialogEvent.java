package cn.neopay.walpay.android.module.event;

/**
 * Created by shangwf on 2017/9/22.
 */

public class LoadingDialogEvent {
    private boolean isShow;

    public boolean isShow() {
        return isShow;
    }

    public void setShow(boolean show) {
        isShow = show;
    }
}
