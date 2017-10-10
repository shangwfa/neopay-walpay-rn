package com.xgjk.common.lib.view;

import android.content.Context;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.widget.ScrollView;

import com.orhanobut.logger.Logger;
import com.xgjk.common.lib.utils.DensityUtils;
import com.xgjk.common.lib.utils.HandlerUtils;

/**
 * Created by shangwf on 2017/5/5.
 */

public class ObservableScrollView extends ScrollView {//目前是针对聚合支付App扫码付款做的修改
    private ScrollViewListener mScrollViewListener;

    public ObservableScrollView(Context context) {
        super(context);
    }

    public ObservableScrollView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }


    public void setScrollViewListener(ScrollViewListener scrollViewListener) {
        this.mScrollViewListener = scrollViewListener;
    }

    private float scale;

    @Override
    protected void onScrollChanged(int x, int y, int oldx, int oldy) {
        super.onScrollChanged(x, y, oldx, oldy);
        if (y > DensityUtils.dip2px(getContext(), 200)) {
            scale = 1;
        } else {
            scale = y / (float) DensityUtils.dip2px(getContext(), 200);
        }
        Logger.d("scale--->" + scale);
        if (mScrollViewListener != null) {
            mScrollViewListener.onScaleChanged(scale);
        }
    }

    public interface ScrollViewListener {
        void onScaleChanged(float scale);
    }


    @Override
    public boolean onTouchEvent(MotionEvent ev) {
        final int action = ev.getAction();
        switch (action) {
            case MotionEvent.ACTION_DOWN:
                break;
            case MotionEvent.ACTION_MOVE:
                break;
            case MotionEvent.ACTION_CANCEL:
            case MotionEvent.ACTION_UP:
                if (scale > 0.7) {
                    HandlerUtils.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            fullScroll(ScrollView.FOCUS_DOWN);
                        }
                    });

                } else {
                    HandlerUtils.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            fullScroll(ScrollView.FOCUS_UP);
                        }
                    });

                }
                Logger.d("scale:" + scale + " 松手");
                break;
        }
        return super.onTouchEvent(ev);
    }
}
