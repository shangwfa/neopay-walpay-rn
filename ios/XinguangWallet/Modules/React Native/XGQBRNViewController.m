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

#import "RCTBridgeModule.h"

@interface XGQBRNViewController () <CNContactPickerDelegate>

@property (nonatomic,weak) RCTRootView *rootView;
//@property (nonatomic,copy) RCTResponseSenderBlock contactCommBlock;

@end

@implementation XGQBRNViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleDefault;
    
    //RN页面禁用IQKeyboardManager
    [IQKeyboardManager sharedManager].enable = NO;
    
    [kNotificationCenter addObserver:self selector:@selector(RNJumpBackToNative) name:kNotificationRNJumpBackToNative object:nil];
    [kNotificationCenter addObserver:self selector:@selector(RNJumpBackToNativeResetLoginPwd) name:kNotificationRNJumpBackToNativeResetLoginPwd object:nil];
    [kNotificationCenter addObserver:self selector:@selector(RNJumpBackToNativeResetPayPwd) name:kNotificationRNJumpBackToNativeResetPayPwd object:nil];
    [kNotificationCenter addObserver:self selector:@selector(RNJumpIntoSecondLevel) name:kNotificationRNJumpIntoSecondLevel object:nil];
    [kNotificationCenter addObserver:self selector:@selector(RNJumpBackToFirstLevel) name:kNotificationRNJumpBackToFirstLevel object:nil];
    [kNotificationCenter addObserver:self selector:@selector(RNModalContactList:) name:kNotificationRNModalContactList object:nil];
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
                                                           @"statusBarHeight":statusBarHeiStr,
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
    if (arc4random()%2) {
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
    
    //countryCode非公开属性,可能会有被拒风险
    NSString *countryCode =[phoneNumber valueForKey:@"countryCode"];
    
    //处理手机号
    if (![countryCode isEqualToString:@"cn"]) {
        [SVProgressHUD showInfoWithStatus:@"不支持境外手机号"];
        return;
    }
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

@end
