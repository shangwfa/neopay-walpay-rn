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
    if (self) {
        [self setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal] ;
    }
    self.titleLabel.font = kSYSTEMFONT(13.0);
    self.titleLabel.textAlignment = NSTextAlignmentCenter;

    
    return self;
}

//-(void)layoutSubviews
//{
//    [super layoutSubviews];
//    CGFloat midX = self.frame.size.width / 2.0;
//    CGFloat midY = self.frame.size.height/ 2.0 ;
//    self.imageView.size = CGSizeMake(self.frame.size.width, self.frame.size.width*98/90.0);
//    self.titleLabel.width = self.frame.size.width*1.2;
//    self.titleLabel.height = self.frame.size.height*0.3;
//    self.titleLabel.textAlignment = NSTextAlignmentCenter;
//    self.titleLabel.center = CGPointMake(midX, midY + 30/40.0*self.frame.size.width);
//    self.imageView.center = CGPointMake(midX, midY - 10/40.0*self.frame.size.width);
//}

-(CGRect)titleRectForContentRect:(CGRect)contentRect
{
    CGFloat titleX = -contentRect.size.width*0.1;
    CGFloat titleY = contentRect.size.height *0.8;
    CGFloat titleW = contentRect.size.width;
    CGFloat titleH = contentRect.size.height*0.2;
    return CGRectMake(titleX, titleY, titleW*1.2, titleH);
}

-(CGRect)imageRectForContentRect:(CGRect)contentRect{
    CGFloat imageW = 45/375.0*kScreenWidth;
    CGFloat imageH = 45/375.0*kScreenWidth;
    return CGRectMake(0, 0, imageW, imageH);
}

@end
