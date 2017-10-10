package com.xgjk.common.lib.utils;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.ContextWrapper;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Matrix;
import android.graphics.Rect;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.support.annotation.DrawableRes;
import android.text.TextUtils;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.TouchDelegate;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewParent;
import android.view.WindowManager;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.PopupWindow;
import android.widget.TextView;

import com.xgjk.common.lib.manager.glide.GlideManager;
import com.xgjk.common.lib.view.xrecyclerview.XRecyclerView;

import java.lang.reflect.Field;

/**
 * Created by shangwf on 2017/4/29.
 */

public class ViewUtils {
    /**
     * 复制数据到 剪切板
     *
     * @param inputString 复制数据到 剪切板
     */
    public static void copyToClipBoard(String inputString, Context context) {
        final ClipboardManager cmb = (ClipboardManager) context.getSystemService(Context.CLIPBOARD_SERVICE);
        ClipData myClip;
        myClip = ClipData.newPlainText("text", inputString);
        cmb.setPrimaryClip(myClip);
    }

    /**
     * 测量View的宽
     */
    public static int measureViewWidth(View view) {
        int w = View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED);
        int h = View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED);
        view.measure(w, h);
        return view.getMeasuredWidth();
    }

    /**
     * 测量View的高
     */
    public static int measureViewHeight(View view) {
        int w = View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED);
        int h = View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED);
        view.measure(w, h);
        return view.getMeasuredHeight();
    }

    /**
     * 测量并设置ListView的高度
     */
    public static int measureAndSetListViewHeight(ListView listView, int listviewCount) {
        android.widget.ListAdapter listAdapter = listView.getAdapter();
        if (listAdapter == null) {
            return 0;
        }
        int totalHeight = 0;
        for (int i = 0; i < listviewCount; i++) {
            View listItem = listAdapter.getView(i, null, listView);
            listItem.measure(View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED), View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED));
            totalHeight += listItem.getMeasuredHeight();
        }
        ViewGroup.LayoutParams params = listView.getLayoutParams();
        params.height = totalHeight + (listView.getDividerHeight() * (listAdapter.getCount() - 1));
        listView.setLayoutParams(params);
        return params.height;
    }

    /**
     * 从父View中移除自身
     *
     * @param view
     */
    public static void removeSelfFromParent(View view) {
        if (view != null) {
            ViewParent parent = view.getParent();
            if (parent != null && parent instanceof ViewGroup) {
                ViewGroup group = (ViewGroup) parent;
                group.removeView(view);
            }
        }
    }

    /**
     * 重新加载布局
     *
     * @param view
     * @param isAll
     */
    public static void requestLayoutParent(View view, boolean isAll) {
        ViewParent parent = view.getParent();
        while (parent != null && parent instanceof View) {
            if (!parent.isLayoutRequested()) {
                parent.requestLayout();
                if (!isAll) {
                    break;
                }
            }
            parent = parent.getParent();
        }
    }

    /**
     * 触摸是否在View上
     *
     * @param ev
     * @param v
     */
    public static boolean isTouchInView(MotionEvent ev, View v) {
        int[] vLoc = new int[2];
        v.getLocationOnScreen(vLoc);
        float motionX = ev.getRawX();
        float motionY = ev.getRawY();
        return motionX >= vLoc[0] && motionX <= (vLoc[0] + v.getWidth()) && motionY >= vLoc[1] && motionY <= (vLoc[1] + v.getHeight());
    }

    /**
     * 放大图片
     *
     * @param bmp
     * @param big
     * @return
     */
    public static Bitmap bigImage(Bitmap bmp, float big) {
        int bmpWidth = bmp.getWidth();
        int bmpHeight = bmp.getHeight();
        Matrix matrix = new Matrix();
        matrix.postScale(big, big);
        return Bitmap.createBitmap(bmp, 0, 0, bmpWidth, bmpHeight, matrix, true);
    }

    /**
     * 把View转换为Bitmap
     *
     * @param v
     * @return
     */
    public static Bitmap captureView(View v) {
        v.setDrawingCacheEnabled(true);
        v.buildDrawingCache();
        return v.getDrawingCache();
    }

    /**
     * 把View转换为Bitmap
     *
     * @param v
     * @return
     */
    public static Bitmap createViewBitmap(View v) {
        Bitmap bitmap = Bitmap.createBitmap(v.getWidth(), v.getHeight(), Bitmap.Config.ARGB_8888);
        Canvas canvas = new Canvas(bitmap);
        v.draw(canvas);
        return bitmap;
    }

    /**
     * 把View转换为Bitmap
     *
     * @param view
     * @return
     */
    public static Bitmap convertViewToBitmap(View view) {
//        view.measure(View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED), View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED));
//        view.layout(0, 0, view.getMeasuredWidth(), view.getMeasuredHeight());
        view.buildDrawingCache();
        return view.getDrawingCache();
    }

    public static Bitmap getActivityBitmap(Activity activity) {
        View view = activity.getWindow().getDecorView().findViewById(android.R.id.content);
        view.setDrawingCacheEnabled(true);
        return view.getDrawingCache();
    }

    /**
     * 获取状态栏的高度
     *
     * @param context
     * @return
     */
    public static int getStatusBarHeight(Context context) {
        int result = 0;
        int resourceId = context.getResources().getIdentifier("status_bar_height", "dimen", "android");
        if (resourceId > 0) {
            result = context.getResources().getDimensionPixelSize(resourceId);
        }
        return result;
    }

    /**
     * 获取smartBar的高度
     *
     * @param activity
     * @return
     */
    public static int getNavigationBarHeight(Activity activity) {
        Resources resources = activity.getResources();
        int resourceId = resources.getIdentifier("navigation_bar_height", "dimen", "android");
        if (resourceId > 0) {
            return resources.getDimensionPixelSize(resourceId);
        }
        return 0;
    }

    /**
     * 根据View获取依附的Activity
     *
     * @param view
     * @return
     */
    public static Activity getActivity(View view) {
        Context context = view.getContext();
        while (context instanceof ContextWrapper) {
            if (context instanceof Activity) {
                return (Activity) context;
            }
            context = ((ContextWrapper) context).getBaseContext();
        }
        throw new IllegalStateException("View " + view + " is not attached to an Activity");
    }

    public static void setBackground(View view, Drawable background) {
        if (Build.VERSION.SDK_INT >= 16) {
            view.setBackground(background);
        } else {
            view.setBackgroundDrawable(background);
        }
    }

    public static void setBackground(View view, int drawableId) {
        final Drawable drawable = view.getContext().getResources().getDrawable(drawableId);
        if (Build.VERSION.SDK_INT >= 16) {
            view.setBackground(drawable);
        } else {
            view.setBackgroundDrawable(drawable);
        }
    }

    @SuppressLint("ResourceType")
    public static void setBackgroundColor(View view, @DrawableRes int colorId) {
        view.setBackgroundColor(view.getContext().getResources().getColor(colorId));
    }

    public static void setSelection(EditText editText) {
        editText.setSelection(editText.getText().toString().length());
    }

    public static void setTextViewVisibilityAccordingToStr(TextView view, String str) {
        view.setVisibility(TextUtils.isEmpty(str) ? View.GONE : View.VISIBLE);
        view.setText(str);
    }

    public static void setTextViewColor(TextView view, int color) {
        view.setTextColor(view.getContext().getResources().getColor(color));
    }

    public static View inflateVieW(Context context, int layoutId) {
        final LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        return inflater.inflate(layoutId, null);
    }


    /**
     * 得到屏幕的高
     *
     * @param context
     * @return
     */
    public static int getScreenHeight(Context context) {
        WindowManager wm = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
        int height = wm.getDefaultDisplay().getHeight();
        return height;
    }

    /**
     * 得到屏幕的宽
     *
     * @param context
     * @return
     */
    public static int getScreenWidth(Context context) {
        WindowManager wm = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
        int width = wm.getDefaultDisplay().getWidth();
        return width;
    }

    /**
     * 获取当前屏幕截图，包含状态栏
     *
     * @param activity activity
     * @return Bitmap
     */
    public static Bitmap captureWithStatusBar(Activity activity) {
        View view = activity.getWindow().getDecorView();
        view.setDrawingCacheEnabled(true);
        view.buildDrawingCache();
        Bitmap bmp = view.getDrawingCache();
        int width = getScreenWidth(activity);
        int height = getScreenHeight(activity);
        Bitmap ret = Bitmap.createBitmap(bmp, 0, 0, width, height);
        view.destroyDrawingCache();
        return ret;
    }

    public static void setEditTextValue(EditText editText, String value) {
        editText.setText(value);
        editText.setSelection(editText.getText().length());
    }


    public static void loadImg(ImageView view, String imgUrl, int defaultImag) {
        if (StringUtils.isEmpty(imgUrl)) {
            GlideManager.loadLocalResCircleImage(view, defaultImag);
        } else {
            GlideManager.loadNetCircleImage(view, imgUrl);
        }
    }


    public static void showCompatPopupWindow(PopupWindow popupWindow, View parent, int xoff, int yoff) {
        if (Build.VERSION.SDK_INT < 24) {
            popupWindow.showAsDropDown(parent, xoff, yoff);
        } else {
            // 适配 android 7.0
            int[] location = new int[2];
            parent.getLocationOnScreen(location);
            int x = location[0];
            int y = location[1];
            popupWindow.showAtLocation(parent, Gravity.NO_GRAVITY, xoff, y + ViewUtils.measureViewHeight(parent) + yoff);
        }
    }


    public static void endRefreshLoading(Activity activity) {
        if (activity != null && !activity.isFinishing()) {
            final View rootView = activity.getWindow().getDecorView();
            if (rootView instanceof ViewGroup) {
                XRecyclerView pullToRefresh;
                pullToRefresh = deepSearch((ViewGroup) rootView);
                if (pullToRefresh != null) {
                    pullToRefresh.refreshComplete();
                    pullToRefresh.loadMoreComplete();
                }
            }
        }
    }

    private static XRecyclerView deepSearch(ViewGroup viewGroup) {
        final int count = viewGroup.getChildCount();
        for (int i = 0; i < count; i++) {
            final View view = viewGroup.getChildAt(i);
            if (view instanceof XRecyclerView) {
                return (XRecyclerView) view;
            } else if (view instanceof ViewGroup) {
                XRecyclerView pullToRefresh = deepSearch((ViewGroup) view);
                if (pullToRefresh != null) {
                    return pullToRefresh;
                }
            }
        }
        return null;
    }

    /**
     * 功能扩大视图点击区域
     * 注：采取此种方法的两点注意：1、若View的自定义触摸范围超出Parent的大小，则超出的那部分无效。2、一个Parent只能设置一个View的TouchDelegate，设置多个时只有最后设置的生效
     */
    public static void expandViewClickRegion(final View view, final int top,
                                             final int bottom, final int left, final int right) {
        ((View) view.getParent()).post(new Runnable() {
            @Override
            public void run() {
                Rect bounds = new Rect();
                view.setEnabled(true);
                view.getHitRect(bounds);

                bounds.top -= top;
                bounds.bottom += bottom;
                bounds.left -= left;
                bounds.right += right;

                TouchDelegate touchDelegate = new TouchDelegate(bounds, view);

                if (View.class.isInstance(view.getParent())) {
                    ((View) view.getParent()).setTouchDelegate(touchDelegate);
                }
            }
        });
    }

    /**
     * 去除扩大的点击区域
     */
    public static void removexpandViewClickRegion(final View view) {
        ((View) view.getParent()).post(new Runnable() {
            @Override
            public void run() {
                Rect bounds = new Rect();
                bounds.setEmpty();
                TouchDelegate touchDelegate = new TouchDelegate(bounds, view);

                if (View.class.isInstance(view.getParent())) {
                    ((View) view.getParent()).setTouchDelegate(touchDelegate);
                }
            }
        });
    }
}
