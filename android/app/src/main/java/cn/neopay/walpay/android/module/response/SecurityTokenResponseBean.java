package cn.neopay.walpay.android.module.response;

/**
 * Created by shangwf on 2017/10/17.
 */

public class SecurityTokenResponseBean extends BaseResponse {
    private String accessKeyId;
    private String accessKeySecret;
    private String securityToken;
    private Long validTime;
    private String bucket;
    private String endpoint;
    private String directory;
    private String fileTemplateUrl;

    public String getAccessKeyId() {
        return accessKeyId;
    }

    public void setAccessKeyId(String accessKeyId) {
        this.accessKeyId = accessKeyId;
    }

    public String getAccessKeySecret() {
        return accessKeySecret;
    }

    public void setAccessKeySecret(String accessKeySecret) {
        this.accessKeySecret = accessKeySecret;
    }

    public String getSecurityToken() {
        return securityToken;
    }

    public void setSecurityToken(String securityToken) {
        this.securityToken = securityToken;
    }

    public Long getValidTime() {
        return validTime;
    }

    public void setValidTime(Long validTime) {
        this.validTime = validTime;
    }

    public String getBucket() {
        return bucket;
    }

    public void setBucket(String bucket) {
        this.bucket = bucket;
    }

    public String getEndpoint() {
        return endpoint;
    }

    public void setEndpoint(String endpoint) {
        this.endpoint = endpoint;
    }

    public String getDirectory() {
        return directory;
    }

    public void setDirectory(String directory) {
        this.directory = directory;
    }

    public String getFileTemplateUrl() {
        return fileTemplateUrl;
    }

    public void setFileTemplateUrl(String fileTemplateUrl) {
        this.fileTemplateUrl = fileTemplateUrl;
    }
}
