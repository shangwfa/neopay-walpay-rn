//
//  CountTimeButton.m
//  NeoPay
//
//  Created by Jesus on 2017/5/4.
//  Copyright © 2017年 Jesus. All rights reserved.
//

#import "XGQBCountTimeBtn.h"

@implementation XGQBCountTimeBtn

-(instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:CGRectMake(frame.origin.x, frame.origin.y, 50, 32)];
    if(self)
    {
        self.titleLabel.font = kSYSTEMFONT(12);
        self.layer.cornerRadius = 5.0;
        self.layer.borderWidth = 1.0;
        self.layer.borderColor = kAPPTheamColor.CGColor;
        [self setTitle:@"获取验证码" forState:UIControlStateNormal];
        [self setTitleColor:kAPPTheamColor forState:UIControlStateNormal];
//        [self addTarget:self action:@selector(clickBtn) forControlEvents:UIControlEventTouchUpInside];
    }
    return self;
}

-(void)clickBtn
{
    if(self.clickBlock())
    {
        _timer  = [NSTimer scheduledTimerWithTimeInterval:1 target:self selector:@selector(changeTimeBtn) userInfo:nil repeats:YES];
        [_timer fire];
    }
}

-(void)startCountDown
{
    _timer  = [NSTimer scheduledTimerWithTimeInterval:1 target:self selector:@selector(changeTimeBtn) userInfo:nil repeats:YES];
    _second = 60;
    [_timer fire];
}

-(void)changeTimeBtn
{
    if(_second <= 0)
    {
        [_timer invalidate];
        _timer = nil;
        self.userInteractionEnabled = YES;
        self.layer.borderColor = kAPPTheamColor.CGColor;
        self.backgroundColor = [UIColor clearColor];
        [self setTitle:@"获取验证码" forState:UIControlStateNormal];
        [self setTitleColor:kAPPTheamColor forState:UIControlStateNormal];
        _second = 60;
    }else
    {
        self.userInteractionEnabled = NO;
        self.layer.borderColor = [UIColor colorWithHexString:@"CCCCCC"].CGColor;
        self.backgroundColor = [UIColor colorWithHexString:@"CCCCCC"];
        [self setTitle:[NSString stringWithFormat:@"%dS后重新获取",_second] forState:UIControlStateNormal];
        [self setTitleColor:kWhiteColor forState:UIControlStateNormal];
        
        _second --;
    }
}

@end
