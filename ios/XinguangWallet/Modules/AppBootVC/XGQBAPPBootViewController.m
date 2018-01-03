//
//  XGQBAPPBootViewController.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 26/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBAPPBootViewController.h"
#import "XGQBLoginViewController.h"

#import "XGQBPureColorBtn.h"

@interface XGQBAPPBootViewController ()<UIScrollViewDelegate>

@property (nonatomic,strong)UIPageControl *pageControl;
@property (nonatomic,strong)UIScrollView *bootScrollV;

@end

@implementation XGQBAPPBootViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.view.backgroundColor = kWhiteColor;
    // Do any additional setup after loading the view.
    
    UIScrollView *bootScrollV = [[UIScrollView alloc]initWithFrame:kScreenBounds];
    bootScrollV.delegate = self;
    _bootScrollV = bootScrollV;
    [self.view addSubview:bootScrollV];
    bootScrollV.contentSize = CGSizeMake(2*kScreenWidth, kScreenHeight);
    bootScrollV.pagingEnabled = YES;
    bootScrollV.showsHorizontalScrollIndicator = NO;
    
    [self addPageWithIndex:0];
    [self addPageWithIndex:1];

    UIPageControl *pageControl = [[UIPageControl alloc]initWithFrame:CGRectMake(kScreenWidth/2.0-50, kScreenHeight-50, 100, 30)];
    [self.view addSubview:pageControl];
    _pageControl = pageControl;
    pageControl.numberOfPages = 2;
    pageControl.currentPage = (bootScrollV.contentOffset.x/kScreenWidth);
    pageControl.pageIndicatorTintColor= kWhiteColor;
    pageControl.currentPageIndicatorTintColor = UIColorHex(F34646);
    
}

-(void)addPageWithIndex:(NSInteger)index
{
    //引导页1
    UIView *page = [[UIView alloc]initWithFrame:CGRectMake(kScreenWidth*index, 0, kScreenWidth, kScreenHeight)];
    page.backgroundColor=kWhiteColor;
    
    NSString *iconName = [NSString stringWithFormat:@"yindao%ld",(long)index+1];
    
    UIImageView *icon = [[UIImageView alloc]initWithImage:kIMAGENAMED(iconName)];
    [page addSubview:icon];
    
    NSString *desStr1 = @"大红包,满天飞";
    NSString *desStr2 = @"增进你我联系";
    
    UILabel *desLabel1 = [[UILabel alloc]initWithFrame:CGRectMake(0, 0, 200, 50)];
    UILabel *desLabel2 = [[UILabel alloc]initWithFrame:CGRectMake(0, 0, 250, 70)];

    desLabel1.text = desStr1;
    desLabel2.text = desStr2;
    
    desLabel1.font = kSYSTEMFONT(18.0);
    desLabel1.textColor = UIColorHex(F34646);
    desLabel2.font = kBOLDSYSTEMFONT(20.0);
    desLabel2.textColor = UIColorHex(F34646);
    
    [page addSubview:desLabel1];
    [page addSubview:desLabel2];
    
    [icon mas_updateConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(250, 250));
        make.centerX.equalTo(page);
        make.centerY.equalTo(page).with.offset(-50);
    }];
    
    [desLabel1 mas_updateConstraints:^(MASConstraintMaker *make) {
        make.centerX.equalTo(page);
        make.top.equalTo(icon.mas_bottom).with.offset(20);
    }];
    
    [desLabel2 mas_updateConstraints:^(MASConstraintMaker *make) {
        make.centerX.equalTo(page);
        make.top.equalTo(desLabel1.mas_bottom).with.offset(20);
    }];
    
    if (index==1) {
        
        XGQBPureColorBtn *skipButton = [XGQBPureColorBtn buttonWithText:@"点击进入" andColor:kWhiteColor];
        skipButton.frame = CGRectMake(0, 0, 150, 30);
        skipButton.backgroundColor= kWhiteColor;
        [skipButton setTitleColor:UIColorHex(F34646) forState:UIControlStateNormal];
        
        kViewBorderRadius(skipButton, 15, 1, UIColorHex(F34646));
        
        [page addSubview:skipButton];
        
        [skipButton addTarget:self action:@selector(btnclicked) forControlEvents:UIControlEventTouchUpInside];
        
        [skipButton mas_updateConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(120, 36));
            make.centerX.equalTo(page);
            make.top.equalTo(desLabel2.mas_bottom).with.offset(50);
        }];
        
    }
    
    [_bootScrollV addSubview:page];
}

-(void)btnclicked
{
    if ([GVUserDefaults standardUserDefaults].accessToken) {
        kPostNotification(kNotificationLoginStateChange, @YES);
    }else{
        kPostNotification(kNotificationLoginStateChange, @NO);
    }
}

-(void)scrollViewDidScroll:(UIScrollView *)scrollView
{
    _pageControl.currentPage = scrollView.contentOffset.x/kScreenWidth+0.5;
}

@end
