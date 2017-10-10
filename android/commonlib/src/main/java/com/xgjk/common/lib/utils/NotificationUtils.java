package com.xgjk.common.lib.utils;

import android.app.Activity;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.support.annotation.DrawableRes;
import android.support.v7.app.NotificationCompat;
import android.util.Log;
import android.widget.RemoteViews;

import com.xgjk.common.lib.R;

import java.util.ArrayList;
import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by shangwf on 2017/5/6.
 */

public class NotificationUtils {
    private static int LedID = 0;
    private static final String TAG = NotificationUtils.class.getSimpleName();

    public static void notification(Context context, Uri uri,
                                    int icon, String ticker, String title, String msg) {
        Log.i(TAG, "notiry uri :" + uri);
        // 设置通知的事件消息
        Intent intent = new Intent();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.DONUT) {
            intent.setPackage(context.getPackageName());
        }
        intent.setData(uri);
        notification(context, intent, 0, icon, ticker, title, msg);
    }

    public static void notification(Context context, String activityClass, Bundle bundle,
                                    int icon, String ticker, String title, String msg) {
        // 设置通知的事件消息
        Intent intent = new Intent();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.DONUT) {
            intent.setPackage(context.getPackageName());
        }
        intent.putExtras(bundle);
        intent.setComponent(new ComponentName(context.getPackageName(), activityClass));
        notification(context, intent, 0, icon, ticker, title, msg);
    }

    public static void notification(Context context, Intent intent, int id,
                                    int icon, String ticker, String title, String msg) {
        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
        notification(context, pendingIntent, id, icon, ticker, title, msg);
    }

    public static void notification(Context context, PendingIntent pendingIntent, int id,
                                    int icon, String ticker, String title, String msg) {
        Notification.Builder builder = new Notification.Builder(context);
        builder.setSmallIcon(icon);

        builder.setContentTitle(title);
        builder.setTicker(ticker);
        builder.setContentText(msg);

        builder.setDefaults(Notification.DEFAULT_SOUND);
        builder.setLights(0xFFFFFF00, 0, 2000);
        builder.setVibrate(new long[]{0, 100, 300});
        builder.setAutoCancel(true);
        builder.setContentIntent(pendingIntent);
        Notification baseNF;
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.JELLY_BEAN) {
            baseNF = builder.getNotification();
        } else {
            baseNF = builder.build();
        }
        //发出状态栏通知
        NotificationManager nm = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        nm.notify(id, baseNF);
    }

    public static void lightLed(Context context, int colorOx, int durationMS) {
        lightLed(context, colorOx, 0, durationMS);
    }

    public static void lightLed(Context context, int colorOx, int startOffMS, int durationMS) {
        NotificationManager nm = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        Notification notification = new Notification();
        notification.ledARGB = colorOx;
        notification.ledOffMS = startOffMS;
        notification.ledOnMS = durationMS;
        notification.flags = Notification.FLAG_SHOW_LIGHTS;
        LedID++;
        nm.notify(LedID, notification);
        nm.cancel(LedID);
    }

    public static void lightLed(final Context context, final int colorOx, final int startOffMS, final int durationMS,
                                int repeat) {
        if (repeat < 1) {
            repeat = 1;
        }
        Handler handler = new Handler(Looper.getMainLooper());
        for (int i = 0; i < repeat; i++) {
            handler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    lightLed(context, colorOx, startOffMS, durationMS);
                }
            }, (startOffMS + durationMS) * i);
        }
    }

    public static void lightLed(Context context, ArrayList<LightPattern> patterns) {
        if (patterns == null) {
            return;
        }
        for (LightPattern lp : patterns) {
            lightLed(context, lp.argb, lp.startOffMS, lp.durationMS);
        }
    }

    public static class LightPattern {
        public int argb = 0;
        public int startOffMS = 0;
        public int durationMS = 0;

        public LightPattern(int argb, int startOffMS, int durationMS) {
            this.argb = argb;
            this.startOffMS = startOffMS;
            this.durationMS = durationMS;
        }
    }

    /**
     * 显示一个普通的通知
     *
     * @param context 上下文
     */
    public static void showNotification(Context context, Activity activity,@DrawableRes int drawableRes) {
        Notification notification = new NotificationCompat.Builder(context)
                /**设置通知左边的大图标**/
                .setLargeIcon(BitmapFactory.decodeResource(context.getResources(), drawableRes))
                /**设置通知右边的小图标**/
                .setSmallIcon(drawableRes)
                /**通知首次出现在通知栏，带上升动画效果的**/
                .setTicker("通知来了")
                /**设置通知的标题**/
                .setContentTitle("这是一个通知的标题")
                /**设置通知的内容**/
                .setContentText("这是一个通知的内容这是一个通知的内容")
                /**通知产生的时间，会在通知信息里显示**/
                .setWhen(System.currentTimeMillis())
                /**设置该通知优先级**/
                .setPriority(Notification.PRIORITY_DEFAULT)
                /**设置这个标志当用户单击面板就可以让通知将自动取消**/
                .setAutoCancel(true)
                /**设置他为一个正在进行的通知。他们通常是用来表示一个后台任务,用户积极参与(如播放音乐)或以某种方式正在等待,因此占用设备(如一个文件下载,同步操作,主动网络连接)**/
                .setOngoing(false)
                /**向通知添加声音、闪灯和振动效果的最简单、最一致的方式是使用当前的用户默认设置，使用defaults属性，可以组合：**/
                .setDefaults(Notification.DEFAULT_VIBRATE | Notification.DEFAULT_SOUND)
                .setContentIntent(PendingIntent.getActivity(context, 1, new Intent(context, activity.getClass()), PendingIntent.FLAG_CANCEL_CURRENT))
                .build();
        NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        /**发起通知**/
        notificationManager.notify(0, notification);
    }

    /**
     * 显示一个下载带进度条的通知
     *
     * @param context 上下文
     */
    public static void showNotificationProgress(Context context,@DrawableRes int drawableRes) {
        //进度条通知
        final NotificationCompat.Builder builderProgress = new NotificationCompat.Builder(context);
        builderProgress.setContentTitle("下载中");
        builderProgress.setSmallIcon(drawableRes);
        builderProgress.setTicker("进度条通知");
        builderProgress.setProgress(100, 0, false);
        final Notification notification = builderProgress.build();
        final NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        //发送一个通知
        notificationManager.notify(2, notification);
        /**创建一个计时器,模拟下载进度**/
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            int progress = 0;

            @Override
            public void run() {
                Log.i("progress", progress + "");
                while (progress <= 100) {
                    progress++;
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    //更新进度条
                    builderProgress.setProgress(100, progress, false);
                    //再次通知
                    notificationManager.notify(2, builderProgress.build());
                }
                //计时器退出
                this.cancel();
                //进度条退出
                notificationManager.cancel(2);
                return;//结束方法
            }
        }, 0);
    }

    /**
     * 悬挂式，支持6.0以上系统
     *
     * @param context
     */
    public static void showFullScreen(Context context,Activity activity,@DrawableRes int drawableRes) {
        NotificationCompat.Builder builder = new NotificationCompat.Builder(context);
        Intent mIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("http://blog.csdn.net/itachi85/"));
        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, mIntent, 0);
        builder.setContentIntent(pendingIntent);
        builder.setSmallIcon(drawableRes);
        builder.setLargeIcon(BitmapFactory.decodeResource(context.getResources(), drawableRes));
        builder.setAutoCancel(true);
        builder.setContentTitle("悬挂式通知");
        //设置点击跳转
        Intent hangIntent = new Intent();
        hangIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        hangIntent.setClass(context, activity.getClass());
        //如果描述的PendingIntent已经存在，则在产生新的Intent之前会先取消掉当前的
        PendingIntent hangPendingIntent = PendingIntent.getActivity(context, 0, hangIntent, PendingIntent.FLAG_CANCEL_CURRENT);
        builder.setFullScreenIntent(hangPendingIntent, true);
        NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        notificationManager.notify(3, builder.build());
    }

    /**
     * 折叠式
     *
     * @param context
     */
    public static void shwoNotify(Context context,Activity activity,@DrawableRes int customDrawableRes) {
        //先设定RemoteViews
        RemoteViews view_custom = new RemoteViews(context.getPackageName(), customDrawableRes);
        //设置对应IMAGEVIEW的ID的资源图片
        view_custom.setImageViewResource(R.id.custom_icon, customDrawableRes);
        view_custom.setTextViewText(R.id.tv_custom_title, "今日头条");
        view_custom.setTextColor(R.id.tv_custom_title, Color.BLACK);
        view_custom.setTextViewText(R.id.tv_custom_content, "金州勇士官方宣布球队已经解雇了主帅马克-杰克逊，随后宣布了最后的结果。");
        view_custom.setTextColor(R.id.tv_custom_content, Color.BLACK);
        NotificationCompat.Builder mBuilder = new NotificationCompat.Builder(context);
        mBuilder.setContent(view_custom)
                .setContentIntent(PendingIntent.getActivity(context, 4, new Intent(context, activity.getClass()), PendingIntent.FLAG_CANCEL_CURRENT))
                .setWhen(System.currentTimeMillis())// 通知产生的时间，会在通知信息里显示
                .setTicker("有新资讯")
                .setPriority(Notification.PRIORITY_HIGH)// 设置该通知优先级
                .setOngoing(false)//不是正在进行的   true为正在进行  效果和.flag一样
                .setSmallIcon(customDrawableRes);
        Notification notify = mBuilder.build();
        NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        notificationManager.notify(4, notify);
    }
}
