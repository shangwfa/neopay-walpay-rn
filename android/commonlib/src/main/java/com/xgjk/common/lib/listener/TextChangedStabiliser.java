package com.xgjk.common.lib.listener;

import android.os.Handler;
import android.os.Looper;
import android.text.Editable;
import android.text.TextWatcher;
import android.widget.EditText;

/**
 * Created by shangwf on 2017/5/2.
 * EditText 稳定的监听
 */

public abstract class TextChangedStabiliser implements TextWatcher, IOnTextStableChanged{

    private final long stabiliserMills;
    private final EditText editText;
    private final Handler handler = new Handler(Looper.getMainLooper());

    public TextChangedStabiliser(long stabiliserMills, EditText editText) {
        this.stabiliserMills = stabiliserMills;
        this.editText = editText;
    }

    @Override
    public void beforeTextChanged(CharSequence s, int start, int count, int after) {
        //do nothing
    }

    @Override
    public void onTextChanged(CharSequence s, int start, int before, int count) {
        //do nothing
    }

    @Override
    public void afterTextChanged(final Editable s) {
        try {
            final CharSequence originCS = s.toString();
            handler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    try {
                        final CharSequence nowCS = editText.getText().toString();
                        if(nowCS != null && nowCS.equals(originCS)) {
                            onTextStableChanged(originCS);
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }, stabiliserMills);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
