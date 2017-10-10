package com.xgjk.common.lib.utils;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Environment;

import java.io.File;

import static android.os.Environment.DIRECTORY_DOWNLOADS;


/**
 * Created by shangwf on 2017/7/25.
 */

public class AppUpadteUtils {

    public static void download(final Activity activity, String url, DownloadUtil.OnDownloadListener onDownloadListener) {
        final String fileName = AppUtils.getAppName(activity) + ".apk";
        final String filePath = Environment.getExternalStoragePublicDirectory(DIRECTORY_DOWNLOADS).getPath();
        final String apkPathName = filePath + File.separator + fileName;
        DownloadUtil.get().downloadApp(url, apkPathName, onDownloadListener);
    }

    // 安装应用
    public static void installPackage(Activity activity, String apkPathName) {
        Intent intent = new Intent();
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setAction(Intent.ACTION_VIEW);
        intent.setDataAndType(Uri.fromFile(new File(apkPathName)), "application/vnd.android.package-archive");
        activity.startActivity(intent);
    }
}
