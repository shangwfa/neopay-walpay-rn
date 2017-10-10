package com.xgjk.common.lib.view.keyboard;

import android.app.Activity;
import android.content.Context;
import android.inputmethodservice.Keyboard;
import android.os.Build;
import android.text.InputType;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;

import com.xgjk.common.lib.base.BaseApp;

import java.lang.reflect.Method;

/**
 * Created by shangwf on 2017/5/4.
 */

public class KeyboardViewUtils {

    /**
     * 显示自定义键盘
     */
    public static void showKeyboard(Activity activity, NumKeyBoardView keyBoardView, int xmlId, EditText editText, View.OnClickListener ensureListener) {
        hideSystemKeyboard(BaseApp.application, editText);
        keyBoardView.setKeyboard(new Keyboard(activity, xmlId));
        keyBoardView.setEnabled(true);
        keyBoardView.setPreviewEnabled(false);
        keyBoardView.setVisibility(View.VISIBLE);
        keyBoardView.setOnKeyboardActionListener(new KeyboardActionListener(editText, ensureListener));

    }

    /**
     * 隐藏系统键盘
     */
    public static void hideSystemKeyboard(Context context, EditText editText) {
        int sdkInt = Build.VERSION.SDK_INT;
        if (sdkInt >= 11) {
            try {
                Class<EditText> cls = EditText.class;
                Method setShowSoftInputOnFocus;
                setShowSoftInputOnFocus = cls.getMethod("setShowSoftInputOnFocus", boolean.class);
                setShowSoftInputOnFocus.setAccessible(true);
                setShowSoftInputOnFocus.invoke(editText, false);

            } catch (SecurityException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            editText.setInputType(InputType.TYPE_NULL);
        }
        // 如果软键盘已经显示，则隐藏
        InputMethodManager imm = (InputMethodManager) context.getSystemService(Context.INPUT_METHOD_SERVICE);
        imm.hideSoftInputFromWindow(editText.getWindowToken(), 0);
    }
}
