//
//  XGQBRNViewController.m
//  XinguangWallet
//
//  Created by BossKing on 10/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBRNViewController.h"

#import "RCTRootView.h"
#import "RCTDevLoadingView.h"

#import "XGQBRegResetPwdTVController.h"

#import <Contacts/Contacts.h>
#import <ContactsUI/ContactsUI.h>
#import "AliyunOSSiOS.h"
#import "RCTBridgeModule.h"
#import <UShareUI/UShareUI.h>

#import <AVFoundation/AVFoundation.h>

#import <Photos/Photos.h>

@interface XGQBRNViewController () <CNContactPickerDelegate,UINavigationControllerDelegate,UIImagePickerControllerDelegate>

@property (nonatomic,weak) RCTRootView *rootView;
//@property (nonatomic,copy) RCTResponseSenderBlock contactCommBlock;

@property(nonatomic,strong) UIImage *chosenAvatarImg;

@end

@implementation XGQBRNViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    if(!_data)
    {
        _data = [NSMutableDictionary dictionaryWithCapacity:0];
        [_data setObject:@(true) forKey:@"origin"];
    }else
    {
        [_data setObject:@(true) forKey:@"origin"];
    }
    
    [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleDefault;
    
    //RN页面禁用IQKeyboardManager
    [IQKeyboardManager sharedManager].enable = NO;
    
    [kNotificationCenter addObserver:self selector:@selector(RNJumpBackToNative) name:kNotificationRNJumpBackToNative object:nil];
    [kNotificationCenter addObserver:self selector:@selector(RNJumpBackToNativeResetLoginPwd) name:kNotificationRNJumpBackToNativeResetLoginPwd object:nil];
    [kNotificationCenter addObserver:self selector:@selector(RNJumpBackToNativeResetPayPwd) name:kNotificationRNJumpBackToNativeResetPayPwd object:nil];
    [kNotificationCenter addObserver:self selector:@selector(RNJumpIntoSecondLevel) name:kNotificationRNJumpIntoSecondLevel object:nil];
    [kNotificationCenter addObserver:self selector:@selector(RNJumpBackToFirstLevel) name:kNotificationRNJumpBackToFirstLevel object:nil];
    [kNotificationCenter addObserver:self selector:@selector(RNModalContactList:) name:kNotificationRNModalContactList object:nil];
    [kNotificationCenter addObserver:self selector:@selector(RNModalPictureActionSheet) name:kNotificationRNModalPicSelActSheet object:nil];
    [kNotificationCenter addObserver:self selector:@selector(RNShareRedPacket:) name:kNotificaitonRNCallNativeCallShare object:nil];
    //预先加载RN页面
    
    AppDelegate *appDelegate=(AppDelegate*)[[UIApplication sharedApplication] delegate];

    
    NSString *jsCodeLocationStr = appDelegate.jsCodeLocationArr[[GVUserDefaults standardUserDefaults].RNRouter]?appDelegate.jsCodeLocationArr[[GVUserDefaults standardUserDefaults].RNRouter]:@"http://localhost:8081/index.ios.bundle?platform=ios";

    NSURL *jsCodeLocation = [NSURL URLWithString:jsCodeLocationStr];
    
    //隐藏顶部loading from 提示
    [RCTDevLoadingView setEnabled:NO];
    
    //RCT初始化方法必须在主线程执行,开子线程报错
    
    //获取导航栏高度
    CGFloat statusBarHeight=[UIApplication sharedApplication].statusBarFrame.size.height;
    NSString *statusBarHeiStr = [NSString stringWithFormat:@"%.0f",statusBarHeight];
    
    //获取iPhone型号
    NSString *iphoneDevice = [IphoneDevice deviceVersion];
    
    [SVProgressHUD show];
    
    RCTRootView *rootView =
    [[RCTRootView alloc] initWithBundleURL : jsCodeLocation
                         moduleName        : @"neopay_walpay"
                         initialProperties :@{@"params": @{@"page":_pageType,
                                                           @"data":_data, @"statusBarHeight":statusBarHeiStr,
                                                           @"iphoneDevice":iphoneDevice}}
                          launchOptions    : nil];
    
    self.view = rootView;
    _rootView = rootView;
    
    
    [SVProgressHUD dismiss];
    // Do any additional setup after loading the view.
}

-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleDefault;

    self.navigationController.navigationBarHidden = YES;
    self.navigationController.interactivePopGestureRecognizer.enabled = YES;
    
    [kNotificationCenter postNotificationName:kNotificationNavPushToSecondLevel object:nil];
    
}

-(void)viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];
    self.navigationController.interactivePopGestureRecognizer.enabled = YES;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(void)RNJumpBackToNative
{
    [self.navigationController popViewControllerAnimated:YES];
}
-(void)RNJumpIntoSecondLevel
{
    self.navigationController.interactivePopGestureRecognizer.enabled = NO;
}
-(void)RNJumpBackToFirstLevel
{
    self.navigationController.interactivePopGestureRecognizer.enabled = YES;
}

-(void)RNJumpBackToNativeResetLoginPwd
{
    XGQBRegResetPwdTVController *resetLoginPwdVC = [XGQBRegResetPwdTVController tableVCWithType:XGQBRegResetPwdTVConTypeResetLoginPwd];
    [self.navigationController pushViewController:resetLoginPwdVC animated:YES];
}

-(void)RNJumpBackToNativeResetPayPwd
{
    if ([GVUserDefaults standardUserDefaults].authStatus == XGQBUserAuthStatusUnauthorized) {//未实名
        XGQBRegResetPwdTVController *resetPayPwdVC = [XGQBRegResetPwdTVController tableVCWithType:XGQBRegResetPwdTVConTypeResetPayPwdNoID];
        [self.navigationController pushViewController:resetPayPwdVC animated:YES];
    }else
    {
        XGQBRegResetPwdTVController *resetPayPwdVC = [XGQBRegResetPwdTVController tableVCWithType:XGQBRegResetPwdTVConTypeResetPayPwdWithID];
        [self.navigationController pushViewController:resetPayPwdVC animated:YES];
    }
}

#pragma mark - Contacts Picker
-(void)RNModalContactList:(NSNotification*)notification
{
//        _contactCommBlock = [notification object];
        CNContactPickerViewController *contactPickerVC = [[CNContactPickerViewController alloc]init];
        contactPickerVC.displayedPropertyKeys=@[@"phoneNumbers"];
        NSPredicate *phoneNumberPredicate = [NSPredicate predicateWithFormat:@"phoneNumbers.@count>0"];

        contactPickerVC.predicateForSelectionOfContact = phoneNumberPredicate;
        
        NSPredicate *propertyPredicate = [NSPredicate predicateWithFormat:@"key=='phoneNumbers'"];
        
        contactPickerVC.predicateForSelectionOfProperty = propertyPredicate;
        
        contactPickerVC.delegate = self;
    
        [self.navigationController presentViewController:contactPickerVC animated:YES completion:nil];

}

- (void)contactPicker:(CNContactPickerViewController *)picker didSelectContactProperty:(CNContactProperty *)contactProperty
{
    CNPhoneNumber *phoneNumber = (CNPhoneNumber*)contactProperty.value;
//
//    //countryCode非公开属性,可能会有被拒风险
//    NSString *countryCode =[phoneNumber valueForKey:@"countryCode"];
//
//    //处理手机号
//    if (![countryCode isEqualToString:@"cn"]) {
//        [SVProgressHUD showInfoWithStatus:@"不支持境外手机号"];
//        return;
//    }
    NSString *phoneNumberStr = [phoneNumber stringValue];
    phoneNumberStr = [phoneNumberStr stringByReplacingOccurrencesOfString:@" " withString:@""];
    phoneNumberStr = [phoneNumberStr stringByReplacingOccurrencesOfString:@"-" withString:@""];
    phoneNumberStr = [phoneNumberStr stringByReplacingOccurrencesOfString:@"+86" withString:@""];
    if ([[phoneNumberStr substringWithRange:NSMakeRange(0, 2)]isEqualToString:@"86"]) {
        phoneNumberStr=[phoneNumberStr stringByReplacingCharactersInRange:NSMakeRange(0, 2) withString:@""];
    }
    
    if([phoneNumberStr length]!=11){
        [SVProgressHUD showInfoWithStatus:@"请选择正确手机号"];
        return;
    }
//    _contactCommBlock(@[phoneNumberStr]);
    
//    XGQBRNEventEmitter *eventEmitter = [[XGQBRNEventEmitter alloc]init];
////    [eventEmitter sendEventWithName:@"ContactSelected" body:phoneNumberStr];
//    [eventEmitter tellJS];
    
    [kNotificationCenter postNotificationName:kNotificationGetContactPhoneNoToRN object:nil userInfo:@{@"PhoneNo":phoneNumberStr}];
    
}

#pragma mark - Avatar Upload
-(void)RNModalPictureActionSheet
{
    UIImagePickerController *imgPicVC = [[UIImagePickerController alloc]init];
    imgPicVC.delegate = self;
    
    UIAlertController *alertVC = [UIAlertController alertControllerWithTitle:@"请选择图片" message:nil preferredStyle:UIAlertControllerStyleActionSheet];

    kWeakSelf(self);
    UIAlertAction *action1 = [UIAlertAction actionWithTitle:@"拍照" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        
        //判断是否有权限访问相机
        AVAuthorizationStatus authStatus = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeVideo];
        
        if(authStatus == AVAuthorizationStatusRestricted || authStatus == AVAuthorizationStatusDenied){
//            [SVProgressHUD showInfoWithStatus:@"未获得相机隐私授权"];
            [self modalPrivacyAlertVCWithType:YES];
            return;
        }
        
        imgPicVC.sourceType = UIImagePickerControllerSourceTypeCamera;
        [weakself presentViewController:imgPicVC animated:YES completion:^{
            JKLog();
        }];
    }];
    UIAlertAction *action2 = [UIAlertAction actionWithTitle:@"从相册选择" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        
        //判断是否有权限访问照片
        PHAuthorizationStatus authorStatus = [PHPhotoLibrary authorizationStatus];
        
        if(authorStatus == PHAuthorizationStatusRestricted || authorStatus == PHAuthorizationStatusDenied){
//            [SVProgressHUD showInfoWithStatus:@"未获得相册权限"];
            [self modalPrivacyAlertVCWithType:NO];
            return;
        }
        
        imgPicVC.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
        [weakself presentViewController:imgPicVC animated:YES completion:^{
            JKLog();
        }];
    }];
        
    UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
        JKLog();
    }];

    [alertVC addAction:action1];
    [alertVC addAction:action2];
    [alertVC addAction:cancelAction];

    [self presentViewController:alertVC animated:YES completion:nil];
    
}

-(void)modalPrivacyAlertVCWithType:(BOOL)type
{
    
    NSString *mess = [NSString string];
    if (type) {
        mess =@"相机权限未开启，如需使用请进入设置中开启相机权限";
    }else{
        mess=@"相册权限未开启，如需使用请进入设置中开启相册权限";
    }
    UIAlertController *alertVC = [UIAlertController alertControllerWithTitle:nil message:mess preferredStyle:UIAlertControllerStyleAlert];
    
    UIAlertAction *confirmAction = [UIAlertAction actionWithTitle:@"确定" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
        nil;
    }];
    
    [alertVC addAction:confirmAction];
    
    [self presentViewController:alertVC animated:YES completion:nil];
}

- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary<NSString *,id> *)info;
{
    NSString *mediaType = [info objectForKey:UIImagePickerControllerMediaType];
    
    JKLog(@"%@",info);
    
    if ([mediaType isEqualToString:@"public.image"]) {
        //获取到图片
        UIImage *imageOrigin = [info objectForKey:@"UIImagePickerControllerOriginalImage"];
        
        UIGraphicsBeginImageContext(CGSizeMake(500,500));
        [imageOrigin drawInRect:CGRectMake(0, 0, 500, 500)];
        imageOrigin = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();
        _chosenAvatarImg = imageOrigin;
        [self getSecurityToken];
    }
    
    [self dismissViewControllerAnimated:YES completion:nil];
}

-(void)getSecurityToken
{
    [MemberCoreService getSecurityToken:[@{@"type":@2} mutableCopy] andSuccessFn:^(id responseAfter, id responseBefore) {
        JKLog(@"%@",responseAfter);
        [self uploadDataWith:responseAfter and:_chosenAvatarImg];
    } andFailerFn:^(NSError *error) {
        nil;
    }];
}

-(void)uploadDataWith:(id)responseAfter and:(UIImage*)image
{
        NSString *endpoint = [responseAfter objectForKey:@"endpoint"];
        id<OSSCredentialProvider> credential = [[OSSStsTokenCredentialProvider alloc]initWithAccessKeyId:[responseAfter objectForKey:@"accessKeyId"] secretKeyId:[responseAfter objectForKey:@"accessKeySecret"] securityToken:[responseAfter objectForKey:@"securityToken"]];
        
        OSSClient* client = [[OSSClient alloc] initWithEndpoint:endpoint credentialProvider:credential];
        
        OSSPutObjectRequest * put = [OSSPutObjectRequest new];
        put.bucketName = [responseAfter objectForKey:@"bucket"];
        NSString* uuid = [[[[NSUUID UUID] UUIDString] stringByReplacingOccurrencesOfString:@"-" withString:@""] lowercaseString];
        
        put.objectKey = [NSString stringWithFormat:@"%@%@%@",[responseAfter objectForKey:@"directory"],uuid,[self typeForImageData:UIImageJPEGRepresentation(image,1)]];
    
        put.uploadingData = UIImageJPEGRepresentation(image,.3);
        
        put.uploadProgress = ^(int64_t bytesSent, int64_t totalByteSent, int64_t totalBytesExpectedToSend) {
            JKLog(@"%lld, %lld, %lld", bytesSent, totalByteSent, totalBytesExpectedToSend);
        };
        OSSTask * putTask = [client putObject:put];
    
        [SVProgressHUD showWithStatus:[NSString stringWithFormat:@"正在上传"]];
    
        [putTask continueWithBlock:^id(OSSTask *task) {
            
            if (!task.error) {
                NSString* imgUrl = [responseAfter objectForKey:@"fileTemplateUrl"];
                
                imgUrl = [imgUrl stringByReplacingOccurrencesOfString:@"${bucket}" withString:[responseAfter objectForKey:@"bucket"]];
                imgUrl = [imgUrl stringByReplacingOccurrencesOfString:@"${directory}" withString:[responseAfter objectForKey:@"directory"]];
                imgUrl = [imgUrl stringByReplacingOccurrencesOfString:@"${fileName}" withString:[NSString stringWithFormat:@"%@%@",uuid,[self typeForImageData:UIImageJPEGRepresentation(image,1)]]];
                
                //                NSString* imgUrl = [NSString stringWithFormat:@"http://%@.oss-cn-shanghai.aliyuncs.com/%@%@%@",[responseAfter objectForKey:@"bucket"],[responseAfter objectForKey:@"directory"],uuid,[self typeForImageData:UIImageJPEGRepresentation(images[indexI],1)]];
                
                JKLog(@"upload object success!");
                
                JKLog(@"url is %@",imgUrl);
                
                [self postChosenAvatarWithURL:(NSString*)imgUrl];
                
            } else {
                [SVProgressHUD dismiss];
                JKLog(@"upload object failed, error: %@" , task.error);
            }
            return nil;
        }];
    
}

- (NSString *)typeForImageData:(NSData *)data
{
    uint8_t c;
    
    [data getBytes:&c length:1];
    
    switch (c) {
            
        case 0xFF:
            
            return @".jpg";
            
        case 0x89:
            
            return @".png";
    }
    return nil;
}

-(void)postChosenAvatarWithURL:(NSString*)imgUrl
{
//    NSMutableDictionary *body = [NSMutableDictionary dictionaryWithCapacity:10];
//    [body setObject:imgUrl forKey:@"avatarUrl"];
//
//    [MemberCoreService modifyUserAvatarURL:body andSuccessFn:^(id responseAfter, id responseBefore) {
//        [SVProgressHUD showSuccessWithStatus:@"头像上传成功"];
//
//    } andFailerFn:^(NSError *error) {
//        nil;
//    }];
    
    [kNotificationCenter postNotificationName:kNotificationNativeSendAvatarURLToRN object:nil userInfo:@{@"avatarURL":imgUrl}];
    
}

#pragma mark - 友盟分享红包
-(void)RNShareRedPacket:(NSNotification*)notification
{
    JKLog(@"%@",notification);
    //显示分享面板
    [UMSocialUIManager setPreDefinePlatforms:@[[NSNumber numberWithInteger:UMSocialPlatformType_WechatSession],[NSNumber numberWithInteger:  UMSocialPlatformType_WechatTimeLine]]];
    [UMSocialUIManager showShareMenuViewInWindowWithPlatformSelectionBlock:^(UMSocialPlatformType platformType, NSDictionary *userInfo) {
        // 根据获取的platformType确定所选平台进行下一步操作
        [self shareWebPageToPlatformType:platformType withNotification:notification];
    }];
}

- (void)shareWebPageToPlatformType:(UMSocialPlatformType)platformType withNotification:(NSNotification*)notification
{
    
    //获取红包内容
    NSString *packetCode = [notification.userInfo objectForKey:@"packetCode"];
    NSString *shareType = [notification.userInfo objectForKey:@"shareType"];
    
    NSMutableDictionary *body = [NSMutableDictionary dictionaryWithCapacity:10];
    [body setObject:packetCode forKey:@"code"];
    [body setObject:shareType forKey:@"shareType"];
    
    [MemberCoreService addShare:body andSuccessFn:^(id responseAfter, id responseBefore) {
        //创建分享消息对象
        UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
        
        //创建网页内容对象
        NSString* thumbURL =  [responseAfter objectForKey:@"imgUrl"];
        UMShareWebpageObject *shareObject = [UMShareWebpageObject shareObjectWithTitle:[responseAfter objectForKey:@"title"] descr:[responseAfter objectForKey:@"desc"] thumImage:thumbURL];
        //设置网页地址
        shareObject.webpageUrl = [responseAfter objectForKey:@"goUrl"];
        
        //分享消息对象设置分享内容对象
        messageObject.shareObject = shareObject;
        
        //调用分享接口
        [[UMSocialManager defaultManager] shareToPlatform:platformType messageObject:messageObject currentViewController:self completion:^(id data, NSError *error) {
            if (error) {
                UMSocialLogInfo(@"************Share fail with error %@*********",error);
            }else{
                if ([data isKindOfClass:[UMSocialShareResponse class]]) {
                    UMSocialShareResponse *resp = data;
                    //分享结果消息
                    UMSocialLogInfo(@"response message is %@",resp.message);
                    //第三方原始返回的数据
                    UMSocialLogInfo(@"response originalResponse data is %@",resp.originalResponse);
                }else{
                    UMSocialLogInfo(@"response data is %@",data);
                }
            }
        }];
    } andFailerFn:^(NSError *error) {
        nil;
    }];
}

@end
