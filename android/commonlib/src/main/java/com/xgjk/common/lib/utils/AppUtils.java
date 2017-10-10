package com.xgjk.common.lib.utils;

import android.app.ActivityManager;
import android.app.KeyguardManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Parcelable;
import android.text.TextUtils;

import com.xgjk.common.lib.base.BaseApp;

import java.io.File;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by shangwf on 2017/4/28.
 */

public class AppUtils {

    // 判断网络是否可用
    public static boolean isNetworkAvailable(Context context) {
        try {
            ConnectivityManager connectivity = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
            if (connectivity != null) {
                NetworkInfo info = connectivity.getActiveNetworkInfo();
                if (info != null && info.isConnected()) {
                    if (info.getState() == NetworkInfo.State.CONNECTED) {
                        return true;
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return false;
    }

    // 获取当前应用的版本号
    public static String getVersionName(Context context) {
        try {
            PackageManager packageManager = context.getPackageManager();
            PackageInfo packInfo = packageManager.getPackageInfo(context.getPackageName(), 0);
            String version = packInfo.versionName;
            if (!TextUtils.isEmpty(version)) {
                return "V" + version;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "V1.0";
    }

    // 获取当前应用的版本号
    public static int getVersionCode(Context context) {
        try {
            PackageManager packageManager = context.getPackageManager();
            PackageInfo packInfo = packageManager.getPackageInfo(context.getPackageName(), 0);
            return packInfo.versionCode;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 1;
    }

    // 获取MAC地址
    public static String getLocalMacAddress(Context context) {
        try {
            WifiManager wifi = (WifiManager) context.getSystemService(Context.WIFI_SERVICE);
            WifiInfo info = wifi.getConnectionInfo();
            String mac = info.getMacAddress();
            mac = mac.replace(":", "");
            return mac;
        } catch (Exception e) {
            return "00000000";
        }
    }

    /**
     * 安装软件
     */
    public static void installApk(Context mContext, String apkPathName) {
        Uri uri = Uri.fromFile(new File(apkPathName));
        Intent install = new Intent(Intent.ACTION_VIEW);
        install.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        install.setDataAndType(uri, "application/vnd.android.package-archive");
        // 执行意图进行安装
        mContext.startActivity(install);
    }

    /**
     * 卸载软件
     */
    public static void uninstallApk(Context context, String packageName) {
        Intent intent = new Intent(Intent.ACTION_DELETE);
        Uri packageURI = Uri.parse("package:" + packageName);
        intent.setData(packageURI);
        context.startActivity(intent);
    }

    public static boolean isLockScreen() {
        final Context context = BaseApp.application.getApplicationContext();
        KeyguardManager mKeyguardManager = (KeyguardManager) context.getSystemService(Context.KEYGUARD_SERVICE);
        return !mKeyguardManager.inKeyguardRestrictedInputMode();
    }

    public static boolean isBackground(Context context) {
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningAppProcessInfo> appProcesses = activityManager.getRunningAppProcesses();
        for (ActivityManager.RunningAppProcessInfo appProcess : appProcesses) {
            if (appProcess.processName.equals(context.getPackageName())) {
                return appProcess.importance == ActivityManager.RunningAppProcessInfo.IMPORTANCE_BACKGROUND;
            }
        }
        return false;
    }

    public static void createDeskShortCut(Context cxt, String shortCutName, int icon, Class<?> cls) {
        Intent shortcutIntent = new Intent("com.android.launcher.action.INSTALL_SHORTCUT");
        shortcutIntent.putExtra("duplicate", false);
        shortcutIntent.putExtra(Intent.EXTRA_SHORTCUT_NAME, shortCutName);
        Parcelable ico = Intent.ShortcutIconResource.fromContext(cxt.getApplicationContext(), icon);
        shortcutIntent.putExtra(Intent.EXTRA_SHORTCUT_ICON_RESOURCE, ico);
        Intent intent = new Intent(cxt, cls);
        intent.setAction("android.intent.action.MAIN");
        intent.addCategory("android.intent.category.LAUNCHER");
        shortcutIntent.putExtra(Intent.EXTRA_SHORTCUT_INTENT, intent);
        cxt.sendBroadcast(shortcutIntent);
    }

    public static void createShortcut(Context ctx, String shortCutName, int iconId, Intent presentIntent) {
        Intent shortcutIntent = new Intent("com.android.launcher.action.INSTALL_SHORTCUT");
        shortcutIntent.putExtra("duplicate", false);
        shortcutIntent.putExtra(Intent.EXTRA_SHORTCUT_NAME, shortCutName);
        shortcutIntent.putExtra(Intent.EXTRA_SHORTCUT_ICON_RESOURCE, Intent.ShortcutIconResource.fromContext(ctx, iconId));
        shortcutIntent.putExtra(Intent.EXTRA_SHORTCUT_INTENT, presentIntent);
        ctx.sendBroadcast(shortcutIntent);
    }

    /**
     * 获取应用运行的最大内存
     *
     * @return 最大内存
     */
    public static long getMaxMemory() {

        return Runtime.getRuntime().maxMemory() / 1024;
    }

    /**
     * 获取应用签名
     *
     * @param context 上下文
     * @param pkgName 包名
     * @return 返回应用的签名
     */
    public static String getSign(Context context, String pkgName) {
        try {
            PackageInfo pis = context.getPackageManager()
                    .getPackageInfo(pkgName,
                            PackageManager.GET_SIGNATURES);
            return hexdigest(pis.signatures[0].toByteArray());
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
            return null;
        }

    }

    /**
     * 将签名字符串转换成需要的32位签名
     *
     * @param paramArrayOfByte 签名byte数组
     * @return 32位签名字符串
     */
    private static String hexdigest(byte[] paramArrayOfByte) {
        final char[] hexDigits = {48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97,
                98, 99, 100, 101, 102};
        try {
            MessageDigest localMessageDigest = MessageDigest.getInstance("MD5");
            localMessageDigest.update(paramArrayOfByte);
            byte[] arrayOfByte = localMessageDigest.digest();
            char[] arrayOfChar = new char[32];
            for (int i = 0, j = 0; ; i++, j++) {
                if (i >= 16) {
                    return new String(arrayOfChar);
                }
                int k = arrayOfByte[i];
                arrayOfChar[j] = hexDigits[(0xF & k >>> 4)];
                arrayOfChar[++j] = hexDigits[(k & 0xF)];
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    /**
     * 清理后台进程与服务
     *
     * @param context 应用上下文对象context
     * @return 被清理的数量
     */
    public static int gc(Context context) {
        int count = 0; // 清理掉的进程数
        ActivityManager am = (ActivityManager) context.getSystemService(
                Context.ACTIVITY_SERVICE);
        // 获取正在运行的service列表
        List<ActivityManager.RunningServiceInfo> serviceList = am.getRunningServices(100);
        if (serviceList != null) {
            for (ActivityManager.RunningServiceInfo service : serviceList) {
                if (service.pid == android.os.Process.myPid()) continue;
                try {
                    android.os.Process.killProcess(service.pid);
                    count++;
                } catch (Exception e) {
                    e.getStackTrace();
                }
            }
        }

        // 获取正在运行的进程列表
        List<ActivityManager.RunningAppProcessInfo> processList = am.getRunningAppProcesses();
        if (processList != null) {
            for (ActivityManager.RunningAppProcessInfo process : processList) {
                // 一般数值大于RunningAppProcessInfo.IMPORTANCE_SERVICE的进程都长时间没用或者空进程了
                // 一般数值大于RunningAppProcessInfo.IMPORTANCE_VISIBLE的进程都是非可见进程，也就是在后台运行着
                if (process.importance >
                        ActivityManager.RunningAppProcessInfo.IMPORTANCE_VISIBLE) {
                    // pkgList 得到该进程下运行的包名
                    String[] pkgList = process.pkgList;
                    for (String pkgName : pkgList) {
                        try {
                            am.killBackgroundProcesses(pkgName);
                            count++;
                        } catch (Exception e) { // 防止意外发生
                            e.getStackTrace();
                        }
                    }
                }
            }
        }

        return count;
    }

    /**
     * 获取系统中所有的应用
     *
     * @param context 上下文
     * @return 应用信息List
     */
    public static List<PackageInfo> getAllApps(Context context) {

        List<PackageInfo> apps = new ArrayList<PackageInfo>();
        PackageManager pManager = context.getPackageManager();
        List<PackageInfo> paklist = pManager.getInstalledPackages(0);
        for (int i = 0; i < paklist.size(); i++) {
            PackageInfo pak = paklist.get(i);
            if ((pak.applicationInfo.flags & ApplicationInfo.FLAG_SYSTEM) <=
                    0) {
                apps.add(pak);
            }
        }
        return apps;
    }

    /**
     * 获取手机系统SDK版本
     *
     * @return 如API 17 则返回 17
     */
    public static int getSDKVersion() {
        return android.os.Build.VERSION.SDK_INT;
    }

    /**
     * 比较版本号的大小,前者大则返回一个正数,后者大返回一个负数,相等则返回0   支持4.1.2,4.1.23.4.1.rc111这种形式
     *
     * @param version1
     * @param version2
     * @return
     */
    public static int compareVersion(String version1, String version2) throws Exception {
        if (version1 == null || version2 == null) {
            throw new Exception("compareVersion error:illegal params.");
        }
        String[] versionArray1 = version1.split("\\.");//注意此处为正则匹配，不能用"."；
        String[] versionArray2 = version2.split("\\.");
        int idx = 0;
        int minLength = Math.min(versionArray1.length, versionArray2.length);//取最小长度值
        int diff = 0;
        while (idx < minLength
                && (diff = versionArray1[idx].length() - versionArray2[idx].length()) == 0//先比较长度
                && (diff = versionArray1[idx].compareTo(versionArray2[idx])) == 0) {//再比较字符
            ++idx;
        }
        //如果已经分出大小，则直接返回，如果未分出大小，则再比较位数，有子版本的为大；
        diff = (diff != 0) ? diff : versionArray1.length - versionArray2.length;
        return diff;
    }

    /**
     * 获取应用程序名称
     */
    public static String getAppName(Context context) {
        try {
            PackageManager packageManager = context.getPackageManager();
            PackageInfo packageInfo = packageManager.getPackageInfo(
                    context.getPackageName(), 0);
            int labelRes = packageInfo.applicationInfo.labelRes;
            return context.getResources().getString(labelRes);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }
}

