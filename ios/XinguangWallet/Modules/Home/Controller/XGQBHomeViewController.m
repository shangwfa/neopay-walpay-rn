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
#import "XGQBHomeTitleBtn.h"
#import "XGQBHomeCellView.h"
#import "XGQBHomeTableView.h"
#import "XGQBHeaderIconView.h"

#import "XGQBAPPRootViewController.h"

#import "XGQBNoContentViewController.h"
#import "XGQBNetworkFailureViewController.h"

#import "XGQBMessage.h"


#import "XGQBIDAlertViewController.h"
#import "XGQBIDAlertTransiton.h"


#import "XGQBCommissionViewController.h"

#import "XGQBRNViewController.h"

#import "XGQBRootWebViewController.h"

#define titleViewHeight (kScaledSizeW(134))
#define cellViewHeight (kScaledSizeW(152))
#define homeNAVHeight 75

@interface XGQBHomeViewController () <UIViewControllerTransitioningDelegate,UITableViewDelegate,XGQBHomeTitleViewBtnDelegate,XGQBHomeHeaderIconBtnDelegata>
@property (nonatomic,weak) XGQBHeaderIconView *headerIconView;
@property (nonatomic,weak) UILabel *userNameLabel;
@property (nonatomic,weak) XGQBHomeTitleView *homeTitleView;
@property (nonatomic,weak) XGQBHomeTableView* homeTableView;
@property (nonatomic,weak) XGQBHomeTableViewController *homeTVC;

@end

@implementation XGQBHomeViewController

#pragma mark - VC生命周期
- (void)viewDidLoad {
    
    [super viewDidLoad];
    self.navigationController.navigationBarHidden = YES;
    self.view.backgroundColor = UIColorHex(EFEFEF);
    
    [self setUpViewComponents];
    
    if ([GVUserDefaults standardUserDefaults].loginFirstTime) {
        [self checkIDStatus];
        [GVUserDefaults standardUserDefaults].loginFirstTime=NO;
    }
    

    //接受实名认证通知,跳转至实名认证页面
    [kNotificationCenter addObserver:self selector:@selector(registerID) name:kNotificationRegisterIDAction object:nil];

}

-(void)viewWillAppear:(BOOL)animated
{
//    JKLog();
    [super viewWillAppear:animated];
    self.navigationController.navigationBarHidden = YES;
    [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleLightContent;
    self.view.transform = CGAffineTransformIdentity;
    
    //刷新头像和用户名标签
    [self refreshAvatarAndNickName];
}

-(void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
    [self.homeTVC refreshData];
}

-(void)refreshAvatarAndNickName
{
    //获取用户信息
    [MemberCoreService getUserInfo:@{@"accessToken":[GVUserDefaults standardUserDefaults].accessToken}.mutableCopy andSuccessFn:^(id responseAfter, id responseBefore) {
        
        //设置公共参数
        [GVUserDefaults standardUserDefaults].name=[responseAfter objectForKey:@"name"];
        [GVUserDefaults standardUserDefaults].uuid=[responseAfter objectForKey:@"uuid"];
        [GVUserDefaults standardUserDefaults].phone=[responseAfter objectForKey:@"phone"];
        [GVUserDefaults standardUserDefaults].userStatus=[[responseAfter objectForKey:@"userStatus"]intValue];
        [GVUserDefaults standardUserDefaults].nickName=[responseAfter objectForKey:@"nickName"];
        [GVUserDefaults standardUserDefaults].authStatus=[[responseAfter objectForKey:@"authStatus"]intValue];
        [GVUserDefaults standardUserDefaults].avatarUrl=[responseAfter objectForKey:@"avatarUrl"];
        
        [_headerBtn sd_setImageWithURL:[NSURL URLWithString:[GVUserDefaults standardUserDefaults].avatarUrl] forState:UIControlStateNormal placeholderImage:kIMAGENAMED(@"sy_touxiang")];
        _userNameLabel.text = [NSString stringWithFormat:@"Hi，%@",[GVUserDefaults standardUserDefaults].nickName];
        
        [_headerIconView.headerBtn sd_setImageWithURL:[NSURL URLWithString:[GVUserDefaults standardUserDefaults].avatarUrl] forState:UIControlStateNormal placeholderImage:kIMAGENAMED(@"sy_touxiang")];
        
        _headerIconView.userNameLabel.text = [NSString stringWithFormat:@"Hi，%@",[GVUserDefaults standardUserDefaults].nickName];
        
        
        [kNotificationCenter postNotificationName:kNotificationSideViewUpdateAvatar object:nil];
        
    } andFailerFn:^(NSError *error) {
        
    }];
    

}

#pragma mark - 设置视图组件
-(void)setUpViewComponents
{
    //顶部背景图
    NSString *bgImgName = @"sy_beijing8";
    //判断是否是iPhone X
    if (kiPhoneX) {
        bgImgName = @"sy_beijing8_x";
    }
    UIImageView *backgroundImg = [[UIImageView alloc]initWithImage:kIMAGENAMED(bgImgName)];
    [self.view addSubview:backgroundImg];
    
    //tableView视图
    XGQBHomeTableViewController *homeTableVC = [[XGQBHomeTableViewController alloc]initWithStyle:UITableViewStyleGrouped];
    _homeTVC=homeTableVC;
    homeTableVC.tableView.delegate=self;
    //一定要将tableviewcontroller加入到子控制器中,tableview才能点击...
    [kAppWindow.rootViewController addChildViewController:homeTableVC];
    _homeTableView = (XGQBHomeTableView*)homeTableVC.tableView;
    [self.view addSubview:homeTableVC.tableView];

    //顶部视图
    XGQBHomeTitleView *homeTitleView = [[XGQBHomeTitleView alloc]initWithFrame:CGRectMake(0, 75+(kiPhoneX?24:0), kScreenWidth, kScaledSizeW(134))];
    homeTitleView.delegate=self;
    _homeTitleView=homeTitleView;
    [self.view addSubview:homeTitleView];
    
    //头像按钮
    UIButton *headerBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [headerBtn sd_setImageWithURL:[NSURL URLWithString:[GVUserDefaults standardUserDefaults].avatarUrl] forState:UIControlStateNormal placeholderImage:kIMAGENAMED(@"sy_touxiang")];
    _headerBtn = headerBtn;
    [self.view addSubview:headerBtn];
    [headerBtn addTarget:(XGQBAPPRootViewController*)self.parentViewController.parentViewController action:@selector(openSideView) forControlEvents:UIControlEventTouchUpInside];
    
    //用户名标签
    UILabel *userNameLabel = [[UILabel alloc]init];
    userNameLabel.textColor = kWhiteColor;
    userNameLabel.text = [NSString stringWithFormat:@"Hi，%@",[GVUserDefaults standardUserDefaults].nickName];
    userNameLabel.font = kSYSTEMFONT(17.0);
    [self.view addSubview:userNameLabel];
    _userNameLabel = userNameLabel;
    
    //顶部缩略图
    XGQBHeaderIconView *headerIconView = [[XGQBHeaderIconView alloc]initWithFrame:CGRectMake(0, 0, kScreenWidth, 75+(kiPhoneX?24:0))];
    headerIconView.alpha=0;
    _headerIconView = headerIconView;
    headerIconView.delegate=self;
    [headerIconView.headerBtn addTarget:(XGQBAPPRootViewController*)self.parentViewController.parentViewController action:@selector(openSideView) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:headerIconView];

    kWeakSelf(self);
    
    [backgroundImg mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.top.right.equalTo(weakself.view);
        make.height.mas_equalTo(kScaledSizeW(178)+(kiPhoneX?24:0));
    }];
    
    [headerBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(38, 38));
        make.left.equalTo(weakself.view).with.offset(12);
        make.top.equalTo(weakself.view).with.offset(30+(kiPhoneX?24:0));
    }];
    [userNameLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.equalTo(headerBtn.mas_right).with.offset(10);
        make.centerY.equalTo(headerBtn);
    }];
    
    kViewRadius(headerBtn, 19);
}


#pragma mark - 实名认证弹框
//检查是否需要实名认证弹框
-(void)checkIDStatus
{
    //检查实名认证信息
    if ([GVUserDefaults standardUserDefaults].authStatus==XGQBUserAuthStatusUnauthorized) {
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
    XGQBAPPRootViewController *rootVC = (XGQBAPPRootViewController*)kAppWindow.rootViewController;
    [rootVC closeSideView];
    XGQBRNViewController *RNVC = [XGQBRNViewController new];
    RNVC.pageType = @"userInfoCerfity";
    [self.navigationController pushViewController:RNVC animated:YES];
}

#pragma mark - XGQBHomeTitleViewBtnDelegate
- (void)homeTitleBtnClicked:(XGQBHomeTitleBtn *)btn {
    //大红包按钮点击
    if ([btn.titleLabel.text isEqualToString:@"大红包"]) {
        
        if([GVUserDefaults standardUserDefaults].authStatus==XGQBUserAuthStatusUnauthorized){
            [self checkIDStatus];
        }else{
            XGQBRNViewController *RNVC = [XGQBRNViewController new];
            RNVC.pageType = @"bigRedPacketSimple";
            [self.navigationController pushViewController:RNVC animated:YES];
        }
    }else if ([btn.titleLabel.text isEqualToString:@"手机充值"]){//手机充值按钮点击
        
        if([GVUserDefaults standardUserDefaults].authStatus==XGQBUserAuthStatusUnauthorized){
            [self checkIDStatus];
        }else{
            XGQBRNViewController *RNVC = [XGQBRNViewController new];
            RNVC.pageType = @"phoneTopUp";
            [self.navigationController pushViewController:RNVC animated:YES];
        }
    }
}

#pragma mark - XGQBHomeHeaderIconBtnDelegata
-(void)homeHeaderIconBtnClicked:(UIButton *)btn
{
    if (btn.tag==10001) {
        XGQBRNViewController *RNVC = [XGQBRNViewController new];
        RNVC.pageType = @"bigRedPacketSimple";
        [self.navigationController pushViewController:RNVC animated:YES];
    }else if (btn.tag==10002){
        XGQBRNViewController *RNVC = [XGQBRNViewController new];
        RNVC.pageType = @"phoneTopUp";
        [self.navigationController pushViewController:RNVC animated:YES];
    }
}

#pragma mark - tableViewDelegate
-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (_homeTVC.messArr.count) {//如果有消息
        XGQBMessage *message = _homeTVC.messArr[indexPath.row];
        
        //红包消息
        if (message.msgType==XGQBMessageTypeRedPacket) {
            //先检查实名认证状态
            if([GVUserDefaults standardUserDefaults].authStatus==XGQBUserAuthStatusUnauthorized){
                [self checkIDStatus];
            }else{
                if (message.receiveStatus==XGQBRedPacketReceiveStatusReceiving)
                {//红包未领取,跳转红包领取页
                    
                    //发送领取红包指令
                    NSMutableDictionary *body = [NSMutableDictionary dictionaryWithCapacity:10];
                    [body setObject:message.packetCode forKey:@"packetCode"];
                    [body setObject:[GVUserDefaults standardUserDefaults].accessToken forKey:@"accessToken"];
                    [MemberCoreService receiveRedPacket:body andSuccessFn:^(id responseAfter, id responseBefore) {
                        XGQBRNViewController *RNVC = [[XGQBRNViewController alloc]init];
                        RNVC.pageType = @"rpDetail";
                        RNVC.data=[@{@"packetCode":message.packetCode} mutableCopy];
                        [self.navigationController pushViewController:RNVC animated:YES];
                    } andFailerFn:^(NSError *error) {
                        nil;
                    }];

                }else{
                    //红包已领取,跳转红包广场
                    XGQBRNViewController *RNVC = [[XGQBRNViewController alloc]init];
                    RNVC.pageType = @"redList";
                    [self.navigationController pushViewController:RNVC animated:YES];
                }
                
            }
        }
        //支付消息
        else if(message.msgType==XGQBMessageTypePayMessage)
        {
            XGQBRNViewController *RNVC = [XGQBRNViewController new];
            RNVC.pageType = @"payMessage";
            [self.navigationController pushViewController:RNVC animated:YES];
        }
        //手机充值消息
        else if(message.msgType==XGQBMessageTypePhoneRecharge)
        {
            XGQBRNViewController *RNVC = [XGQBRNViewController new];
            RNVC.pageType = @"topupMsgList";
            [self.navigationController pushViewController:RNVC animated:YES];
        }
        //其他消息
        else{
            XGQBRootWebViewController *rootWVC = [XGQBRootWebViewController webViewControllerWithURL:[NSURL URLWithString:message.themeUrl] andTitle:message.msgTypeText];
            [self.navigationController pushViewController:rootWVC animated:YES];
            return;
        }
    }else{//没有消息
        return;
    }
    
}

-(CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section
{
    return 0;
}

-(CGFloat)tableView:(UITableView *)tableView heightForFooterInSection:(NSInteger)section
{
    return CGFLOAT_MIN;
}

#pragma mark - scrollView Delegate
-(void)scrollViewWillEndDragging:(UIScrollView *)scrollView withVelocity:(CGPoint)velocity targetContentOffset:(inout CGPoint *)targetContentOffset
{
    CGFloat y = scrollView.contentOffset.y;
    
    if(y > -titleViewHeight && y <= 0) {
        if (y > -titleViewHeight/ 2.0) {
            [scrollView setContentOffset:CGPointMake(0, 0) animated:YES];
        }else {
            [scrollView setContentOffset:CGPointMake(0, -titleViewHeight) animated:YES];
        }
    }
}

-(void)scrollViewDidScroll:(UIScrollView *)scrollView
{
    CGFloat originInsetY=-(kScaledSizeW(134.0));//-148
    CGFloat y = scrollView.contentOffset.y;
    //处理开始上划
    if(y > originInsetY) {

        CGRect newFrame = _homeTitleView.frame;
        newFrame.origin.y = 75+(kiPhoneX?24:0)-(y-originInsetY)/2.0;
        _homeTitleView.frame = newFrame;

        //处理透明度
        CGFloat alpha = 1-((y-originInsetY)/(titleViewHeight)*2)>0?1-((y-originInsetY)/(titleViewHeight)*2):0;
        _homeTitleView.alpha = alpha;
        self.headerBtn.alpha = alpha;
        self.userNameLabel.alpha = alpha;

        CGFloat alpha2 = ((y-originInsetY-titleViewHeight/2.0)/titleViewHeight)*2.0>0?((y-originInsetY-titleViewHeight/2.0)/titleViewHeight)*2.0:0;
        self.headerIconView.alpha=alpha2;
    }
    //处理开始下滑时,上方titleView的位置固定,防止出现下滑过快,titleView无法回到初始位置,并且透明度无法回位的情况
    else{
        _homeTitleView.frame = CGRectMake(0, 75+(kiPhoneX?24:0), kScreenWidth, kScaledSizeW(134));
        _homeTitleView.alpha=1.0;
        _headerBtn.alpha=1.0;
        _userNameLabel.alpha=1.0;
        _headerIconView.alpha=0.0;

    }
}



@end
