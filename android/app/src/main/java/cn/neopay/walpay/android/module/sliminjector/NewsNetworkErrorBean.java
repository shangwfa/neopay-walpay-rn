package cn.neopay.walpay.android.module.sliminjector;

import android.view.View;

/**
 * @author carlos.guo
 * @date 2017/12/25
 * @describe
 */

public class NewsNetworkErrorBean {
    private View.OnClickListener onClickListener;

    public NewsNetworkErrorBean(View.OnClickListener onClickListener) {
        this.onClickListener = onClickListener;
    }

    public NewsNetworkErrorBean() {

    }

    public View.OnClickListener getOnClickListener() {
        return onClickListener;
    }

    public void setOnClickListener(View.OnClickListener onClickListener) {
        this.onClickListener = onClickListener;
    }
}
