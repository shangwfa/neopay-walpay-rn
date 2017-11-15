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
#import "XGQBHomeBannerView.h"
#import "XGQBHomeCellBtn.h"

#import "XGQBIDAlertViewController.h"
#import "XGQBIDAlertTransiton.h"

#import "XGQBIDRegisterTableViewController.h"

#import "XGQBCommissionViewController.h"

#import "XGQBRNViewController.h"


@interface XGQBHomeViewController () <UIViewControllerTransitioningDelegate, XGQBHomeCellViewDelegate>


@end

@implementation XGQBHomeViewController

#pragma mark - VC生命周期
- (void)viewDidLoad {
    [super viewDidLoad];
    self.navigationController.navigationBarHidden = YES;
    self.view.backgroundColor = kViewBgColor;

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

//-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
//{
//    self.view.transform = CGAffineTransformMakeTranslation(100, 200);
//
//}
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
    [homeTitleView.scanBtn addTarget:self action:@selector(scanBtnClicked) forControlEvents:UIControlEventTouchUpInside];
    [homeTitleView.codeBtn addTarget:self action:@selector(payCodeBtnClicked) forControlEvents:UIControlEventTouchUpInside];
    [homeTitleView.accountBtn addTarget:self action:@selector(accountBtnClicked) forControlEvents:UIControlEventTouchUpInside];
    [homeTitleView.calenderBtn addTarget:self action:@selector(calenderBtnClicked) forControlEvents:UIControlEventTouchUpInside];
    
    //添加滚动视图
    UIScrollView *homeScrollView = [[UIScrollView alloc]init];
//    homeScrollView.contentSize= CGSizeMake(kScreenWidth, 400);
    [self.view addSubview:homeScrollView];
    
    //添加滚动视图容器视图
    UIView *homeScrollViewContainer = [[UIView alloc]init];
    [homeScrollView addSubview:homeScrollViewContainer];
    
    //主业务图标视图
    XGQBHomeCellView *homeCellView = [XGQBHomeCellView new];
    homeCellView.delegate = self;
    [homeScrollViewContainer addSubview:homeCellView];

    
    //广告视图
    XGQBHomeBannerView *homeADView = [XGQBHomeBannerView new];
    [homeADView.moreBtn addTarget:self action:@selector(moreBtnClicked) forControlEvents:UIControlEventTouchUpInside];
    [homeScrollViewContainer addSubview:homeADView];
    
    //添加约束
    kWeakSelf(self);
    
    [homeTitleView mas_makeConstraints:^(MASConstraintMaker *make) {
        
        make.size.mas_equalTo(CGSizeMake(kScreenWidth, kScreenWidth/2.0));
        make.top.equalTo(weakself.view);
        make.left.equalTo(weakself.view);
    }];
    
    [homeScrollView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(homeTitleView.mas_bottom);
        make.left.equalTo(weakself.view);
        make.bottom.equalTo(weakself.view).with.offset(-44);
        make.right.equalTo(weakself.view);
    }];
    
    [homeScrollViewContainer mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.left.right.bottom.equalTo(homeScrollView);
        make.width.equalTo(homeScrollView);
    }];

    [homeCellView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(kScreenWidth, kScreenWidth*0.584));
        make.top.equalTo(homeScrollViewContainer);
        make.left.equalTo(homeScrollViewContainer);
    }];
    
    [homeADView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(kScreenWidth, kScreenWidth*0.557));
        make.top.equalTo(homeCellView.mas_bottom).with.offset(10);
        make.left.equalTo(homeScrollViewContainer);
        make.bottom.equalTo(homeScrollViewContainer).with.offset(0);
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
    
//    NSURL *phoneURL = [NSURL URLWithString:[NSString stringWithFormat:@"tel://%@",@"18668180337"]];
//    [[UIApplication sharedApplication]openURL: phoneURL];
//
//    UIWebView * callWebview = [[UIWebView alloc]init];
//    [callWebview loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@"tel:10010"]]];
//    [[UIApplication sharedApplication].keyWindow addSubview:callWebview];

    
}
-(void)moreBtnClicked
{
    XGQBRNViewController *RNVC = [XGQBRNViewController new];
    RNVC.pageType = @"activityList";
    [self.navigationController pushViewController:RNVC animated:YES];
    
}

#pragma mark - 按钮点击代理
-(void)btnClicked:(XGQBHomeCellBtn *)btn
{
    if ([btn.titleLabel.text isEqualToString:@"卡包"]) {
        
        XGQBRNViewController *RNVC = [XGQBRNViewController new];
        RNVC.pageType =@"cardPack";
        [self.navigationController pushViewController:RNVC animated:YES];
    }else if([btn.titleLabel.text isEqualToString:@"手机充值"]){
        XGQBRNViewController *RNVC = [XGQBRNViewController new];
        RNVC.pageType = @"phoneTopUp";
        [self.navigationController pushViewController:RNVC animated:YES];
    }else if([btn.titleLabel.text isEqualToString:@"大红包"]){
        XGQBRNViewController *RNVC =[XGQBRNViewController new];
        RNVC.pageType = @"bigRedPacket";
        [self.navigationController pushViewController:RNVC animated:YES];
    }
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
