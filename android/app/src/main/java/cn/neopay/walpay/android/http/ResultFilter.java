package cn.neopay.walpay.android.http;

import rx.functions.Func1;

/**
 * Created by shangwf on 2017/5/16.
 */

public class ResultFilter<T> implements Func1<Result<T>, T> {


    @Override
    public T call(Result<T> response) {
        if (IRetCode.successCode == response.getRetCode()) {//成功处理
            return response.getData();
        } else {
            throw new ApiException(response.getRetCode(), response.getRetMsg());
        }
    }
}
