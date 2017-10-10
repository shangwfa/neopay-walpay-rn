package com.xgjk.common.lib.view.keyboard;

import android.inputmethodservice.Keyboard;
import android.inputmethodservice.KeyboardView;
import android.text.Editable;
import android.view.View;
import android.widget.EditText;

/**
 * Created by shangwf on 2017/5/4.
 */

public class KeyboardActionListener implements KeyboardView.OnKeyboardActionListener {
    private EditText mEditText;
    private View.OnClickListener mEnsureListener;

    public KeyboardActionListener(EditText mEditText, View.OnClickListener mEnsureListener) {
        this.mEditText = mEditText;
        this.mEnsureListener = mEnsureListener;
    }

    @Override
    public void onPress(int primaryCode) {

    }

    @Override
    public void onRelease(int primaryCode) {

    }

    @Override
    public void onKey(int primaryCode, int[] keyCodes) {
        Editable editable = mEditText.getText();
        int start = mEditText.getSelectionStart();
        if (primaryCode == -10) {// 清零
            if (editable != null && editable.length() > 0) {
                if (start > 0) {
                    editable.delete(0, start);
                }
            }
        } else if (primaryCode == Keyboard.KEYCODE_DONE) {//确认回调
            mEnsureListener.onClick(mEditText.getRootView());
        } else if (primaryCode == -5) {//加
            editable.insert(start, "+");
        } else {
            editable.insert(start, Character.toString((char) primaryCode));
        }
    }

    @Override
    public void onText(CharSequence text) {

    }

    @Override
    public void swipeLeft() {

    }

    @Override
    public void swipeRight() {

    }

    @Override
    public void swipeDown() {

    }

    @Override
    public void swipeUp() {

    }
}
