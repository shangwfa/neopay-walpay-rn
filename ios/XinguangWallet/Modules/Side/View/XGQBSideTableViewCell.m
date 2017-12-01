//
//  XGQBSideTableViewCell.m
//  XinguangWallet
//
//  Created by BossKing on 23/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBSideTableViewCell.h"

@implementation XGQBSideTableViewCell

- (void)awakeFromNib {
    [super awakeFromNib];
    // Initialization code
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

+(instancetype)cellWithImageNamed:(NSString *)name title:(NSString *)title
{
    
    XGQBSideTableViewCell *cell = [[XGQBSideTableViewCell alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:@"sidecell"];
    cell.backgroundColor = kClearColor;
    
    //icon图标
    UIImageView *iconView = [[UIImageView alloc]initWithImage:kIMAGENAMED(name)];
    [cell.contentView addSubview:iconView];
    
    //文字描述
    UILabel *desLabel = [[UILabel alloc]initWithFrame:CGRectMake(0, 0, 100, 50)];
    desLabel.text = title;
    desLabel.font = kSYSTEMFONT(15.0);
    [cell.contentView addSubview:desLabel];
    
    //右箭头
    UIImageView *arrow =[[UIImageView alloc]initWithImage:kIMAGENAMED(@"wd_jiantou4")];
    [cell.contentView addSubview:arrow];
    
    //下划线
    UIView *underLine = [[UIView alloc]initWithFrame:CGRectMake(0, 0, 0.68*kScreenWidth, 1)];
    underLine.backgroundColor = UIColorHex(EEEEEE);
    [cell.contentView addSubview:underLine];
    
    //添加约束
    [iconView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(22, 22));
        make.left.equalTo(cell).with.offset(10);
        make.centerY.equalTo(cell);
    }];
    
    [desLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.equalTo(iconView.mas_right).with.offset(16);
        make.centerY.equalTo(cell);
    }];
    
    [arrow mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(22, 22));
        make.right.equalTo(cell).with.offset(-10);
        make.centerY.equalTo(cell);
    }];
    
    [underLine mas_makeConstraints:^(MASConstraintMaker *make) {
        make.bottom.equalTo(cell);
        make.left.equalTo(desLabel);
        make.right.equalTo(cell);
        make.height.mas_equalTo(1);
    }];
    
    
    return cell;
    
}

@end
