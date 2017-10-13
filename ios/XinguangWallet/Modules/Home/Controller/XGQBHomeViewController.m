//
//  XGQBHomeViewController.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 25/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBHomeViewController.h"
#import "XGQBLoginViewController.h"

#import "XGQBHomeTitleView.h"
#import "XGQBHomeCellView.h"
#import "XGQBHomeBottomADView.h"

#import "XGQBIDAlertViewController.h"
#import "XGQBIDAlertTransiton.h"

#import "XGQBIDRegisterTableViewController.h"



@interface XGQBHomeViewController () <UIViewControllerTransitioningDelegate>

@end

@implementation XGQBHomeViewController

#pragma mark - VC生命周期
- (void)viewDidLoad {
    [super viewDidLoad];
    self.navigationController.navigationBarHidden = YES;
    self.view.backgroundColor = [UIColor colorWithHexString:@"F5F5F5"];
    
    [self setUpViewComponents];
    [self checkIDStatus];
    
    //接受实名认证通知,跳转至实名认证页面
    [kNotificationCenter addObserver:self selector:@selector(registerID) name:kNotificationRegisterIDAction object:nil];

}

-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    self.navigationController.navigationBarHidden = YES;

}
- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - 设置视图组件
-(void)setUpViewComponents
{
    

    //顶部视图
    XGQBHomeTitleView *homeTitleView = [XGQBHomeTitleView new];
    [self.view addSubview:homeTitleView];
    
    //主业务图标视图
    XGQBHomeCellView *homeCellView = [XGQBHomeCellView new];
    [self.view addSubview:homeCellView];
    
    //广告视图
    XGQBHomeBottomADView *homeADView = [XGQBHomeBottomADView new];
    [self.view addSubview:homeADView];
    
    //添加约束
    kWeakSelf(self);
    
    [homeTitleView mas_makeConstraints:^(MASConstraintMaker *make) {
        
        make.size.mas_equalTo(CGSizeMake(kScreenWidth, kScreenWidth/2.0));
        make.top.equalTo(weakself.view);
        make.left.equalTo(weakself.view);
    }];

    [homeCellView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(kScreenWidth, kScreenWidth*0.584));
        make.top.equalTo(homeTitleView.mas_bottom);
        make.left.equalTo(weakself.view);
    }];
    
    [homeADView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(kScreenWidth, kScreenWidth*0.557));
        make.top.equalTo(homeCellView.mas_bottom).with.offset(10);
        make.left.equalTo(self.view);
    }];

}

#pragma mark - 处理按钮点击
-(void)calenderBtnClicked
{
    
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
        
        [self presentViewController:alertIDVC animated:YES completion:nil];
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
