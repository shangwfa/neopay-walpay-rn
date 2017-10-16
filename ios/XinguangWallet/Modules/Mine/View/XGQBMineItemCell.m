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
    XGQBMineItemCell *cell = [[XGQBMineItemCell alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:@""];
    
    cell.size = CGSizeMake(200, 44);
    
    cell.backgroundColor = kGrayColor;
    
    UIImageView *img = [[UIImageView alloc]initWithImage:[UIImage imageNamed:imgName]];
    
    UILabel *titleLabel = [[UILabel alloc]init];
    titleLabel.text = title;
    
    [cell.contentView addSubview:titleLabel];
    [cell.contentView addSubview:img];
    
    [img mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(30, 30));
        make.left.equalTo(cell.contentView);
        make.centerY.equalTo(cell.contentView);
    }];
    
    [titleLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.equalTo(img.mas_right);
        make.centerY.equalTo(cell.contentView);
    }];
    
    
    return cell;
    
    
}





@end
