//
//  XGQBPureColorBtn.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 27/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBPureColorBtn.h"

@implementation XGQBPureColorBtn

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

+(instancetype)buttonWithText:(NSString *)text andColor:(UIColor *)color
{
    XGQBPureColorBtn *btn = [XGQBPureColorBtn buttonWithType:UIButtonTypeCustom];
    [btn setTitle:text forState:UIControlStateNormal];
    btn.layer.masksToBounds = YES;
    btn.layer.cornerRadius = 3.0;
    [btn setBackgroundColor:color forState:UIControlStateNormal];
    //取消button的高亮效果
//    btn.showsTouchWhenHighlighted =NO;
    return btn;
}


-(void)setBackgroundColor:(UIColor *)color forState:(UIControlState)state
{
     [self setBackgroundImage:[self createImageWithColor:color] forState:state];
}

- (UIImage*)createImageWithColor: (UIColor*) color
{
    CGRect rect=CGRectMake(0.0f, 0.0f, 1.0f, 1.0f);
    UIGraphicsBeginImageContext(rect.size);
    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextSetFillColorWithColor(context, [color CGColor]);
    CGContextFillRect(context, rect);
    UIImage *theImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return theImage;
}
@end
