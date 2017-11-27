//
//  XGQBHomeViewController.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 25/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBHomeViewController.h"
#import "XGQBLoginViewController.h"

#import "XGQBHomeScrollView.h"
#import "XGQBHomeTitleView.h"
#import "XGQBHomeCellView.h"
#import "XGQBHomeTableView.h"
#import "XGQBHeaderIconView.h"


#import "XGQBIDAlertViewController.h"
#import "XGQBIDAlertTransiton.h"


#import "XGQBCommissionViewController.h"

#import "XGQBRNViewController.h"

#define titleViewHeight (kScreenWidth*134/375.0)
#define cellViewHeight (kScreenWidth*152/375.0)
#define homeNAVHeight 75

@interface XGQBHomeViewController () <UIViewControllerTransitioningDelegate,UIScrollViewDelegate>
@property (nonatomic,weak) XGQBHomeScrollView *homeScrollV;
@property (nonatomic,weak) UIButton *headerBtn;
@property (nonatomic,weak) UIView *headerIconView;
@end

@implementation XGQBHomeViewController

#pragma mark - VC生命周期
- (void)viewDidLoad {
    [super viewDidLoad];
    self.navigationController.navigationBarHidden = YES;
    self.view.backgroundColor = [UIColor colorWithHexString:@"EFEFEF"];
    
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
    //顶部背景图
    UIImageView *backgroundImg = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"sy_beijing8"]];
    [self.view addSubview:backgroundImg];
    
    //头像按钮
    UIButton *headerBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    NSString *headerBtnTitle = [NSString stringWithFormat:@"Hi，%@",[GVUserDefaults standardUserDefaults].name];
    [headerBtn setTitle:headerBtnTitle forState:UIControlStateNormal];
    [headerBtn setImage:[UIImage imageNamed:@"sy_touxiang"] forState:UIControlStateNormal];
    _headerBtn = headerBtn;
    [self.view addSubview:headerBtn];
    
    //顶部缩略图
    XGQBHeaderIconView *headerIconView = [[XGQBHeaderIconView alloc]initWithFrame:CGRectMake(0, 0, kScreenWidth, 75)];
    headerIconView.alpha=0;
    _headerIconView = headerIconView;
    [self.view addSubview:headerIconView];
    
    //滚动视图
    XGQBHomeScrollView *homeScrollV = [[XGQBHomeScrollView alloc]initWithFrame:CGRectMake(0, 75, kScreenWidth, kScreenHeight-75)];
    [self.view addSubview:homeScrollV];
    homeScrollV.delegate = self;
    _homeScrollV=homeScrollV;
                                       
    
    kWeakSelf(self);
    
    [backgroundImg mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.top.right.equalTo(weakself.view);
        make.height.mas_equalTo(178/375.0*kScreenWidth);
    }];
    
    [headerBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(150, 50));
        make.left.equalTo(weakself.view).with.offset(12);
        make.top.equalTo(weakself.view).with.offset(30);
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

#pragma mark - scrollView Delegate

-(void)scrollViewWillEndDragging:(XGQBHomeScrollView *)scrollView withVelocity:(CGPoint)velocity targetContentOffset:(inout CGPoint *)targetContentOffset
{
    CGFloat y = scrollView.contentOffset.y;
    if (y < - 65) {
        [scrollView.homeTableView.mj_header beginRefreshing];
    }else if(y > 0 && y <= titleViewHeight) {
        [scrollView titleViewAnimationWithOffsetY:y];
    }
}

-(void)scrollViewDidScroll:(XGQBHomeScrollView *)scrollView
{
    CGFloat y = scrollView.contentOffset.y;
    if (y <= 0) {
        //下滑时保持头部试图位置不变
        scrollView.homeTitleView.alpha = 1;
        CGRect newFrame = scrollView.homeTitleView.frame;
        newFrame.origin.y = y;
        scrollView.homeTitleView.frame = newFrame;
        
        newFrame = scrollView.homeCellView.frame;
        newFrame.origin.y = y + titleViewHeight;
        scrollView.homeCellView.frame = newFrame;

        newFrame = scrollView.homeTableView.frame;
        newFrame.origin.y = y + titleViewHeight+cellViewHeight;
        scrollView.homeTableView.frame = newFrame;

        //偏移量给到tableview，tableview自己来滑动
        [scrollView.homeTableView setScrollViewContentOffSetWithPoint:CGPointMake(0, y)];
    }
        else if(y < titleViewHeight && y > 0) {
        CGRect newFrame = scrollView.homeTitleView.frame;
        newFrame.origin.y = y/2;
        scrollView.homeTitleView.frame = newFrame;

        //处理透明度
        CGFloat alpha = (1 - y*2/titleViewHeight) > 0 ? (1 - y*2/titleViewHeight) : 0;
        scrollView.homeTitleView.alpha = alpha;
        self.headerBtn.alpha = alpha;

            CGFloat alpha2 = ((y-titleViewHeight/2.0)*2/titleViewHeight)>0?((y-titleViewHeight/2.0)*2/titleViewHeight):0;
        self.headerIconView.alpha=alpha2;
    
    }
}

@end
