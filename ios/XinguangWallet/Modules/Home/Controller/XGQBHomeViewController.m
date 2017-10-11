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
#import "XGQBHomeTitleBtn.h"



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
    //扫一扫
    XGQBHomeTitleBtn *scanBtn = [XGQBHomeTitleBtn buttonWithType:UIButtonTypeCustom];
    XGQBHomeTitleBtn *payCodeBtn = [XGQBHomeTitleBtn buttonWithType:UIButtonTypeCustom];
    XGQBHomeTitleBtn *accountBtn = [XGQBHomeTitleBtn buttonWithType:UIButtonTypeCustom];
    
    [scanBtn setImage:[UIImage imageNamed:@"sy_saoyisao"] forState:UIControlStateNormal];
    [payCodeBtn setImage:[UIImage imageNamed:@"sy_fuqianma"] forState:UIControlStateNormal];
    [accountBtn setImage:[UIImage imageNamed:@"sy_yue"] forState:UIControlStateNormal];
    
    [scanBtn setTitle:@"扫一扫" forState:UIControlStateNormal];
    [payCodeBtn setTitle:@"二维码" forState:UIControlStateNormal];
    [accountBtn setTitle:@"余额" forState:UIControlStateNormal];
    
    [self.view addSubview:scanBtn];
    [self.view addSubview:payCodeBtn];
    [self.view addSubview:accountBtn];

    
    
    //主业务图标视图
    XGQBHomeCellView *homeCellView = [XGQBHomeCellView new];
    [self.view addSubview:homeCellView];
    
    //广告视图
    XGQBHomeBottomADView *homeADView = [XGQBHomeBottomADView new];
    [self.view addSubview:homeADView];
    
    //实名认证弹窗
    UIView *popupView = [[UIView alloc]initWithFrame:CGRectMake(0, 0, kScreenWidth, kScreenHeight)];
    popupView.backgroundColor = [UIColor grayColor];
    
//    [[UIApplication sharedApplication].keyWindow addSubview:popupView];
    
    
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
    
    [scanBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(45, 70));
        make.bottom.equalTo(backgroundImg).with.offset(-25);
        make.left.equalTo(backgroundImg).with.offset(57);
    }];
    
    [payCodeBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.equalTo(scanBtn);
        make.centerX.equalTo(backgroundImg);
        make.bottom.equalTo(scanBtn);
    }];
    
    [accountBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.equalTo(scanBtn);
        make.right.equalTo(backgroundImg).with.offset(-57);
        make.bottom.equalTo(scanBtn);
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
