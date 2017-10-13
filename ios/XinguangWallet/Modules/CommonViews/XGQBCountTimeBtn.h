//
//  CountTimeButton.h
//  NeoPay
//
//  Created by Jesus on 2017/5/4.
//  Copyright © 2017年 Jesus. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface XGQBCountTimeBtn : UIButton

@property (nonatomic,strong)NSString* titleStr;
@property (nonatomic,assign)int second;
@property (nonatomic,copy)BOOL (^clickBlock)(void);
@property (nonatomic,strong)NSTimer* timer;

-(void)startCountDown;

@end
