//
//  XGQBHomeTitleBtn.m
//  XinguangWallet
//
//  Created by BossKing on 10/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBHomeTitleBtn.h"

@implementation XGQBHomeTitleBtn

-(instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];

    [self setTitleColor:[UIColor blackColor] forState:UIControlStateNormal] ;

    self.titleLabel.font = kSYSTEMFONT(13.0);
    self.titleLabel.textAlignment = NSTextAlignmentCenter;
    self.titleLabel.clipsToBounds=NO;
    return self;
}

-(CGRect)titleRectForContentRect:(CGRect)contentRect
{
    CGFloat titleX = -contentRect.size.width*0.2;
    CGFloat titleY = contentRect.size.height *0.7;
    CGFloat titleW = contentRect.size.width;
    CGFloat titleH = contentRect.size.height*0.3;
    return CGRectMake(titleX, titleY, titleW*1.4, titleH);
}

-(CGRect)imageRectForContentRect:(CGRect)contentRect{
    CGFloat imageW = 50/375.0*kScreenWidth;
    CGFloat imageH = 50/375.0*kScreenWidth;
    return CGRectMake(0, 0, imageW, imageH);
}

@end
