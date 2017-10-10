package com.xgjk.common.lib.manager.glide;

import android.content.Context;
import android.net.Uri;
import android.support.annotation.IdRes;
import android.widget.ImageView;

import com.bumptech.glide.DrawableRequestBuilder;
import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.xgjk.common.lib.R;
import com.xgjk.common.lib.manager.glide.transform.GlideCircleTransform;

/**
 * Created by shangwf on 2017/4/29.
 */

public class GlideManager {
    public static final String ANDROID_RESOURCE = "android.resource://";
    public static final String SEPARATOR = "/";


    // 将资源ID转为Uri
    public static Uri resIdToUri(Context context, int resourceId) {
        return Uri.parse(ANDROID_RESOURCE + context.getPackageName() + SEPARATOR + resourceId);
    }


    // 加载网络图片
    public static void loadNetImage(ImageView imageView, String url) {
        urlBuilder(imageView.getContext(), url).into(imageView);
    }

    // 加载drawable图片
    public static void loadResImage(ImageView imageView, @IdRes int resId) {
        resBuilder(imageView.getContext(), resId).into(imageView);
    }

    // 加载本地图片
    public static void loadLocalPathImage(ImageView imageView, String path) {
        urlBuilder(imageView.getContext(), "file://" + path).into(imageView);
    }

    // 加载网络圆型图片
    public static void loadNetCircleImage(ImageView imageView, String url) {
        urlBuilder(imageView.getContext(), url)
                .transform(new GlideCircleTransform(imageView.getContext()))
                .into(imageView);
    }

    // 加载drawable圆型图片
    public static void loadLocalResCircleImage(ImageView imageView, int resId) {
        resBuilder(imageView.getContext(), resId)
                .transform(new GlideCircleTransform(imageView.getContext()))
                .into(imageView);
    }

    public static void loadLocalResImage(ImageView imageView, int resId) {
        resBuilder(imageView.getContext(), resId)
                .into(imageView);
    }

    // 加载本地圆型图片
    public static void loadLocalPathCircleImage(ImageView imageView, String path) {
        urlBuilder(imageView.getContext(), "file://" + path)
                .transform(new GlideCircleTransform(imageView.getContext()))
                .into(imageView);
    }

    // 创建 Res DrawableRequestBuilder
    private static DrawableRequestBuilder resBuilder(Context context, int resId) {
        return uriBuilder(context, resIdToUri(context, resId));
    }

    public static void loadLocalUriImage(ImageView imageView, Uri uri) {
        uriBuilder(imageView.getContext(), uri)
                .into(imageView);
    }

    // 创建 Uri DrawableRequestBuilder
    private static DrawableRequestBuilder uriBuilder(Context context, Uri uri) {
        return Glide.with(context)
                .load(uri)
                .dontAnimate()
                .diskCacheStrategy(DiskCacheStrategy.SOURCE);
    }

    // 创建 Url DrawableRequestBuilder
    private static DrawableRequestBuilder urlBuilder(Context context, final String url) {
        return Glide.with(context)
                .load(url)
                .dontAnimate()
                .diskCacheStrategy(DiskCacheStrategy.SOURCE);

    }


}
