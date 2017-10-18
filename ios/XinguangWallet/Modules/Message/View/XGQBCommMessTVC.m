//
//  XGQBCommMessTVC.m
//  XinguangWallet
//
//  Created by BossKing on 17/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBCommMessTVC.h"

@implementation XGQBCommMessTVC


+(instancetype)messTableViewCellWithType:(XGQBCommMessType)type timeLabel:(NSString *)time
{
    XGQBCommMessTVC *cell = [[XGQBCommMessTVC alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:@"mess"];
    
    //左上方logo
    NSString *logoName = [NSString string];
    NSString *titleText = [NSString string];
    
    if (type==XGQBCommMessTypeSystem) {
        logoName = @"xx_xitong";
        titleText = @"系统消息";
    }else if(type == XGQBCommMessTypeShopAd){
        logoName = @"xx_guangbo";
        titleText = @"商家广播";
    }else if(type ==XGQBCommMessTypePayment){
        logoName = @"xx_zhifu";
        titleText = @"支付消息";
    }else if(type== XGQBCommMessTypeCellPhone){
        logoName = @"xx_shouji";
        titleText = @"手机充值";
    }
    
    UIImageView *logo = [[UIImageView alloc]initWithImage:[UIImage imageNamed:logoName]];
    [cell.contentView addSubview:logo];
    
    //标题
    UILabel *titleLable = [[UILabel alloc]init];
    titleLable.text = titleText;
    titleLable.font = kSYSTEMFONT(16.0);
    titleLable.textColor = [UIColor colorWithHexString:@"333333"];
    [cell.contentView addSubview:titleLable];
    
    
    //时间戳
    UILabel *timeLabel = [[UILabel alloc]init];
    timeLabel.text = time;
    timeLabel.font = kSYSTEMFONT(11.0);
    timeLabel.textColor = [UIColor colorWithHexString:@"999999"];
    [cell.contentView addSubview:timeLabel];
    
    //描述文字
    UILabel *desLabel = [[UILabel alloc]init];
    desLabel.text = @"这是描述文字,这是描述文字";
    desLabel.font = kSYSTEMFONT(13.0);
    desLabel.textColor = [UIColor colorWithHexString:@"333333"];
    [cell.contentView addSubview:desLabel];
    
    //增加底部分割线
    UIImage *seperatorLineImg = [cell createImageWithColor:kViewBgColor andFrame:CGRectMake(0, 0, kScreenWidth, 8)];
    UIImageView *seperatorLine = [[UIImageView alloc]initWithImage:seperatorLineImg];
    [cell.contentView addSubview:seperatorLine];
    
    
    //添加约束
    CGFloat sizeRatio = kScreenWidth/375.0;
    
    [logo mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(52*sizeRatio, 52*sizeRatio));
        make.left.equalTo(cell.contentView).with.offset(8*sizeRatio);
        make.centerY.equalTo(cell.contentView);
    }];
    
    [titleLable mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(100*sizeRatio, 17*sizeRatio));
        make.left.equalTo(logo.mas_right).with.offset(17*sizeRatio);
        make.top.equalTo(cell.contentView).with.offset(17*sizeRatio);
    }];
    
    [timeLabel mas_makeConstraints:^(MASConstraintMaker *make) {
//        make.size.mas_equalTo(CGSizeMake(68*sizeRatio, 10*sizeRatio));
        make.right.equalTo(cell.contentView).with.offset(-17*sizeRatio);
        make.centerY.equalTo(titleLable);
    }];
    
    [desLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(270*sizeRatio, 13*sizeRatio));
        make.left.equalTo(titleLable);
        make.top.equalTo(titleLable.mas_bottom).with.offset(16*sizeRatio);
    }];
    
    [seperatorLine mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(kScreenWidth, 8));
        make.left.equalTo(cell.contentView);
        make.top.equalTo(desLabel.mas_bottom).with.offset(16*sizeRatio);
//        make.bottom.equalTo(cell.contentView);
    }];
    
    
    return cell;
}

//创建单色图片 temp
- (UIImage*)createImageWithColor: (UIColor*)color andFrame:(CGRect)frame
{
    UIGraphicsBeginImageContext(frame.size);
    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextSetFillColorWithColor(context, [color CGColor]);
    CGContextFillRect(context, frame);
    UIImage *theImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return theImage;
}

@end
