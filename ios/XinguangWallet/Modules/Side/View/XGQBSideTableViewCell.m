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
    
    cell.imageView.image = [UIImage imageNamed:name];
    
    cell.textLabel.text= title;
    
    return cell;
    
}

@end
