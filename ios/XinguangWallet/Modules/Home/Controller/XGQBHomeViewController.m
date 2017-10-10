//
//  XGQBHomeViewController.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 25/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBHomeViewController.h"
#import "XGQBLoginViewController.h"
#import "RCTRootView.h"

#import "XGQBHomeCellView.h"
#import "XGQBHomeBottomADView.h"



@interface XGQBHomeViewController ()

@end

@implementation XGQBHomeViewController


- (void)viewDidLoad {
    [super viewDidLoad];
    self.navigationController.navigationBarHidden = YES;
    self.view.backgroundColor = [UIColor colorWithHexString:@"F5F5F5"];
    
    [self setUpViewComponents];

}

-(void)setUpViewComponents
{
    //首页背景
    UIImageView *backgroundImg = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"sy_beijing"]];
    [self.view addSubview:backgroundImg];

    //左上方logo
    UIImageView *leftTopLogoImg = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"sy_logo"]];
    [self.view addSubview:leftTopLogoImg];
    
    //右上方日历图标
    UIButton *calenderBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [calenderBtn setBackgroundImage:[UIImage imageNamed:@"sy_qiandao"] forState:UIControlStateNormal];
    [self.view addSubview:calenderBtn];
    
    //添加头部功能按键
    
    //主业务图标视图
    XGQBHomeCellView *homeCellView = [XGQBHomeCellView new];
    [self.view addSubview:homeCellView];
    
    //广告视图
    XGQBHomeBottomADView *homeADView = [XGQBHomeBottomADView new];
    [self.view addSubview:homeADView];
    
    
    //添加约束
    kWeakSelf(self);
    [backgroundImg mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(kScreenWidth, kScreenWidth/2));
        make.left.equalTo(weakself.view);
        make.top.equalTo(weakself.view);
    }];
    
    [leftTopLogoImg mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(181/2, 47/2));
        make.left.equalTo(weakself.view).with.offset(12);
        make.top.equalTo(weakself.view).with.offset(34);
    }];
    
    [calenderBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(20, 20));
        make.right.equalTo(weakself.view).with.offset(-12);
        make.centerY.equalTo(leftTopLogoImg);
    }];
    [homeCellView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(kScreenWidth, 219));
        make.top.equalTo(backgroundImg.mas_bottom);
        make.left.equalTo(weakself.view);
    }];
    
    [homeADView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(kScreenWidth, kScreenWidth*0.557+49));
        make.bottom.equalTo(self.view);
        make.left.equalTo(self.view);
    }];
    
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
