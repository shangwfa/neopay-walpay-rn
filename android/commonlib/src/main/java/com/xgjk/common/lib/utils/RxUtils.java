package com.xgjk.common.lib.utils;

import rx.Observable;
import rx.android.schedulers.AndroidSchedulers;
import rx.schedulers.Schedulers;

/**
 * Created by shangwf on 2017/6/26.
 */

public class RxUtils {
    public static <T> Observable.Transformer<T, T> applySchedulers() {
//        return observable -> observable.subscribeOn(Schedulers.io())
//                .subscribeOn(AndroidSchedulers.mainThread());
        return new Observable.Transformer<T, T>() {
            @Override
            public Observable<T> call(Observable<T> observable) {
                return observable.subscribeOn(Schedulers.io())
                        .subscribeOn(AndroidSchedulers.mainThread());
            }
        };

    }

}
