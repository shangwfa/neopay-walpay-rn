package cn.neopay.walpay.android.module.sliminjector;

import android.view.View;

/**
 * @author carlos.guo
 * @date 2017/12/25
 * @describe
 */

public class NewsNoDataBean {
    private View.OnClickListener onClickListener;

    public NewsNoDataBean(View.OnClickListener onClickListener) {
        this.onClickListener = onClickListener;
    }

    public NewsNoDataBean() {

    }

    public View.OnClickListener getOnClickListener() {
        return onClickListener;
    }

    public void setOnClickListener(View.OnClickListener onClickListener) {
        this.onClickListener = onClickListener;
    }
}
