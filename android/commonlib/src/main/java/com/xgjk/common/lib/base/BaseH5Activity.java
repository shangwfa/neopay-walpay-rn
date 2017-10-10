package com.xgjk.common.lib.base;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.KeyEvent;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.LinearLayout;

import com.alibaba.android.arouter.launcher.ARouter;
import com.gyf.barlibrary.ImmersionBar;
import com.just.library.AgentWeb;
import com.just.library.ChromeClientCallbackManager;
import com.orhanobut.logger.Logger;
import com.xgjk.common.lib.R;
import com.xgjk.common.lib.utils.NetWorkUtils;
import com.xgjk.common.lib.view.BaseHeader;

/**
 * Created by shangwf on 2017/8/17.
 */

public abstract class BaseH5Activity extends AppCompatActivity {
    protected AgentWeb mAgentWeb;
    private LinearLayout mLinearLayout;
    private BaseHeader mHeader;


    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        ImmersionBar.with(this)
                .statusBarColor(R.color.common_white)
                .fitsSystemWindows(true)
                .statusBarDarkFont(true, 1) //原理：如果当前设备支持状态栏字体变色，会设置状态栏字体为黑色，如果当前设备不支持状态栏字体变色，会使当前状态栏加上透明度，否则不执行透明度
                .init();
        setContentView(R.layout.activity_base_h5);
        ARouter.getInstance().inject(this);

        mLinearLayout = (LinearLayout) this.findViewById(R.id.container);
        mHeader = (BaseHeader) findViewById(R.id.common_header);

        long p = System.currentTimeMillis();

        mAgentWeb = AgentWeb.with(this)
                .setAgentWebParent(mLinearLayout, new LinearLayout.LayoutParams(-1, -1))//
                .useDefaultIndicator()
                .defaultProgressBarColor()
                .setReceivedTitleCallback(mCallback)
                .setWebChromeClient(mWebChromeClient)
                .setWebViewClient(mWebViewClient)
                .setSecutityType(AgentWeb.SecurityType.strict)
                .createAgentWeb()
                .ready()
                .go(loadUrl());

        long n = System.currentTimeMillis();
        Logger.i("Info", "init used time:" + (n - p));


    }

    private WebViewClient mWebViewClient = new WebViewClient() {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            return super.shouldOverrideUrlLoading(view, request);
        }

        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {
            //do you  work
            Logger.i("Info", "BaseWebActivity onPageStarted");
        }
    };
    private WebChromeClient mWebChromeClient = new WebChromeClient() {
        @Override
        public void onProgressChanged(WebView view, int newProgress) {
            //do you work
            Logger.i("Info", "progress:" + newProgress);
        }
    };

    protected abstract String loadUrl();

    private ChromeClientCallbackManager.ReceivedTitleCallback mCallback = new ChromeClientCallbackManager.ReceivedTitleCallback() {
        @Override
        public void onReceivedTitle(WebView view, String title) {
            mHeader.setHeaderLeftImg(title);
        }
    };


    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {

        if (mAgentWeb.handleKeyEvent(keyCode, event)) {
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    protected void onPause() {
        mAgentWeb.getWebLifeCycle().onPause();
        super.onPause();

    }

    @Override
    protected void onResume() {
        mAgentWeb.getWebLifeCycle().onResume();
        super.onResume();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {

        Logger.i("Info", "result:" + requestCode + " result:" + resultCode);
        mAgentWeb.uploadFileResult(requestCode, resultCode, data);
        super.onActivityResult(requestCode, resultCode, data);
    }


    @Override
    protected void onDestroy() {
        super.onDestroy();
        mAgentWeb.getWebLifeCycle().onDestroy();
        mAgentWeb.clearWebCache();//清除缓存
    }
}
