package com.xgjk.common.lib.view;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.support.v4.view.ViewPager;
import android.support.v4.view.ViewPager.OnPageChangeListener;
import android.util.AttributeSet;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.xgjk.common.lib.R;
import com.xgjk.common.lib.utils.DensityUtils;

public class SimpleViewPagerIndicator extends LinearLayout {

    private int COLOR_TEXT_NORMAL = 0xFF999999;
    private int COLOR_INDICATOR_COLOR = 0xFFFF712B;


    private String[] mTitles;
    private int mTabCount = 1;
    private int mIndicatorColor = COLOR_INDICATOR_COLOR;
    private float mTranslationX;
    private Paint mPaint = new Paint();
    private Paint mPaintLine = new Paint();
    private int mTabWidth;
    private int sreenWidth;
    private ViewPager viewPager;
    private int oldPosition = 0;
    private boolean isFirst = true;
    private boolean isShowBottomLine;
    private int mStrokeWidth;
    private int minusWidth;

    public SimpleViewPagerIndicator(Context context) {
        this(context, null);
    }

    public SimpleViewPagerIndicator(Context context, AttributeSet attrs) {
        super(context, attrs);
        TypedArray array = context.obtainStyledAttributes(attrs, R.styleable.SimpleViewPagerIndicator);
        mIndicatorColor = array.getColor(R.styleable.SimpleViewPagerIndicator_mIndicatorColor, COLOR_INDICATOR_COLOR);     // 获取画笔颜色
        isShowBottomLine = array.getBoolean(R.styleable.SimpleViewPagerIndicator_is_show_bottom_line, true);
        COLOR_TEXT_NORMAL = array.getColor(R.styleable.SimpleViewPagerIndicator_mTextColor, COLOR_TEXT_NORMAL);
        COLOR_INDICATOR_COLOR = array.getColor(R.styleable.SimpleViewPagerIndicator_mTextColorSelcet, COLOR_INDICATOR_COLOR);
        mStrokeWidth = array.getInt(R.styleable.SimpleViewPagerIndicator_mStrokeWidth, 0);
        mPaint.setColor(mIndicatorColor);
        if (mStrokeWidth != 0) {
            mPaint.setStrokeWidth(DensityUtils.dip2px(context, mStrokeWidth));
        } else {
            mPaint.setStrokeWidth(9.0F);
        }
        minusWidth = DensityUtils.dip2px(context, array.getInt(R.styleable.SimpleViewPagerIndicator_minusWidth, 0));
        //分割线的颜色默认为灰色
        int divideColor = context.getResources().getColor(R.color.common_orange);
        mPaintLine.setColor(divideColor);
        mPaintLine.setStrokeWidth(7.0F);
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);
        if (isFirst) {
            mTabWidth = w / mTabCount - minusWidth;
            sreenWidth = w;
            isFirst = false;
        }

    }

    public void setTitles(String[] titles) {
        mTitles = titles;
        mTabCount = titles.length;
        generateTitleView();

    }


    public void setViewPager(ViewPager viewPager) {
        this.viewPager = viewPager;
        this.viewPager.setOnPageChangeListener(new OnPageChangeListener() {

            @Override
            public void onPageSelected(int arg0) {
                if (oldPosition == arg0) {
                    ((TextView) getChildAt(arg0)).setTextColor(COLOR_TEXT_NORMAL);
                } else {
                    ((TextView) getChildAt(oldPosition)).setTextColor(COLOR_TEXT_NORMAL);
                    ((TextView) getChildAt(arg0)).setTextColor(COLOR_TEXT_NORMAL);
                    if (0 == arg0 && mRefreshCallback != null) {
                        mRefreshCallback.refreshCallback();
                    }
                }
                oldPosition = arg0;
            }

            @Override
            public void onPageScrolled(int arg0, float arg1, int arg2) {
                scroll(arg0, arg1);
            }

            @Override
            public void onPageScrollStateChanged(int arg0) {

            }
        });
    }

    @Override
    protected void dispatchDraw(Canvas canvas) {
        super.dispatchDraw(canvas);
        canvas.save();
        canvas.translate(mTranslationX, getHeight() - 4);
        canvas.drawLine(minusWidth, 0, mTabWidth, 0, mPaint);
        canvas.restore();
        canvas.translate(0, getHeight() - 1);
        if (isShowBottomLine) {
            canvas.drawLine(0, 0, sreenWidth, 0, mPaintLine);
        }

    }

    public void scroll(int position, float offset) {
        /**
         * <pre>
         *  0-1:position=0 ;1-0:postion=0;
         * </pre>
         */
        mTranslationX = getWidth() / mTabCount * (position + offset);
        invalidate();

    }

    @Override
    public boolean dispatchTouchEvent(MotionEvent ev) {
        return super.dispatchTouchEvent(ev);
    }

    private void generateTitleView() {
        if (getChildCount() > 0)
            this.removeAllViews();
        int count = mTitles.length;

        setWeightSum(count);
        for (int i = 0; i < count; i++) {
            TextView tv = new TextView(getContext());
            LayoutParams lp = new LayoutParams(0, LayoutParams.MATCH_PARENT);
            lp.weight = 1;
            tv.setTag(i);
            tv.setGravity(Gravity.CENTER);
            if (i == 0) {
                tv.setTextColor(COLOR_TEXT_NORMAL);
            } else {
                tv.setTextColor(COLOR_TEXT_NORMAL);

            }
            tv.setText(mTitles[i]);
            tv.setTextSize(TypedValue.COMPLEX_UNIT_SP, 15);
            tv.setLayoutParams(lp);

            tv.setOnClickListener(new OnClickListener() {

                @Override
                public void onClick(View arg0) {
                    int position = (Integer) arg0.getTag();
                    if (viewPager != null && viewPager.getVisibility() != View.GONE) {
                        viewPager.setCurrentItem(position);

                    }
                }
            });
            addView(tv);
        }
    }


    public void setIndicator(int position) {
        for (int i = 0; i < getChildCount(); i++) {
            if (i == position) {
                ((TextView) getChildAt(i)).setTextColor(mIndicatorColor);
            }
            ((TextView) getChildAt(i)).setTextColor(COLOR_TEXT_NORMAL);
        }
        invalidate();
    }

    public void setCurrentItem(int position) {
        if (viewPager != null) {
            viewPager.setCurrentItem(position);
        }
    }

    private UpdateRefreshCallback mRefreshCallback;

    public void setUpdateRefreshCallback(UpdateRefreshCallback mRefreshCallback) {
        this.mRefreshCallback = mRefreshCallback;
    }

    public interface UpdateRefreshCallback {
        void refreshCallback();
    }
}
