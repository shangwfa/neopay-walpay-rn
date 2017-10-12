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
    
    return self;
}

-(void)layoutSubviews
{
    [super layoutSubviews];
    CGFloat midX = self.frame.size.width / 2.0;
    CGFloat midY = self.frame.size.height/ 2.0 ;
    self.imageView.size = CGSizeMake(self.frame.size.width, self.frame.size.width*98/90.0);
    self.titleLabel.width = self.frame.size.width*1.2;
    self.titleLabel.height = self.frame.size.height*0.3;
    self.titleLabel.textAlignment = NSTextAlignmentCenter;
    self.titleLabel.center = CGPointMake(midX, midY + 30/40.0*self.frame.size.width);
    self.imageView.center = CGPointMake(midX, midY - 10/40.0*self.frame.size.width);
}

@end
