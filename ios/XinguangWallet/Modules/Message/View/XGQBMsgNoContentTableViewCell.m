//
//  XGQBMsgNoContentTableViewCell.m
//  XinguangWallet
//
//  Created by BossKing on 25/12/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBMsgNoContentTableViewCell.h"

@implementation XGQBMsgNoContentTableViewCell

+(instancetype)cellWithType:(XGQBMsgNoContentType)type
{
    XGQBMsgNoContentTableViewCell *cell = [[XGQBMsgNoContentTableViewCell alloc]initWithFrame:CGRectMake(0, 0, kScreenWidth, kScaledSizeW(298))];
    
    NSString *imgStr = [NSString string];
    NSString *desStr = [NSString string];
    switch (type) {
        case XGQBMsgNoContentTypeWifi:
            imgStr = @"sy_wuwang";
            break;
        case XGQBMsgNoContentTypeNormal:
            imgStr = @"sy_wuxiaoxi";
            break;
        default:
            imgStr = @"sy_wuxiaoxi";
            break;
    }
    switch (type) {
        case XGQBMsgNoContentTypeWifi:
            desStr=@"网络开了小差,请检查您的网络~";
            break;
        case XGQBMsgNoContentTypeNormal:
            desStr=@"暂无消息";
            break;
        default:
            desStr=@"暂无消息";
            break;
    }
    UIImage *img = kIMAGENAMED(imgStr);
    
    UIImageView *imgV = [[UIImageView alloc]initWithImage:img];
    
    [cell.contentView addSubview:imgV];
    
    UILabel *label = [[UILabel alloc]initWithFrame:CGRectMake(0, 0, 200, 14)];
    label.text = desStr;
    label.font = kSYSTEMFONT(14.0);
    label.textColor = UIColorHex(666666);
    [cell.contentView addSubview:label];
    
    XGQBPureColorBtn *btn = [XGQBPureColorBtn buttonWithText:@"刷新" andColor:UIColorHex(F34646)];
    cell.btn=btn;
    [cell.contentView addSubview:btn];
    
//    //分割线
//    UIView *sepLine =[[UIView alloc]initWithFrame:CGRectMake(0, 0, kScreenWidth, 8)];
//    sepLine.backgroundColor=UIColorHex(E3E3E3);
//    [cell.contentView addSubview:sepLine];
//
    //添加约束
    [imgV mas_updateConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(cell.contentView).with.offset(kScaledSizeW(50));
        make.size.mas_equalTo(CGSizeMake(kScaledSizeW(130), kScaledSizeW(130)));
        make.centerX.equalTo(cell.contentView);
    }];
    
    [label mas_updateConstraints:^(MASConstraintMaker *make) {
        make.centerX.equalTo(cell.contentView);
        make.top.equalTo(imgV.mas_bottom).with.offset(20);
        make.bottom.equalTo(btn.mas_top).with.offset(-20);
    }];
    
    [btn mas_updateConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(kScaledSizeW(100), kScaledSizeW(31)));
        make.centerX.equalTo(cell.contentView);
        make.bottom.equalTo(cell.contentView).with.offset(kScaledSizeW(-35));
    }];
    
//    [sepLine mas_updateConstraints:^(MASConstraintMaker *make) {
//        make.left.equalTo(cell.contentView);
//        make.size.mas_equalTo(CGSizeMake(kScreenWidth, 8));
//        make.bottom.equalTo(cell.contentView);
//    }];
    
    return cell;
}
@end
