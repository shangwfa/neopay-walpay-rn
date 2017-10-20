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

    //增加底部透明分隔线
    UIView *separatorLine = [[UIView alloc]initWithFrame:CGRectMake(0, 0, 100, 1)];
    separatorLine.backgroundColor = kClearColor;
    
    [cell.contentView addSubview:bgImgV];
    [cell.contentView addSubview:titleLabel];
    [cell.contentView addSubview:imgView];
    [cell.contentView addSubview:arrowImg];
    [cell.contentView addSubview:separatorLine];
    
    
    //添加约束
    [bgImgV mas_makeConstraints:^(MASConstraintMaker *make) {
//        make.size.mas_equalTo(CGSizeMake(cell.contentView.width, cell.contentView.height-1));
        make.right.equalTo(cell.contentView);
        make.left.equalTo(cell.contentView);
        make.top.equalTo(cell.contentView);
        make.bottom.equalTo(cell.contentView).with.offset(-1);
    }];
    
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
    [separatorLine mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(cell.contentView.width, 1));
        make.left.equalTo(cell.contentView);
        make.bottom.equalTo(cell.contentView);
    }];
    
    
    return cell;
    
    
}





@end
