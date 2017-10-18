package cn.neopay.walpay.android.manager.ossmanager;

import com.alibaba.sdk.android.oss.ClientConfiguration;
import com.alibaba.sdk.android.oss.ClientException;
import com.alibaba.sdk.android.oss.OSSClient;
import com.alibaba.sdk.android.oss.ServiceException;
import com.alibaba.sdk.android.oss.callback.OSSCompletedCallback;
import com.alibaba.sdk.android.oss.common.OSSLog;
import com.alibaba.sdk.android.oss.common.auth.OSSCredentialProvider;
import com.alibaba.sdk.android.oss.common.auth.OSSStsTokenCredentialProvider;
import com.alibaba.sdk.android.oss.model.PutObjectRequest;
import com.alibaba.sdk.android.oss.model.PutObjectResult;
import com.orhanobut.logger.Logger;
import com.xgjk.common.lib.base.BaseApp;
import com.xgjk.common.lib.utils.HandlerUtils;

/**
 * Created by shangwf on 2017/10/17.
 */

public class OssManager {
    public static OSSClient initOss(String accessKeyId, String accessKeySecret, String securityToken, String endpoint) {

        OSSCredentialProvider credentialProvider = new OSSStsTokenCredentialProvider(accessKeyId, accessKeySecret, securityToken);
        ClientConfiguration conf = new ClientConfiguration();
        conf.setConnectionTimeout(15 * 1000); // 连接超时，默认15秒
        conf.setSocketTimeout(15 * 1000); // socket超时，默认15秒
        conf.setMaxConcurrentRequest(5); // 最大并发请求书，默认5个
        conf.setMaxErrorRetry(2); // 失败后最大重试次数，默认2次
        OSSLog.enableLog();
        return new OSSClient(BaseApp.application, endpoint, credentialProvider, conf);
    }


    // 从本地文件上传，使用非阻塞的异步接口
    public static void asyncPutObjectFromLocalFile(OSSClient oss, String mBucketName, String objectKey, String uploadFilePath, UploadCallback uploadCallback) {
        // 构造上传请求
        PutObjectRequest put = new PutObjectRequest(mBucketName, objectKey, uploadFilePath);

        // 异步上传时可以设置进度回调
        put.setProgressCallback((request, currentSize, totalSize) -> Logger.d("PutObject", "currentSize: " + currentSize + " totalSize: " + totalSize));

        oss.asyncPutObject(put, new OSSCompletedCallback<PutObjectRequest, PutObjectResult>() {
            @Override
            public void onSuccess(PutObjectRequest request, PutObjectResult result) {
                Logger.d("ETag->"+result.getETag());
                Logger.d("RequestId->"+result.getRequestId());
                runUIThread(uploadCallback,true);
            }

            @Override
            public void onFailure(PutObjectRequest request, ClientException clientExcepion, ServiceException serviceException) {
                // 请求异常
                if (clientExcepion != null) {
                    // 本地异常如网络异常等
                    clientExcepion.printStackTrace();
                }
                if (serviceException != null) {
                    // 服务异常
                    Logger.d("ErrorCode->"+serviceException.getErrorCode());
                    Logger.d("RequestId->"+serviceException.getRequestId());
                    Logger.d("HostId->"+serviceException.getHostId());
                    Logger.d("RawMessage->"+serviceException.getRawMessage());
                }
                runUIThread(uploadCallback,false);
            }
        });
    }

    private static void runUIThread(UploadCallback uploadCallback,boolean isSuccess){
        HandlerUtils.runOnUiThread(() -> {
            if(isSuccess){
                uploadCallback.onSucess();
            }else {
                uploadCallback.onFailure();
            }
        });

    }
    public interface UploadCallback {
        void onSucess();

        void onFailure();
    }
}
