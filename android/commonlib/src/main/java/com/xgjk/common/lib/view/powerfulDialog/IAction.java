package com.xgjk.common.lib.view.powerfulDialog;

import android.app.Dialog;

/**
 * Created by shangwf on 2017/6/20.
 */

public interface IAction<T> {
    void action(T t, Dialog dialog);
}
