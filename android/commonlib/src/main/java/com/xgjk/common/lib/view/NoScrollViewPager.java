package com.xgjk.common.lib.view;

import android.annotation.SuppressLint;
import android.content.Context;
import android.support.v4.view.ViewPager;
import android.util.AttributeSet;
import android.view.MotionEvent;




public class NoScrollViewPager extends ViewPager {
	//默认可滑动
    private boolean noScroll = false;

    public NoScrollViewPager(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public NoScrollViewPager(Context context) {
        super(context);
    }

    
    /**
     * 设置viewpager是否可滑动
     * @param noScroll
     */
    public void setNoScroll(boolean noScroll) {
        this.noScroll = noScroll;
    }

    @Override
    public void scrollTo(int x, int y) {
        super.scrollTo(x, y);
    }

    @SuppressLint("ClickableViewAccessibility") 
    @Override
    public boolean onTouchEvent(MotionEvent event) {
        if (noScroll)
            return false;
        else
            return super.onTouchEvent(event);
    }

    @Override
    public boolean onInterceptTouchEvent(MotionEvent event) {
        if (noScroll)
            return false;
        else
            return super.onInterceptTouchEvent(event);
    }

    @Override
    public void setCurrentItem(int item, boolean smoothScroll) {
        super.setCurrentItem(item, false);
    }

    @Override
    public void setCurrentItem(int item) {
        this.setCurrentItem(item,false);
    }

}