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
#import "XGQBHomeCellView.h"
#import "XGQBHomeTitleBtn.h"


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
    self.view.backgroundColor = [UIColor colorWithHexString:@"EFEFEF"];
    
    XGQBHomeTableViewController *homeTableVC = [[XGQBHomeTableViewController alloc]initWithStyle:UITableViewStyleGrouped];
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
    XGQBHomeTitleView *homeTitleView = [[XGQBHomeTitleView alloc]initWithFrame:CGRectMake(0, 0, kScreenWidth, kScreenWidth*209/375.0)];
    [homeTitleView.redPacketBtn addTarget:self action:@selector(redPacketBtnClicked) forControlEvents:UIControlEventTouchUpInside];
    [homeTitleView.phoneTopUpBtn addTarget:self action:@selector(phoneTopUpBtnClicked) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:homeTitleView];
    
    //cell视图
    XGQBHomeCellView *homeCellView =[[XGQBHomeCellView alloc]initWithFrame:CGRectMake(0, kScreenWidth*209/375.0, kScreenWidth, kScreenWidth*152/375.0)];
    [self.view addSubview:homeCellView];
    
    //tableView视图
    [self.view addSubview:_homeTableVC.tableView];
    
    kWeakSelf(self);
    [homeTitleView mas_makeConstraints:^(MASConstraintMaker *make) {
        
        make.size.mas_equalTo(CGSizeMake(kScreenWidth, kScreenWidth*209/375.0));
        make.top.equalTo(weakself.view);
        make.left.equalTo(weakself.view);
    }];
    
    [homeCellView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(kScreenWidth, kScreenWidth*152/375.0));
        make.top.equalTo(homeTitleView.mas_bottom);
        make.left.equalTo(weakself.view);
    }];
    
    
    [_homeTableVC.tableView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.right.equalTo(weakself.view);
        make.bottom.equalTo(weakself.view).with.offset(0);
        make.top.equalTo(homeCellView.mas_bottom);
    }];
    
    
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
    XGQBRNViewController *RNVC = [XGQBRNViewController new];
    RNVC.pageType = @"userInfoCerfity";
    [self.navigationController pushViewController:RNVC animated:YES];
}

#pragma mark - 按钮点击
-(void)redPacketBtnClicked
{
    XGQBRNViewController *RNVC = [XGQBRNViewController new];
    RNVC.pageType = @"bigRedPacket";
    [self.navigationController pushViewController:RNVC animated:YES];
}

-(void)phoneTopUpBtnClicked
{
    XGQBRNViewController *RNVC = [XGQBRNViewController new];
    RNVC.pageType = @"phoneTopUp";
    [self.navigationController pushViewController:RNVC animated:YES];
}
@end
