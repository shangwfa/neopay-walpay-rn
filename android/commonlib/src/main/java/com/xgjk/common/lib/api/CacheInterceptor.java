package com.xgjk.common.lib.api;

import com.xgjk.common.lib.base.BaseApp;
import com.xgjk.common.lib.utils.AppUtils;

import java.io.IOException;

import okhttp3.CacheControl;
import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;

/**
 * Created by shangwf on 2017/4/28.
 */

public class CacheInterceptor implements Interceptor {
    @Override
    public Response intercept(Chain chain) throws IOException {
        Request request = chain.request();

        if (!AppUtils.isNetworkAvailable(BaseApp.application)) {
            // 没网强制从缓存读取
            request = request.newBuilder()
                    .cacheControl(CacheControl.FORCE_CACHE)
                    .build();
        }

        Response response = chain.proceed(request);
        Response responseLatest;

        if (AppUtils.isNetworkAvailable(BaseApp.application)) {
            // 有网时候读接口上的@Headers里的配置
            String cacheControl = request.cacheControl().toString();
            responseLatest = response.newBuilder()
                    .removeHeader("Pragma")
                    .removeHeader("Cache-Control")
                    .header("Cache-Control", cacheControl)
                    .build();
        } else {
            int maxStale = 60 * 60 * 24 * 7; // 没网一周后失效
            responseLatest = response.newBuilder()
                    .removeHeader("Pragma")
                    .removeHeader("Cache-Control")
                    .header("Cache-Control", "public, only-if-cached, max-stale=" + maxStale)
                    .build();
        }
        return responseLatest;
    }
}
