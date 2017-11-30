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



#import "XGQBIDAlertViewController.h"
#import "XGQBIDAlertTransiton.h"


#import "XGQBCommissionViewController.h"

#import "XGQBRNViewController.h"

#define titleViewHeight (kScreenWidth*134/375.0)
#define cellViewHeight (kScreenWidth*152/375.0)
#define homeNAVHeight 75

@interface XGQBHomeViewController () <UIViewControllerTransitioningDelegate,UITableViewDelegate,XGQBHomeTitleViewBtnDelegate,XGQBHomeHeaderIconBtnDelegata>
@property (nonatomic,weak) UIView *headerIconView;
@property (nonatomic,weak) UILabel *userNameLabel;
@property (nonatomic,weak) XGQBHomeTitleView *homeTitleView;
@property (nonatomic,weak) XGQBHomeTableView* homeTableView;

@property (nonatomic,strong) NSMutableArray *messArr;


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
    


    //tableView视图
    XGQBHomeTableViewController *homeTableVC = [[XGQBHomeTableViewController alloc]initWithStyle:UITableViewStyleGrouped];
    homeTableVC.tableView.delegate=self;
    //一定要将tableviewcontroller加入到子控制器中,tableview才能点击...
    [kAppWindow.rootViewController addChildViewController:homeTableVC];
    _homeTableView = (XGQBHomeTableView*)homeTableVC.tableView;
    [self.view addSubview:homeTableVC.tableView];

    //顶部视图
    XGQBHomeTitleView *homeTitleView = [[XGQBHomeTitleView alloc]initWithFrame:CGRectMake(0, 75, kScreenWidth, kScreenWidth*134/375.0)];
    homeTitleView.delegate=self;
    _homeTitleView=homeTitleView;
    [self.view addSubview:homeTitleView];
    
    //头像按钮
    UIButton *headerBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [headerBtn sd_setImageWithURL:[NSURL URLWithString:[GVUserDefaults standardUserDefaults].avatarUrl] forState:UIControlStateNormal placeholderImage:[UIImage imageNamed:@"sy_touxiang"]];
    kViewRadius(headerBtn.imageView, 19);
    _headerBtn = headerBtn;
    [self.view addSubview:headerBtn];
    [headerBtn addTarget:(XGQBAPPRootViewController*)self.parentViewController.parentViewController action:@selector(openSideView) forControlEvents:UIControlEventTouchUpInside];
    
    //用户名标签
    UILabel *userNameLabel = [[UILabel alloc]init];
    userNameLabel.textColor = kWhiteColor;
    userNameLabel.text = [NSString stringWithFormat:@"Hi，%@",[GVUserDefaults standardUserDefaults].name];
    userNameLabel.font = kSYSTEMFONT(17.0);
    [self.view addSubview:userNameLabel];
    _userNameLabel = userNameLabel;
    
    //顶部缩略图
    XGQBHeaderIconView *headerIconView = [[XGQBHeaderIconView alloc]initWithFrame:CGRectMake(0, 0, kScreenWidth, 75)];
    headerIconView.alpha=0;
    _headerIconView = headerIconView;
    headerIconView.delegate=self;
    [headerIconView.headerBtn addTarget:(XGQBAPPRootViewController*)self.parentViewController.parentViewController action:@selector(openSideView) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:headerIconView];


    kWeakSelf(self);
    
    [backgroundImg mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.top.right.equalTo(weakself.view);
        make.height.mas_equalTo(178/375.0*kScreenWidth);
    }];
    
    [headerBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(38, 38));
        make.left.equalTo(weakself.view).with.offset(12);
        make.top.equalTo(weakself.view).with.offset(30);
    }];
    [userNameLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.equalTo(headerBtn.mas_right).with.offset(10);
        make.centerY.equalTo(headerBtn);
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

#pragma mark - XGQBHomeTitleViewBtnDelegate
- (void)homeTitleBtnClicked:(XGQBHomeTitleBtn *)btn {
    if ([btn.titleLabel.text isEqualToString:@"大红包"]) {
        XGQBRNViewController *RNVC = [XGQBRNViewController new];
        RNVC.pageType = @"bigRedPacket";
        [self.navigationController pushViewController:RNVC animated:YES];
    }else if ([btn.titleLabel.text isEqualToString:@"手机充值"]){
        XGQBRNViewController *RNVC = [XGQBRNViewController new];
        RNVC.pageType = @"phoneTopUp";
        [self.navigationController pushViewController:RNVC animated:YES];
    }
}

#pragma mark - XGQBHomeHeaderIconBtnDelegata
-(void)homeHeaderIconBtnClicked:(UIButton *)btn
{
    if (btn.tag==10001) {
        XGQBRNViewController *RNVC = [XGQBRNViewController new];
        RNVC.pageType = @"bigRedPacket";
        [self.navigationController pushViewController:RNVC animated:YES];
    }else if (btn.tag==10002){
        XGQBRNViewController *RNVC = [XGQBRNViewController new];
        RNVC.pageType = @"phoneTopUp";
        [self.navigationController pushViewController:RNVC animated:YES];
    }
}

#pragma mark - tableViewDelegate

-(NSMutableArray*)messArr
{
    if (!_messArr) {
        
        _messArr = [NSMutableArray arrayWithContentsOfFile:[[NSBundle mainBundle]pathForResource:@"mess" ofType:@"plist"]];
    }
    return _messArr;
}

-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    NSDictionary *messDict = self.messArr[indexPath.row];

    if ([messDict[@"type"]isEqualToString:@"payMess"]) {
        XGQBRNViewController *RNVC = [[XGQBRNViewController alloc]init];
        RNVC.pageType = @"payMessage";
        [self.view.superview.viewController.navigationController pushViewController:RNVC animated:YES];
    }
    else if([messDict[@"type"]isEqualToString:@"mobileMess"])
    {
        XGQBRNViewController *RNVC = [XGQBRNViewController new];
        RNVC.pageType = @"topupMsgList";
        [self.view.superview.viewController.navigationController pushViewController:RNVC animated:YES];
    }else if([messDict[@"type"]isEqualToString:@"redPacketAct"])
    {
        XGQBRNViewController *RNVC = [XGQBRNViewController new];
        RNVC.pageType = @"redList";
        [self.view.superview.viewController.navigationController pushViewController:RNVC animated:YES];
    }

    else if (arc4random()%2) {
        XGQBNoContentViewController *noContentVC = [XGQBNoContentViewController new];
        [self.view.superview.viewController.navigationController pushViewController:noContentVC animated:YES];
    }else{
        XGQBNetworkFailureViewController *netWorkFailVC = [XGQBNetworkFailureViewController new];
        [self.view.superview.viewController.navigationController pushViewController:netWorkFailVC animated:YES];

    }
    
    NSLog(@"点击了第%ld行",(long)indexPath.row);
}

-(CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section
{
    return 8;
}

-(CGFloat)tableView:(UITableView *)tableView heightForFooterInSection:(NSInteger)section
{
    return CGFLOAT_MIN;
}

-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    NSDictionary *messDict = self.messArr[indexPath.row];
    
    if ([messDict[@"type"]containsString:@"Mess"]) {
        return (79+8);
    }
    else{
        return (218*kScreenWidth/375.0+8);
    }
}

#pragma mark - scrollView Delegate
-(void)scrollViewWillEndDragging:(UIScrollView *)scrollView withVelocity:(CGPoint)velocity targetContentOffset:(inout CGPoint *)targetContentOffset
{
    CGFloat y = scrollView.contentOffset.y;
    NSLog(@"%f",y);
    
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
    CGFloat originInsetY=-(kScreenWidth*134.0/375.0);//-148
    CGFloat y = scrollView.contentOffset.y;
    NSLog(@"scrollviewDidScroll:%f",y);
    //处理开始上划
    if(y > originInsetY) {
        
        CGRect newFrame = _homeTitleView.frame;
        newFrame.origin.y = 75-(y-originInsetY)/2.0;
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
        _homeTitleView.frame = CGRectMake(0, 75, kScreenWidth, kScreenWidth*134/375.0);
        _homeTitleView.alpha=1.0;
        _headerBtn.alpha=1.0;
        _userNameLabel.alpha=1.0;
        _headerIconView.alpha=0.0;
        
    }
}



@end
