//
//  XGQBActiRedPView.m
//  XinguangWallet
//
//  Created by BossKing on 25/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBActiRedPView.h"

@implementation XGQBActiRedPView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

-(instancetype)init
{
    //红包图片
    UIImage *redPImg = [UIImage imageNamed:@"xx_hongbao7"];
    UIImageView *redPImgV = [[UIImageView alloc]initWithImage:redPImg];
    
    UILabel *desText = [[UILabel alloc]initWithFrame:CGRectMake(98, 51, 163, 17)];
    desText.text = @"新店开张,多多捧场";
    desText.font = kSYSTEMFONT(17);
    desText.textColor = [UIColor colorWithHexString:@"FBDEB0"];
    UILabel *shopText = [[UILabel alloc]initWithFrame:CGRectMake(98, 91, 200, 14)];
    shopText.font = kSYSTEMFONT(13);
    shopText.textColor = [UIColor colorWithHexString:@"FBDEB0"];
    shopText.text = @"——来自胡萝卜的兔子店的红包";
    
    XGQBActiRedPView *redPV = [[XGQBActiRedPView alloc]initWithFrame:CGRectMake(0, 0, 350/375.0*kScreenWidth, 155/375.0*kScreenWidth)];
    
    [redPV addSubview:redPImgV];
    [redPV addSubview:desText];
    [redPV addSubview:shopText];
    
    return redPV;
    
}

@end
