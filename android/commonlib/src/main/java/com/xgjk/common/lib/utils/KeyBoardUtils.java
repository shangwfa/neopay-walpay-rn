package com.xgjk.common.lib.utils;

import android.app.Activity;
import android.content.Context;
import android.graphics.Rect;
import android.view.View;
import android.view.ViewTreeObserver;
import android.view.inputmethod.EditorInfo;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;

/**
 * Created by shangwf on 2017/4/29.
 */

public class KeyBoardUtils {
    /**
     * 打开软键盘
     *
     * @param //mEditText输入框
     * @param //mContext上下文
     */
    public static void openKeybord(EditText mEditText, Context mContext) {
        InputMethodManager imm = (InputMethodManager) mContext
                .getSystemService(Context.INPUT_METHOD_SERVICE);
        imm.showSoftInput(mEditText, InputMethodManager.RESULT_SHOWN);
        imm.toggleSoftInput(InputMethodManager.SHOW_FORCED,
                InputMethodManager.HIDE_IMPLICIT_ONLY);
    }

    /**
     * 打开数字软键盘
     *
     * @param //mEditText输入框
     * @param //mContext上下文
     */
    public static void openKeybordNum(EditText mEditText, Context mContext) {
        mEditText.setInputType(EditorInfo.TYPE_CLASS_PHONE);
        InputMethodManager imm = (InputMethodManager) mContext
                .getSystemService(Context.INPUT_METHOD_SERVICE);
        imm.showSoftInput(mEditText, InputMethodManager.RESULT_SHOWN);
        imm.toggleSoftInput(InputMethodManager.SHOW_FORCED,
                InputMethodManager.HIDE_IMPLICIT_ONLY);
    }

    /**
     *延迟打开键盘
     *
     * @param //mEditText输入框
     * @param //mContext上下文
     */
    public static void openKeybordDelay(final EditText mEditText, final Context mContext) {
        mEditText.postDelayed(new Runnable() {
            @Override
            public void run() {
                InputMethodManager imm = (InputMethodManager) mContext
                        .getSystemService(Context.INPUT_METHOD_SERVICE);
                imm.showSoftInput(mEditText, InputMethodManager.RESULT_SHOWN);
                imm.toggleSoftInput(InputMethodManager.SHOW_FORCED,
                        InputMethodManager.HIDE_IMPLICIT_ONLY);
            }
        }, 500);

    }

    /**
     * 延迟打开数字键盘
     *
     * @param //mEditText输入框
     * @param //mContext上下文
     */
    public static void openKeybordNumDelay(final EditText mEditText, final Context mContext) {
        mEditText.postDelayed(new Runnable() {
            @Override
            public void run() {
                mEditText.setInputType(EditorInfo.TYPE_CLASS_NUMBER);
                InputMethodManager imm = (InputMethodManager) mContext
                        .getSystemService(Context.INPUT_METHOD_SERVICE);
                imm.showSoftInput(mEditText, InputMethodManager.RESULT_SHOWN);
                imm.toggleSoftInput(InputMethodManager.SHOW_FORCED,
                        InputMethodManager.HIDE_IMPLICIT_ONLY);
            }
        }, 500);

    }

    /**
     * 关闭软键盘
     *
     * @param //mEditText输入框
     * @param //mContext上下文
     */
    public static void closeKeybord(EditText mEditText, Context mContext) {
        InputMethodManager imm = (InputMethodManager) mContext.getSystemService(Context.INPUT_METHOD_SERVICE);

        imm.hideSoftInputFromWindow(mEditText.getWindowToken(), 0);
    }

    /**
     * 关闭软键盘
     *
     * @param //mEditText输入框
     * @param //mContext上下文
     */
    public static void closeKeybord(Activity mContext) {
        try {
            InputMethodManager imm = (InputMethodManager) mContext.getSystemService(Context.INPUT_METHOD_SERVICE);
            boolean isOpen=imm.isActive();
            View v = mContext.getCurrentFocus();
            if ((isOpen)&&(v != null)&&(v.getWindowToken()!=null)) {
                imm.hideSoftInputFromWindow(v.getWindowToken(), 0);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    /**
     * @param root         最外层布局，需要调整的布局
     * @param scrollToView 被键盘遮挡的scrollToView，并且此时scrollToview不可见时。滚动root,使scrollToView在root可视区域的底部
     */
    public static void controlKeyboardLayout(final View root, final View scrollToView) {
        root.getViewTreeObserver().addOnGlobalLayoutListener(new ViewTreeObserver.OnGlobalLayoutListener() {
            @Override
            public void onGlobalLayout() {
                Rect rect = new Rect();
                // 获取root在窗体的可视区域
                root.getWindowVisibleDisplayFrame(rect);
                // 获取root在窗体的不可视区域高度(被其他View遮挡的区域高度)
                int rootInvisibleHeight = root.getRootView().getHeight() - rect.bottom;
                // 若不可视区域高度大于100，则键盘显示
                if (rootInvisibleHeight > 100) {
                    int[] location = new int[2];
                    // 获取scrollToView在窗体的坐标
                    scrollToView.getLocationInWindow(location);
                    // 计算root滚动高度，使scrollToView在可见区域
                    int srollHeight = (location[1] + scrollToView.getHeight()) - rect.bottom;
                    if (srollHeight > 0) {
                        //scrollToview在root的可见区域外（即scrollTOview不可见）
                        //scrollHeihth<0即表示scrollToView可见，就不需要滚动
                        root.scrollTo(0, srollHeight + root.getScrollY());
                    }

                }
//                else {
//                    // 键盘隐藏,不做处理
//                    root.scrollTo(0, 0);
//                }
            }
        });
    }
}
