package com.xgjk.common.lib.view.rollViewPager.hintview;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.GradientDrawable;

import com.xgjk.common.lib.view.rollViewPager.Util;

/**
 * Created by menmen on 16/7/5.
 */

public class RectangleHintView extends ShapeHintView {
    private int focusColor;
    private int normalColor;
    public RectangleHintView(Context context, int focusColor, int normalColor) {
        super(context);
        this.focusColor = focusColor;
        this.normalColor = normalColor;
    }

    @Override
    public Drawable makeFocusDrawable() {
        GradientDrawable dot_focus = new GradientDrawable();
        dot_focus.setColor(focusColor);
        dot_focus.setSize(Util.dip2px(getContext(), 3), Util.dip2px(getContext(), 3));
        return dot_focus;
    }

    @Override
    public Drawable makeNormalDrawable() {
        GradientDrawable dot_normal = new GradientDrawable();
        dot_normal.setColor(normalColor);
        dot_normal.setSize(Util.dip2px(getContext(), 3), Util.dip2px(getContext(), 3));
        return dot_normal;
    }
}
