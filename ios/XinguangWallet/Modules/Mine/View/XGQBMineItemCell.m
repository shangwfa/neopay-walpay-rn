//
//  XGQBMineItemCell.m
//  XinguangWallet
//
//  Created by BossKing on 16/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBMineItemCell.h"

@implementation XGQBMineItemCell

+(instancetype)cellWithImageNamed:(NSString *)imgName title:(NSString *)title
{
    XGQBMineItemCell *cell = [[XGQBMineItemCell alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:@"minecell"];
    cell.backgroundColor = kClearColor;
    
    //准备背景图片
    CGRect rect=CGRectMake(0.0f, 0.0f, 1.0f, 1.0f);
    UIGraphicsBeginImageContext(rect.size);
    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextSetFillColorWithColor(context, [kWhiteColor CGColor]);
    CGContextFillRect(context, rect);
    UIImage *theImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();

    //背景图片
    UIImageView *bgImgV = [[UIImageView alloc]initWithImage:theImage];
    kViewRadius(bgImgV, 4.0);
    
    cell.backgroundView = bgImgV;
    
    //左边图标
    UIImage *cellImg = [UIImage imageNamed:imgName];
    UIImageView *imgView = [[UIImageView alloc]initWithFrame:CGRectMake(0, 0, CGImageGetWidth([cellImg CGImage]), CGImageGetHeight([cellImg CGImage]))];
    imgView.image = cellImg;
    
    //描述文字
    UILabel *titleLabel = [[UILabel alloc]init];
    titleLabel.text = title;
    titleLabel.font = kSYSTEMFONT(14.0);
    titleLabel.textColor = [UIColor colorWithHexString:@"333333"];
    
    //右边箭头
    UIImageView *arrowImg = [[UIImageView alloc]initWithImage:[UIImage imageNamed: @"wd_jiantou"]];
    
    [cell.contentView addSubview:titleLabel];
    [cell.contentView addSubview:imgView];
    [cell.contentView addSubview:arrowImg];
    
    
    //添加约束
    [imgView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.equalTo(cell.contentView).with.offset(15);
        make.centerY.equalTo(cell.contentView);
    }];
    
    [titleLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.equalTo(imgView.mas_right).with.offset(15);
        make.centerY.equalTo(cell.contentView);
    }];
    [arrowImg mas_makeConstraints:^(MASConstraintMaker *make) {
        make.right.equalTo(cell.contentView).with.offset(-15);
        make.centerY.equalTo(cell.contentView);
    }];
    
    
    return cell;
    
    
}





@end
