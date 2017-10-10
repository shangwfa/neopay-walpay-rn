package com.xgjk.common.lib.utils;

import android.Manifest;
import android.app.Activity;
import android.content.ContentResolver;
import android.content.ContentUris;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.Matrix;
import android.media.ExifInterface;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.DocumentsContract;
import android.provider.MediaStore;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.Fragment;
import android.support.v4.content.ContextCompat;
import android.util.Log;

import com.yalantis.ucrop.UCrop;
import com.yalantis.ucrop.UCropActivity;
import com.yalantis.ucrop.callback.BitmapLoadCallback;
import com.yalantis.ucrop.model.ExifInfo;
import com.yalantis.ucrop.util.BitmapLoadUtils;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import static android.app.Activity.RESULT_OK;
import static com.xgjk.common.lib.utils.FileUtils.getDataColumn;
import static com.xgjk.common.lib.utils.FileUtils.isDownloadsDocument;
import static com.xgjk.common.lib.utils.FileUtils.isExternalStorageDocument;
import static com.xgjk.common.lib.utils.FileUtils.isGooglePhotosUri;
import static com.xgjk.common.lib.utils.FileUtils.isMediaDocument;

/**
 * Created by shangwf on 2017/5/8.
 */

public class PhotoUtils {
    public static final int GET_IMAGE_BY_CAMERA = 5001;
    public static final int GET_IMAGE_FROM_PHONE = 5002;
    public static final int CROP_IMAGE = 5003;
    public static final int GET_IMAGE_BY_CAMERA_FROM_SYSTEM = 5004;
    public static final int GET_IMAGE_BY_PHONE_FROM_SYSTEM = 5005;
    public static Uri imageUriFromCamera;
    public static Uri cropImageUri;

    public static void openSystemCameraImage(final Activity activity, String imgTag) {
        Intent getImageByCamera = new Intent("android.media.action.IMAGE_CAPTURE");
        activity.startActivityForResult(getImageByCamera, GET_IMAGE_BY_CAMERA_FROM_SYSTEM);
    }

    public static void openCameraImage(final Activity activity, String imgTag) {
        imageUriFromCamera = createImagePathUri(activity);

        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        // MediaStore.EXTRA_OUTPUT参数不设置时,系统会自动生成一个uri,但是只会返回一个缩略图
        // 返回图片在onActivityResult中通过以下代码获取
        // Bitmap bitmap = (Bitmap) data.getExtras().get("data");
        intent.putExtra("imgTag", imgTag);
        intent.putExtra(MediaStore.EXTRA_OUTPUT, imageUriFromCamera);
        activity.startActivityForResult(intent, GET_IMAGE_BY_CAMERA);
    }


    public static void openCameraImage(final Fragment fragment) {
        imageUriFromCamera = createImagePathUri(fragment.getContext());

        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        // MediaStore.EXTRA_OUTPUT参数不设置时,系统会自动生成一个uri,但是只会返回一个缩略图
        // 返回图片在onActivityResult中通过以下代码获取
        // Bitmap bitmap = (Bitmap) data.getExtras().get("data");
        intent.putExtra(MediaStore.EXTRA_OUTPUT, imageUriFromCamera);
        fragment.startActivityForResult(intent, GET_IMAGE_BY_CAMERA);
    }

    public static void openSystemLocalImag(final Activity activity, String imgTag) {
        Intent intent = new Intent(Intent.ACTION_PICK);
        intent.setType("image/*");//相片类型
        activity.startActivityForResult(intent, GET_IMAGE_BY_PHONE_FROM_SYSTEM);
    }

    public static void openLocalImage(final Activity activity, String imgTag) {
        Intent intent = new Intent();
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        intent.putExtra("imgTag", imgTag);
        activity.startActivityForResult(intent, GET_IMAGE_FROM_PHONE);
    }

    public static void openLocalImage(final Fragment fragment) {
        Intent intent = new Intent();
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        fragment.startActivityForResult(intent, GET_IMAGE_FROM_PHONE);
    }

    public static void cropImage(Activity activity, Uri srcUri) {
        cropImageUri = createImagePathUri(activity);

        Intent intent = new Intent("com.android.camera.action.CROP");
        intent.setDataAndType(srcUri, "image/*");
        intent.putExtra("crop", "true");

        ////////////////////////////////////////////////////////////////
        // 1.宽高和比例都不设置时,裁剪框可以自行调整(比例和大小都可以随意调整)
        ////////////////////////////////////////////////////////////////
        // 2.只设置裁剪框宽高比(aspect)后,裁剪框比例固定不可调整,只能调整大小
        ////////////////////////////////////////////////////////////////
        // 3.裁剪后生成图片宽高(output)的设置和裁剪框无关,只决定最终生成图片大小
        ////////////////////////////////////////////////////////////////
        // 4.裁剪框宽高比例(aspect)可以和裁剪后生成图片比例(output)不同,此时,
        //	会以裁剪框的宽为准,按照裁剪宽高比例生成一个图片,该图和框选部分可能不同,
        //  不同的情况可能是截取框选的一部分,也可能超出框选部分,向下延伸补足
        ////////////////////////////////////////////////////////////////

        // aspectX aspectY 是裁剪框宽高的比例
        intent.putExtra("aspectX", 1);
        intent.putExtra("aspectY", 1);
        // outputX outputY 是裁剪后生成图片的宽高
        intent.putExtra("outputX", 300);
        intent.putExtra("outputY", 300);

        // return-data为true时,会直接返回bitmap数据,但是大图裁剪时会出现问题,推荐下面为false时的方式
        // return-data为false时,不会返回bitmap,但需要指定一个MediaStore.EXTRA_OUTPUT保存图片uri
        intent.putExtra(MediaStore.EXTRA_OUTPUT, cropImageUri);
        intent.putExtra("return-data", true);

        activity.startActivityForResult(intent, CROP_IMAGE);
    }

    public static void cropImage(Fragment fragment, Uri srcUri) {
        cropImageUri = createImagePathUri(fragment.getContext());

        Intent intent = new Intent("com.android.camera.action.CROP");
        intent.setDataAndType(srcUri, "image/*");
        intent.putExtra("crop", "true");

        ////////////////////////////////////////////////////////////////
        // 1.宽高和比例都不设置时,裁剪框可以自行调整(比例和大小都可以随意调整)
        ////////////////////////////////////////////////////////////////
        // 2.只设置裁剪框宽高比(aspect)后,裁剪框比例固定不可调整,只能调整大小
        ////////////////////////////////////////////////////////////////
        // 3.裁剪后生成图片宽高(output)的设置和裁剪框无关,只决定最终生成图片大小
        ////////////////////////////////////////////////////////////////
        // 4.裁剪框宽高比例(aspect)可以和裁剪后生成图片比例(output)不同,此时,
        //	会以裁剪框的宽为准,按照裁剪宽高比例生成一个图片,该图和框选部分可能不同,
        //  不同的情况可能是截取框选的一部分,也可能超出框选部分,向下延伸补足
        ////////////////////////////////////////////////////////////////

        // aspectX aspectY 是裁剪框宽高的比例
        intent.putExtra("aspectX", 1);
        intent.putExtra("aspectY", 1);
        // outputX outputY 是裁剪后生成图片的宽高
        intent.putExtra("outputX", 300);
        intent.putExtra("outputY", 300);

        // return-data为true时,会直接返回bitmap数据,但是大图裁剪时会出现问题,推荐下面为false时的方式
        // return-data为false时,不会返回bitmap,但需要指定一个MediaStore.EXTRA_OUTPUT保存图片uri
        intent.putExtra(MediaStore.EXTRA_OUTPUT, cropImageUri);
        intent.putExtra("return-data", true);

        fragment.startActivityForResult(intent, CROP_IMAGE);
    }

    /**
     * 创建一条图片地址uri,用于保存拍照后的照片
     *
     * @param context
     * @return 图片的uri
     */
    public static Uri createImagePathUri(final Context context) {
        final Uri[] imageFilePath = {null};

        if (ContextCompat.checkSelfPermission(context, Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions((Activity) context, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, 1);
            imageFilePath[0] = Uri.parse("");
            ToastUtils.show("请先获取写入SDCard权限");
        } else {
            String status = Environment.getExternalStorageState();
            SimpleDateFormat timeFormatter = new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.CHINA);
            long time = System.currentTimeMillis();
            String imageName = timeFormatter.format(new Date(time));
            // ContentValues是我们希望这条记录被创建时包含的数据信息
            ContentValues values = new ContentValues(3);
            values.put(MediaStore.Images.Media.DISPLAY_NAME, imageName);
            values.put(MediaStore.Images.Media.DATE_TAKEN, time);
            values.put(MediaStore.Images.Media.MIME_TYPE, "image/jpeg");

            if (status.equals(Environment.MEDIA_MOUNTED)) {// 判断是否有SD卡,优先使用SD卡存储,当没有SD卡时使用手机存储
                imageFilePath[0] = context.getContentResolver().insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values);
            } else {
                imageFilePath[0] = context.getContentResolver().insert(MediaStore.Images.Media.INTERNAL_CONTENT_URI, values);
            }
        }

        Log.i("", "生成的照片输出路径：" + imageFilePath[0].toString());
        return imageFilePath[0];
    }


    //此方法 只能用于4.4以下的版本
    public static String getRealFilePath(final Context context, final Uri uri) {
        if (null == uri) return null;
        final String scheme = uri.getScheme();
        String data = null;
        if (scheme == null)
            data = uri.getPath();
        else if (ContentResolver.SCHEME_FILE.equals(scheme)) {
            data = uri.getPath();
        } else if (ContentResolver.SCHEME_CONTENT.equals(scheme)) {
            String[] projection = {MediaStore.Images.ImageColumns.DATA};
            Cursor cursor = context.getContentResolver().query(uri, projection, null, null, null);

//            Cursor cursor = context.getContentResolver().query(uri, new String[]{MediaStore.Images.ImageColumns.DATA}, null, null, null);
            if (null != cursor) {
                if (cursor.moveToFirst()) {
                    int index = cursor.getColumnIndex(MediaStore.Images.ImageColumns.DATA);
                    if (index > -1) {
                        data = cursor.getString(index);
                    }
                }
                cursor.close();
            }
        }
        return data;
    }


    /**
     * 根据Uri获取图片绝对路径，解决Android4.4以上版本Uri转换
     *
     * @param context
     * @param imageUri
     * @author yaoxing
     * @date 2014-10-12
     */
    public static String getImageAbsolutePath(Context context, Uri imageUri) {
        if (context == null || imageUri == null)
            return null;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.KITKAT && DocumentsContract.isDocumentUri(context, imageUri)) {
            if (isExternalStorageDocument(imageUri)) {
                String docId = DocumentsContract.getDocumentId(imageUri);
                String[] split = docId.split(":");
                String type = split[0];
                if ("primary".equalsIgnoreCase(type)) {
                    return Environment.getExternalStorageDirectory() + "/" + split[1];
                }
            } else if (isDownloadsDocument(imageUri)) {
                String id = DocumentsContract.getDocumentId(imageUri);
                Uri contentUri = ContentUris.withAppendedId(Uri.parse("content://downloads/public_downloads"), Long.valueOf(id));
                return getDataColumn(context, contentUri, null, null);
            } else if (isMediaDocument(imageUri)) {
                String docId = DocumentsContract.getDocumentId(imageUri);
                String[] split = docId.split(":");
                String type = split[0];
                Uri contentUri = null;
                if ("image".equals(type)) {
                    contentUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
                } else if ("video".equals(type)) {
                    contentUri = MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
                } else if ("audio".equals(type)) {
                    contentUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
                }
                String selection = MediaStore.Images.Media._ID + "=?";
                String[] selectionArgs = new String[]{split[1]};
                return getDataColumn(context, contentUri, selection, selectionArgs);
            }
        } // MediaStore (and general)
        else if ("content".equalsIgnoreCase(imageUri.getScheme())) {
            // Return the remote address
            if (isGooglePhotosUri(imageUri))
                return imageUri.getLastPathSegment();
            return getDataColumn(context, imageUri, null, null);
        }
        // File
        else if ("file".equalsIgnoreCase(imageUri.getScheme())) {
            return imageUri.getPath();
        }
        return null;
    }

    public static void onActivityResult(Context context, int requestCode, int resultCode, Intent data, int statusBarColor, int barColor, OnResultCallback callback) {
        onActivityResult(context, requestCode, resultCode, data, statusBarColor, barColor, callback, 1, 1);
    }

    public static void onActivityResult(Context context, int requestCode, int resultCode, Intent data, int statusBarColor, int barColor, final OnResultCallback callback, float aspectRatioX, float aspectRatioY) {
        switch (requestCode) {
            case PhotoUtils.GET_IMAGE_FROM_PHONE://选择相册之后的处理
                if (resultCode == RESULT_OK) {
                    initUCrop(context, data.getData(), statusBarColor, barColor, aspectRatioX, aspectRatioY);
                }

                break;

            case PhotoUtils.GET_IMAGE_BY_PHONE_FROM_SYSTEM://选择相册之后的处理
                if (resultCode == RESULT_OK) {
                    Uri resultUri = data.getData();//从相册获取的图片，未压缩，太大，要做压缩处理
                    callback.callback(bitmapToUri((Activity) context, toturn(ImageUtils.compressBitmap(context, resultUri, 1), getImageAbsolutePath(context, resultUri))));
                }

                break;
            case PhotoUtils.GET_IMAGE_BY_CAMERA://选择照相机之后的处理
                if (resultCode == RESULT_OK) {
                    initUCrop(context, PhotoUtils.imageUriFromCamera, statusBarColor, barColor, aspectRatioX, aspectRatioY);
                }

                break;
            case PhotoUtils.GET_IMAGE_BY_CAMERA_FROM_SYSTEM://选择照相机之后的处理
                if (resultCode == RESULT_OK) {//相机拍照，取出的图片已被系统处理过（压缩过）
                    Uri resultUri = data.getData();
                    Bundle bundle = data.getExtras();
                    if (null == resultUri && null != bundle) {
                        Bitmap photo = (Bitmap) bundle.get("data");
                        resultUri = bitmapToUri((Activity) context, photo);
                    }
                    callback.callback(resultUri);
                }

                break;
//            case PhotoUtils.CROP_IMAGE://普通裁剪后的处理
//                Glide.with(context).
//                        load(PhotoUtils.cropImageUri).
//                        diskCacheStrategy(DiskCacheStrategy.RESULT).
//                        bitmapTransform(new CropCircleTransformation(context)).
//                        thumbnail(0.5f).
//                        priority(Priority.LOW).
//                        dontAnimate().
//                        into(img);
//                break;

            case UCrop.REQUEST_CROP://UCrop裁剪之后的处理
                if (resultCode == RESULT_OK) {
                    final Uri resultUri = UCrop.getOutput(data);
                    callback.callback(resultUri);

                } else if (resultCode == UCrop.RESULT_ERROR) {
                    final Throwable cropError = UCrop.getError(data);
                    cropError.printStackTrace();
                }
                break;
            case UCrop.RESULT_ERROR://UCrop裁剪错误之后的处理
                final Throwable cropError = UCrop.getError(data);
                cropError.printStackTrace();
                break;
            default:
                break;
        }
    }

    private static void initUCrop(Context context, Uri uri, int statusBarColor, int barColor, float aspectRatioX, float aspectRatioY) {
        com.orhanobut.logger.Logger.d("xxxxx:" + FileUtils.getUUID() + ".jpg");
        Uri destinationUri = Uri.fromFile(new File(context.getCacheDir(), FileUtils.getUUID() + ".jpg"));

        UCrop.Options options = new UCrop.Options();
        //设置裁剪图片可操作的手势
        options.setAllowedGestures(UCropActivity.SCALE, UCropActivity.ROTATE, UCropActivity.ALL);
        //设置隐藏底部容器，默认显示
        options.setHideBottomControls(true);
        //设置toolbar颜色

        options.setStatusBarColor(ResUtils.getColor(context, statusBarColor));
        options.setToolbarColor(ResUtils.getColor(context, barColor));
        options.setToolbarTitle("裁剪");

        //开始设置
        //设置最大缩放比例
        options.setMaxScaleMultiplier(5);
        //设置图片在切换比例时的动画
        options.setImageToCropBoundsAnimDuration(666);
        UCrop.of(uri, destinationUri)
                .withAspectRatio(aspectRatioX, aspectRatioY)
                .withMaxResultSize(1000, 1000)
                .withOptions(options)
                .start((Activity) context);
    }


    public interface OnResultCallback {
        void callback(Uri resultUri);
    }


    public static Uri bitmapToUri(Activity activity, Bitmap bitmap) {
        return Uri.parse(MediaStore.Images.Media.insertImage(activity.getContentResolver(), bitmap, null, null));

    }

    /**
     * 读取照片exif信息中的旋转角度
     *
     * @param path 照片路径
     * @return角度
     */
    public static int readPictureDegree(String path) {
        int degree = 0;
        try {
            ExifInterface exifInterface = new ExifInterface(path);
            int orientation = exifInterface.getAttributeInt(ExifInterface.TAG_ORIENTATION, ExifInterface.ORIENTATION_NORMAL);
            switch (orientation) {
                case ExifInterface.ORIENTATION_ROTATE_90:
                    degree = 90;
                    break;
                case ExifInterface.ORIENTATION_ROTATE_180:
                    degree = 180;
                    break;
                case ExifInterface.ORIENTATION_ROTATE_270:
                    degree = 270;
                    break;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return degree;
    }

    public static Bitmap toturn(Bitmap img, String path) {
        Matrix matrix = new Matrix();
        matrix.postRotate(readPictureDegree(path));
        int width = img.getWidth();
        int height = img.getHeight();
        img = Bitmap.createBitmap(img, 0, 0, width, height, matrix, true);
        return img;
    }
}
