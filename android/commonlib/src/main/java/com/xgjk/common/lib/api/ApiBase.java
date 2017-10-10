package com.xgjk.common.lib.api;

import com.orhanobut.logger.Logger;
import com.shanbay.mock.MockApiInterceptor;
import com.shanbay.mock.MockApiSuite;
import com.xgjk.common.lib.base.BaseApp;

import okhttp3.OkHttpClient;
import retrofit2.Retrofit;
import retrofit2.adapter.rxjava.RxJavaCallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * Created by shangwf on 2017/7/19.
 */

public abstract class ApiBase {
    public static Retrofit mRetrofit;

    public void init(boolean isDebug, OkHttpClient.Builder builder, String baseUrl) {

        MockApiInterceptor mockApiInterceptor = new MockApiInterceptor(BaseApp.application);
        mockApiInterceptor.addMockApiSuite(getMockApiSuite());

        if (isDebug) {
            builder.addInterceptor(new LogInterceptor());
            builder.addInterceptor(mockApiInterceptor);
        }

        mRetrofit = new Retrofit.Builder()
                .client(builder.build())
                .addConverterFactory(GsonConverterFactory.create())
                .addCallAdapterFactory(RxJavaCallAdapterFactory.create())
                .baseUrl(baseUrl)
                .build();
        Logger.d("BaseUrl--->" + baseUrl);


    }

    /**
     * mock接口数据
     */
    public abstract MockApiSuite getMockApiSuite();
}
