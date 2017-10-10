package com.xgjk.common.lib.view.keyboard;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.Typeface;
import android.graphics.drawable.Drawable;
import android.inputmethodservice.Keyboard;
import android.inputmethodservice.KeyboardView;
import android.util.AttributeSet;

import com.xgjk.common.lib.R;

import java.lang.reflect.Field;
import java.util.List;

/**
 * Created by shangwf on 2017/5/4.
 */

public class NumKeyBoardView extends KeyboardView {

    private Context mContext;
    private Keyboard mKeyBoard;

    public NumKeyBoardView(Context context, AttributeSet attrs) {
        super(context, attrs);
        initView(context);
    }

    public NumKeyBoardView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        initView(context);
    }

    private void initView(Context context) {
        mContext = context;
        mKeyBoard = getKeyboard();
    }

    /**
     * 重新画一些按键
     */
    @Override
    public void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        mKeyBoard = this.getKeyboard();
        List<Keyboard.Key> keys = null;
        if (mKeyBoard != null) {
            keys = mKeyBoard.getKeys();
        }

        if (keys != null) {
            for (Keyboard.Key key : keys) {
                // 数字键盘的处理
                if (key.codes[0] == Keyboard.KEYCODE_DONE) {
                    drawKeyBackground(R.drawable.ensure_keyboardview_bg, canvas, key);
                    drawText(canvas, key, Color.WHITE);
                }
            }
        }
    }

    private void drawKeyBackground(int drawableId, Canvas canvas, Keyboard.Key key) {
        Drawable npd = mContext.getResources().getDrawable(
                drawableId);
        int[] drawableState = key.getCurrentDrawableState();
        if (key.codes[0] != 0) {
            npd.setState(drawableState);
        }
        npd.setBounds(key.x, key.y, key.x + key.width, key.y
                + key.height);
        npd.draw(canvas);
    }

    private void drawText(Canvas canvas, Keyboard.Key key, int color) {
        Rect bounds = new Rect();
        Paint paint = new Paint();
        paint.setTextAlign(Paint.Align.CENTER);


        paint.setAntiAlias(true);

        paint.setColor(color);
        if (key.label != null) {
            String label = key.label.toString();

            Field field;

            if (label.length() > 1 && key.codes.length < 2) {
                int labelTextSize = 0;
                try {
                    field = KeyboardView.class.getDeclaredField("mLabelTextSize");
                    field.setAccessible(true);
                    labelTextSize = (int) field.get(this);
                } catch (NoSuchFieldException e) {
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
                paint.setTextSize(labelTextSize);
                paint.setTypeface(Typeface.DEFAULT_BOLD);
            } else {
                int keyTextSize = 0;
                try {
                    field = KeyboardView.class.getDeclaredField("mLabelTextSize");
                    field.setAccessible(true);
                    keyTextSize = (int) field.get(this);
                } catch (NoSuchFieldException e) {
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
                paint.setTextSize(keyTextSize);
                paint.setTypeface(Typeface.DEFAULT);
            }

            paint.getTextBounds(key.label.toString(), 0, key.label.toString()
                    .length(), bounds);
            canvas.drawText(key.label.toString(), key.x + (key.width / 2),
                    (key.y + key.height / 2) + bounds.height() / 2, paint);
        } else if (key.icon != null) {
            key.icon.setBounds(key.x + (key.width - key.icon.getIntrinsicWidth()) / 2, key.y + (key.height - key.icon.getIntrinsicHeight()) / 2,
                    key.x + (key.width - key.icon.getIntrinsicWidth()) / 2 + key.icon.getIntrinsicWidth(), key.y + (key.height - key.icon.getIntrinsicHeight()) / 2 + key.icon.getIntrinsicHeight());
            key.icon.draw(canvas);
        }

    }
}
