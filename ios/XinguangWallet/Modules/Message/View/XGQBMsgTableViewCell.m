//
//  XGQBMsgTableViewCell.m
//  XinguangWallet
//
//  Created by BossKing on 30/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBMsgTableViewCell.h"
#import "XGQBMessage.h"

@implementation XGQBMsgTableViewCell

+(XGQBMsgTableViewCell *)cellWithMessage:(XGQBMessage *)message
{
    XGQBMsgTableViewCell *cell =[[XGQBMsgTableViewCell alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:message.msgTypeText];
    
    //红包消息
    if (message.msgType.intValue==1) {
        
        //红包来啦标题栏
        UIImageView *titleImgV =[[UIImageView alloc]initWithImage:kIMAGENAMED(@"sy_hongbaolaila5")];
        
        //时间标签
        UILabel *timeLabel =[[UILabel alloc]initWithFrame:CGRectMake(0, 0, 70, 11)];
        timeLabel.font = kSYSTEMFONT(11.0);
        timeLabel.textColor=UIColorHex(999999);
        timeLabel.text=message.createTime;
        
        //背景图片
        UIImage *bgImg = kIMAGENAMED(@"beijing");
        UIImageView *bgImgV =[[UIImageView alloc]initWithFrame:CGRectMake(0, 0, kScreenWidth-2*12, kScreenWidth*155/375.0)];
        [bgImgV sd_setImageWithURL:[NSURL URLWithString:message.themeUrl] placeholderImage:bgImg];
        kViewRadius(bgImgV, 5);
        
        //图标
        UIImageView *icon =[[UIImageView alloc]initWithFrame:CGRectMake(0, 0, kScreenWidth*58/375.0, kScreenWidth*58/375.0)];
        [icon sd_setImageWithURL:[NSURL URLWithString:message.iconUrl] placeholderImage:kIMAGENAMED(@"wd_touxiang")];
        kViewRadius(icon,kScreenWidth*58/375.0/2.0);
        
        //描述文字
        UILabel *desText = [[UILabel alloc]initWithFrame:CGRectMake(98, 51, 163, 17)];
        desText.text = message.themeTypeText;
        desText.font = kSYSTEMFONT(17);
        desText.textColor = UIColorHex(FBDEB0);
        
        //店铺文字描述
        UILabel *shopText = [[UILabel alloc]initWithFrame:CGRectMake(98, 91, 200, 14)];
        shopText.font = kSYSTEMFONT(13);
        shopText.textColor = UIColorHex(FBDEB0);
        shopText.text = [NSString stringWithFormat:@"——来自%@的红包",message.bossName];
        
        //分割线
        UIView *sepLine =[[UIView alloc]initWithFrame:CGRectMake(0, 0, kScreenWidth, 8)];
        sepLine.backgroundColor=UIColorHex(F5F5F5);
        
        [cell.contentView addSubview:titleImgV];
        [cell.contentView addSubview:timeLabel];
        [cell.contentView addSubview:bgImgV];
        [cell.contentView addSubview:icon];
        [cell.contentView addSubview:desText];
        [cell.contentView addSubview:shopText];
        [cell.contentView addSubview:sepLine];
        
        
        //添加约束
        [titleImgV mas_makeConstraints:^(MASConstraintMaker *make) {
            make.top.equalTo(cell.contentView).with.offset(13);
            make.size.mas_equalTo(CGSizeMake(164, 30));
            make.centerX.equalTo(cell.contentView);
        }];
        
        [bgImgV mas_makeConstraints:^(MASConstraintMaker *make) {
            make.top.equalTo(titleImgV.mas_bottom);
            make.size.mas_equalTo(CGSizeMake(kScreenWidth-2*12, kScreenWidth*155/375.0));
            make.centerX.equalTo(cell.contentView);
        }];
        
        [sepLine mas_makeConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(kScreenWidth, 8));
            make.left.equalTo(cell.contentView);
            make.top.equalTo(bgImgV.mas_bottom).with.offset(12);
            make.bottom.equalTo(cell.contentView);
        }];
        
        [timeLabel mas_makeConstraints:^(MASConstraintMaker *make) {
            make.right.equalTo(cell.contentView).with.offset(-12);
            make.top.equalTo(cell.contentView).with.offset(18);
        }];
        
        [icon mas_makeConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(kScreenWidth*58/375.0, kScreenWidth*58/375.0));
            make.centerY.equalTo(bgImgV);
            make.left.equalTo(bgImgV).with.offset(25);
        }];
        
        [desText mas_makeConstraints:^(MASConstraintMaker *make) {
            make.bottom.equalTo(bgImgV.mas_centerY).with.offset(-10);
            make.left.equalTo(icon.mas_right).with.offset(18);
        }];
        
        [shopText mas_makeConstraints:^(MASConstraintMaker *make) {
            make.top.equalTo(bgImgV.mas_centerY).with.offset(10);
            make.left.equalTo(icon.mas_right).with.offset(18);
        }];
    }
    //支付消息
    else
//    else if (message.msgType.intValue==2)
    {
        //标题
        UILabel *title = [[UILabel alloc]initWithFrame:CGRectMake(0, 0, 66, 16)];
        title.text=message.msgTypeText;
        title.font=kSYSTEMFONT(16.0);
        title.textColor= UIColorHex(333333);
        
        //时间标签
        UILabel *timeLabel =[[UILabel alloc]initWithFrame:CGRectMake(0, 0, 70, 11)];
        timeLabel.font = kSYSTEMFONT(11.0);
        timeLabel.textColor=UIColorHex(999999);
        timeLabel.text=message.createTime;
        
        //图标
        UIImageView *icon =[[UIImageView alloc]initWithFrame:CGRectMake(0, 0, kScreenWidth*58/375.0, kScreenWidth*58/375.0)];
        [icon sd_setImageWithURL:[NSURL URLWithString:message.iconUrl] placeholderImage:kIMAGENAMED(@"wd_touxiang")];
        kViewRadius(icon,icon.width/2.0);
        
        //描述文字
        UILabel *desLabel =[[UILabel alloc]initWithFrame:CGRectMake(0, 0, 53, 13)];
        desLabel.text = message.payNoticeTypeText;
        desLabel.font = kSYSTEMFONT(13.0);
        timeLabel.textColor=UIColorHex(999999);
        
        //分割线
        UIView *sepLine =[[UIView alloc]initWithFrame:CGRectMake(0, 0, kScreenWidth, 8)];
        sepLine.backgroundColor=UIColorHex(F5F5F5);

        [cell.contentView addSubview:title];
        [cell.contentView addSubview:timeLabel];
        [cell.contentView addSubview:desLabel];
        [cell.contentView addSubview:icon];
        [cell.contentView addSubview:sepLine];
        
        [icon mas_makeConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(kScreenWidth*52/375.0, kScreenWidth*52/375.0));
            make.top.equalTo(cell.contentView).with.offset(12);
            make.left.equalTo(cell.contentView).with.offset(13);
        }];
        
        [sepLine mas_makeConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(kScreenWidth, 8));
            make.left.equalTo(cell.contentView);
            make.bottom.equalTo(cell.contentView);
            make.top.equalTo(icon.mas_bottom).with.offset(12);
        }];
        
        [title mas_makeConstraints:^(MASConstraintMaker *make) {
            make.bottom.equalTo(cell.contentView.mas_centerY).with.offset(-5);
            make.left.equalTo(icon.mas_right).with.offset(18);
        }];
        [desLabel mas_makeConstraints:^(MASConstraintMaker *make) {
            make.top.equalTo(cell.contentView.mas_centerY).with.offset(5);
            make.left.equalTo(icon.mas_right).with.offset(18);
        }];
        
        [timeLabel mas_makeConstraints:^(MASConstraintMaker *make) {
            make.right.equalTo(cell.contentView).with.offset(-18);
            make.centerY.equalTo(title);
        }];
        
    }
    
    return cell;
}

@end
