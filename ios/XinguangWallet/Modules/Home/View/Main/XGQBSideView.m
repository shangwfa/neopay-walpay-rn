//
//  XGQBSideView.m
//  XinguangWallet
//
//  Created by BossKing on 14/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBSideView.h"

@interface XGQBSideView ()

@property (nonatomic,strong) UILabel *routerLabel;

@end

@implementation XGQBSideView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

-(instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    
    if (self) {
        self.backgroundColor = kViewBgColor;
        [self addsubviews];
    }
    
    return self;
}

-(void)addsubviews{
    //临时退出登录按钮
    YYLabel *logoutLabel = [YYLabel new];
    logoutLabel.text = @"退出登录";
    logoutLabel.textAlignment = NSTextAlignmentCenter;
    logoutLabel.backgroundColor = [UIColor redColor];
    
    logoutLabel.frame = CGRectMake(20, 100, 200, 50);
    [self addSubview:logoutLabel];
    
    [logoutLabel setTextTapAction:^(UIView * _Nonnull containerView, NSAttributedString * _Nonnull text, NSRange range, CGRect rect) {
        [GVUserDefaults standardUserDefaults].accessToken = nil;
        [kNotificationCenter postNotificationName:kNotificationLoginStateChange object:@NO];
    }];
    
    //临时充值app运行次数按钮
    YYLabel *restRunCount = [YYLabel new];
    restRunCount.text = @"重置运行次数";
    restRunCount.textAlignment = NSTextAlignmentCenter;
    restRunCount.backgroundColor = [UIColor redColor];
    
    restRunCount.frame = CGRectMake(20, 170, 200, 50);
    [self addSubview:restRunCount];
    
    [restRunCount setTextTapAction:^(UIView * _Nonnull containerView, NSAttributedString * _Nonnull text, NSRange range, CGRect rect) {
        [GVUserDefaults standardUserDefaults].runCount = 0;
    }];
    
    //临时跳转登录页面按钮
    UIButton *button = [[UIButton alloc]initWithFrame:(CGRectMake(20, 240, 200, 50))];
    [button setTitle:@"跳转登录页面" forState:UIControlStateNormal];
    [self addSubview:button];
    button.backgroundColor = [UIColor redColor];
    [button addTarget:self action:@selector(pushToLoginVC) forControlEvents:UIControlEventTouchUpInside];
    //    NSLog(@"%s",__func__);
    
    //临时修改RN路径按钮
    UIButton *changeRNRouter = [[UIButton alloc]initWithFrame:(CGRectMake(20, 310, 200, 50))];
    [changeRNRouter setTitle:@"更换RNRouter" forState:UIControlStateNormal];
    [self addSubview:changeRNRouter];
    changeRNRouter.backgroundColor = [UIColor redColor];
    [changeRNRouter addTarget:self action:@selector(changeRNRouter) forControlEvents:UIControlEventTouchUpInside];
    
    //路径label
    UILabel *jsRouterLabel = [[UILabel alloc]initWithFrame:CGRectMake(20, 380, kScreenWidth-40, 50)];
    jsRouterLabel.font = kSYSTEMFONT(14.0);
    [self addSubview:jsRouterLabel];
    
    AppDelegate *appDelegate =(AppDelegate*)[[UIApplication sharedApplication]delegate];
    int i = [GVUserDefaults standardUserDefaults].RNRouter;
    
    
    
    jsRouterLabel.text = [self convertURLtoSimpleStr:appDelegate.jsCodeLocationArr[i]];
    _routerLabel = jsRouterLabel;
}

-(void)pushToLoginVC
{
    [kNotificationCenter postNotificationName:kNotificationLoginStateChange object:@NO];
}

-(void)changeRNRouter
{
    int i =[GVUserDefaults standardUserDefaults].RNRouter;
    
    AppDelegate *appDelegate =(AppDelegate*)[[UIApplication sharedApplication]delegate];
    
    if (i==appDelegate.jsCodeLocationArr.count-1) {
        i=0;
    }else{
        i++;
    }
    
    [GVUserDefaults standardUserDefaults].RNRouter =i;
    
    _routerLabel.text =[self convertURLtoSimpleStr:appDelegate.jsCodeLocationArr[i]];
}


-(NSString*)convertURLtoSimpleStr:(NSString*)str
{
    NSString *oriText = str;
    NSString *textAfter = @"";
    if ([oriText containsString:@"http://"]) {
        NSRange portRange = [oriText rangeOfString:@":8081"];
        textAfter = [[oriText substringToIndex:portRange.location]copy];
        NSRange httpRange = [textAfter rangeOfString:@"http://"];
        textAfter = [textAfter substringFromIndex:httpRange.length+httpRange.location];
    }else{
        textAfter = @"本地包";
    }
    return [NSString stringWithFormat:@"RN包地址:%@",textAfter];
}

@end
