package com.xgjk.common.lib.utils;

import com.xgjk.common.lib.base.BaseApp;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

/**
 * Created by shangwf on 2017/7/31.
 */

public class DownloadUtil {
    private static DownloadUtil downloadUtil;
    private final OkHttpClient okHttpClient;

    public static DownloadUtil get() {
        if (downloadUtil == null) {
            downloadUtil = new DownloadUtil();
        }
        return downloadUtil;
    }

    private DownloadUtil() {
        okHttpClient = new OkHttpClient();
    }

    public void downloadApp(final String url, final String apkPathName, final OnDownloadListener listener) {
        Request request = new Request.Builder().url(url).build();
        if(NetWorkUtils.isNoConnectedByState(BaseApp.application)) {
            ToastUtils.show("似乎已断开与互联网连接，请检查网络设置");
            return;
        }

        okHttpClient.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                // 下载失败
                listener.onDownloadFailed();
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                InputStream is = null;
                byte[] buf = new byte[2048];
                int len ;
                FileOutputStream fos = null;
                // 储存下载文件的目录
                try {
                    is = response.body().byteStream();
                    long total = response.body().contentLength();
                    File file = new File(apkPathName);
                    fos = new FileOutputStream(file);
                    long sum = 0;
                    while ((len = is.read(buf)) != -1) {
                        fos.write(buf, 0, len);
                        sum += len;
                        final int progress = (int) (sum * 1.0f / total * 100);
                        // 下载中
                        HandlerUtils.runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                listener.onDownloading(progress);
                            }
                        });

                    }
                    fos.flush();
                    // 下载完成
                    HandlerUtils.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            listener.onDownloadSuccess();
                        }
                    });

                } catch (Exception e) {
                    HandlerUtils.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            listener.onDownloadFailed();
                        }
                    });

                } finally {
                    try {
                        if (is != null)
                            is.close();

                        if (fos != null)
                            fos.close();

                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        });
    }

    public interface OnDownloadListener {
        /**
         * 下载成功
         */
        void onDownloadSuccess();

        /**
         * @param progress 下载进度
         */
        void onDownloading(int progress);

        /**
         * 下载失败
         */
        void onDownloadFailed();
    }

}
