//
//  XGQBIDAlertView.m
//  XinguangWallet
//
//  Created by BossKing on 11/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBIDAlertView.h"

@interface XGQBIDAlertView()


@end

@implementation XGQBIDAlertView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/



-(instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:CGRectMake(frame.origin.x, frame.origin.y, 316, 390)];
    
    [self setupViewComponents];
    
    
    return self;
}

-(void)setupViewComponents
{
    
    //暂不认证
    UIButton *cancelBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [cancelBtn setTitle:@"暂不认证" forState:UIControlStateNormal];
    [cancelBtn setTitleColor:kBlueColor forState:UIControlStateNormal];
    cancelBtn.frame = CGRectMake(100, 100, 100, 50);
    [cancelBtn addTarget:self action:@selector(dismissVC) forControlEvents:UIControlEventTouchUpInside];
    [self addSubview: cancelBtn];
    
    self.backgroundColor = kRedColor;
}

-(void)dismissVC
{
    [self.superview.viewController dismissViewControllerAnimated:YES completion:nil];
}

@end
