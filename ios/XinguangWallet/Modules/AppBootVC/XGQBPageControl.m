//
//  XGQBPageControl.m
//  XinguangWallet
//
//  Created by BossKing on 03/01/2018.
//  Copyright © 2018 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBPageControl.h"

@interface XGQBPageControl()


@end

@implementation XGQBPageControl

-(void) setCurrentPage:(NSInteger)page
{
    [super setCurrentPage:page];
    
    [self setUpDots];
}

-(void)setUpDots{
    
    for (int i=0; i<[self.subviews count]; i++) {
        //圆点
        UIView* dot = [self.subviews objectAtIndex:i];
        //添加imageView
        if ([dot.subviews count] == 0) {
            UIImageView * view = [[UIImageView alloc]initWithFrame:dot.bounds];
            [dot addSubview:view];
        };
        
        //配置imageView
        UIImageView * view = dot.subviews[0];
        
        if (i==self.currentPage) {
//            view.image=self.currentImage;
//            dot.backgroundColor = [UIColor clearColor];
            view.backgroundColor = kRedColor;
            kViewBorderRadius(view, view.size.width/2.0, 1.0, UIColorHex(F64B4C));
        }else {
//            view.image=self.defaultImage;
//            dot.backgroundColor = [UIColor clearColor];
            view.backgroundColor = kClearColor;
            kViewBorderRadius(view, view.size.width/2.0, 1.0, UIColorHex(F64B4C));
        }
    }
}

@end
