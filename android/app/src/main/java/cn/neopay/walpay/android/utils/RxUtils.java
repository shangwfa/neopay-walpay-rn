package cn.neopay.walpay.android.utils;

import cn.neopay.walpay.android.http.Result;
import cn.neopay.walpay.android.http.ResultFilter;
import rx.Observable;
import rx.android.schedulers.AndroidSchedulers;
import rx.schedulers.Schedulers;

/**
 * Created by shangwf on 2017/6/28.
 */

public class RxUtils {
    public static <T> Observable.Transformer<Result<T>, T> rxNet() {
        return observable -> observable
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .map(new ResultFilter<>());

    }
}