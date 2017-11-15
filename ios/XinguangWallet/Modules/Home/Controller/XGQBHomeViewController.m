//
//  XGQBHomeViewController.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 25/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBHomeViewController.h"
#import "XGQBLoginViewController.h"
#import "XGQBHomeTableViewController.h"

#import "XGQBHomeTitleView.h"



#import "XGQBIDAlertViewController.h"
#import "XGQBIDAlertTransiton.h"

#import "XGQBIDRegisterTableViewController.h"

#import "XGQBCommissionViewController.h"

#import "XGQBRNViewController.h"


@interface XGQBHomeViewController () <UIViewControllerTransitioningDelegate>

@property (nonatomic,strong) XGQBHomeTableViewController *homeTableVC;

@end

@implementation XGQBHomeViewController

#pragma mark - VC生命周期
- (void)viewDidLoad {
    [super viewDidLoad];
    self.navigationController.navigationBarHidden = YES;
    self.view.backgroundColor = kViewBgColor;
    
    XGQBHomeTableViewController *homeTableVC = [[XGQBHomeTableViewController alloc]init];
    _homeTableVC = homeTableVC;

    [self setUpViewComponents];
    [self checkIDStatus];

    //接受实名认证通知,跳转至实名认证页面
    [kNotificationCenter addObserver:self selector:@selector(registerID) name:kNotificationRegisterIDAction object:nil];

}



-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    self.navigationController.navigationBarHidden = YES;
    [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleLightContent;
    self.view.transform = CGAffineTransformIdentity;
}

#pragma mark - 设置视图组件
-(void)setUpViewComponents
{
    //顶部视图
    XGQBHomeTitleView *homeTitleView = [XGQBHomeTitleView new];
    [self.view addSubview:homeTitleView];
    [homeTitleView.scanBtn addTarget:self action:@selector(scanBtnClicked) forControlEvents:UIControlEventTouchUpInside];
    [homeTitleView.codeBtn addTarget:self action:@selector(payCodeBtnClicked) forControlEvents:UIControlEventTouchUpInside];
    [homeTitleView.accountBtn addTarget:self action:@selector(accountBtnClicked) forControlEvents:UIControlEventTouchUpInside];
    [homeTitleView.calenderBtn addTarget:self action:@selector(calenderBtnClicked) forControlEvents:UIControlEventTouchUpInside];
    
    [self.view addSubview:_homeTableVC.tableView];
    
    kWeakSelf(self);
    [homeTitleView mas_makeConstraints:^(MASConstraintMaker *make) {
        
        make.size.mas_equalTo(CGSizeMake(kScreenWidth, kScreenWidth/2.0));
        make.top.equalTo(weakself.view);
        make.left.equalTo(weakself.view);
    }];
    
    [_homeTableVC.tableView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.right.bottom.equalTo(weakself.view);
        make.top.equalTo(homeTitleView.mas_bottom);
    }];
    
    
}

#pragma mark - 处理按钮点击
-(void)scanBtnClicked
{
    XGQBRNViewController *RNVC = [XGQBRNViewController new];
    RNVC.pageType =@"qrCodeScan";
    [self.navigationController pushViewController:RNVC animated:YES];
}

-(void)payCodeBtnClicked
{
    XGQBRNViewController *RNVC = [XGQBRNViewController new];
    RNVC.pageType =@"payCode";
    [self.navigationController pushViewController:RNVC animated:YES];
}

-(void)accountBtnClicked
{
    XGQBRNViewController *RNVC = [XGQBRNViewController new];
    RNVC.pageType =@"myBalance";
    [self.navigationController pushViewController:RNVC animated:YES];
}

-(void)calenderBtnClicked
{
    XGQBCommissionViewController *sVC = [XGQBCommissionViewController new];
    [self.navigationController pushViewController:sVC animated:YES];
    
}
-(void)moreBtnClicked
{
    XGQBRNViewController *RNVC = [XGQBRNViewController new];
    RNVC.pageType = @"activityList";
    [self.navigationController pushViewController:RNVC animated:YES];
    
}

#pragma mark - 实名认证弹框
//检查是否需要实名认证弹框
-(void)checkIDStatus
{
    //检查实名认证信息
    if (YES) {
        XGQBIDAlertViewController *alertIDVC = [XGQBIDAlertViewController new];
        
        alertIDVC.transitioningDelegate = self;

        
        alertIDVC.modalPresentationStyle = UIModalPresentationCustom;
        
        [self.navigationController presentViewController:alertIDVC animated:YES completion:nil];
    }
}
//transition代理方法
- (nullable id <UIViewControllerAnimatedTransitioning>)animationControllerForPresentedController:(UIViewController *)presented presentingController:(UIViewController *)presenting sourceController:(UIViewController *)source
{
    return [[XGQBIDAlertTransiton alloc] init];
}

- (nullable id <UIViewControllerAnimatedTransitioning>)animationControllerForDismissedController:(UIViewController *)dismissed
{
    return [[XGQBIDAlertTransiton alloc] init];
}

#pragma mark - 实名认证页面
-(void)registerID

{
    XGQBIDRegisterTableViewController *registerVC = [[XGQBIDRegisterTableViewController alloc]initWithStyle:UITableViewStyleGrouped];
    [self.navigationController pushViewController:registerVC animated:YES];
}

@end
