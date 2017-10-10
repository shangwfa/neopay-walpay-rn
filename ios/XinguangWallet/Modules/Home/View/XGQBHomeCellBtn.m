//
//  XGQBHomeCellBtn.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 09/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBHomeCellBtn.h"

@implementation XGQBHomeCellBtn

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
        [self setTitleColor:[UIColor blackColor] forState:UIControlStateNormal] ;
    }
    self.titleLabel.font = kSYSTEMFONT(13.0);
    
    return self;
}

-(void)layoutSubviews
{
    [super layoutSubviews];
    CGFloat midX = self.frame.size.width / 2;
    CGFloat midY = self.frame.size.height/ 2 ;
    self.titleLabel.width = self.frame.size.width;
    self.titleLabel.textAlignment = NSTextAlignmentCenter;
    self.titleLabel.center = CGPointMake(midX, midY + 30);
    self.imageView.center = CGPointMake(midX, midY - 10);
}


@end
