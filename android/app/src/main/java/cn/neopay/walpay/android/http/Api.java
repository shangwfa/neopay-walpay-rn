package cn.neopay.walpay.android.http;

import com.shanbay.mock.MockApiSuite;
import com.shanbay.mock.api.StandardMockApi;
import com.shanbay.mock.constant.MockHttpMethod;
import com.xgjk.common.lib.api.ApiBase;

import java.util.concurrent.TimeUnit;

import cn.neopay.walpay.android.BuildConfig;
import cn.neopay.walpay.android.manager.environmentmanager.EnvironmentConfigManager;
import okhttp3.OkHttpClient;

/**
 * @author carlos.guo
 * @date 2017/9/21
 * @describe
 */

public class Api extends ApiBase {
    // 连接超时时间，默认10秒
    public static final int CONNECT_TIMEOUT = 10;
    public static final int CONNECT_LONG_TIMEOUT = 20;
    private static ApiService mApiService;
    private static OkHttpClient.Builder mBuilder;


    private static class Holder {
        private final static Api instance = new Api();
    }

    private Api() {
        init();
    }

    public static Api getInstance() {
        return Holder.instance;
    }


    public void init() {
        mBuilder = new OkHttpClient.Builder().connectTimeout(CONNECT_TIMEOUT, TimeUnit.SECONDS).addInterceptor(new CommonInterceptor());
        super.init(BuildConfig.DEBUG, mBuilder, EnvironmentConfigManager.getSingleton().getCurrentEnvHttpUrl());

        mApiService = mRetrofit.create(ApiService.class);
    }

    public ApiService getApiService() {
        if (mApiService == null) {
            init();
        }
        return mApiService;
    }

    @Override
    public MockApiSuite getMockApiSuite() {
        MockApiSuite suite = new MockApiSuite("api"); // account 表示 suite name
//        getMockApis(suite);
        return suite;
    }

    private void getMockApis(MockApiSuite suite) {
        suite.addMockApi(new StandardMockApi(MockHttpMethod.POST, "/employee/login").setSuccessDataFile("empty.json"));
        suite.addMockApi(new StandardMockApi(MockHttpMethod.POST, "/bank/binding_bank_card").setSuccessDataFile("empty.json"));
    }


    public static void connectTimeout(long connectTimeout) {
        mBuilder.connectTimeout(connectTimeout, TimeUnit.SECONDS);
    }
}