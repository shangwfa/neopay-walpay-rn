//
//  XGQBActiMessTVC.m
//  XinguangWallet
//
//  Created by BossKing on 17/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBActiMessTVC.h"
#import "XGQBActiRedPView.h"

@implementation XGQBActiMessTVC


+(instancetype)actiTableViewCellWithType:(XGQBActiMessType)type timeLabel:(NSString *)time
{
    XGQBActiMessTVC *cell = [[XGQBActiMessTVC alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:@"actiMess"];
    
    //左上方logo
    NSString *logoName = [NSString string];
    NSString *titleText = [NSString string];
    
    if (type==XGQBActiMessTypeShop) {
        logoName = @"xx_liwu";
        titleText = @"商家活动";
    }else if(type == XGQBActiMessTypeSystem){
        logoName = @"xx_qiqiu";
        titleText = @"系统消息";
    }else if(type ==XGQBActiMessTypeRedPocket){
        logoName = @"xx_qiqiu-1";
        titleText = @"红包来啦!";
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
    
    //图片
    UIImage *img = [cell createImageWithColor:kRandomColor andFrame:CGRectMake(0, 0, 350/375.0*kScreenWidth, 155/375.0*kScreenWidth) ];
    UIImageView *imgV = [[UIImageView alloc]initWithImage:img];
    if (type==XGQBActiMessTypeRedPocket) {
        imgV = nil;
        imgV = (UIImageView*) [[XGQBActiRedPView alloc]init];
    }
    kViewRadius(imgV, 5);
    [cell.contentView addSubview:imgV];
    
    //增加底部分割线
    UIImage *seperatorLineImg = [cell createImageWithColor:kViewBgColor andFrame:CGRectMake(0, 0, kScreenWidth, 8)];
    UIImageView *seperatorLine = [[UIImageView alloc]initWithImage:seperatorLineImg];
    [cell.contentView addSubview:seperatorLine];
    
    //增加未读消息红点
    UIImage *redDot = [cell createImageWithColor:[UIColor colorWithHexString:@"F34646"] andFrame:CGRectMake(0, 0, 9, 9)];
    UIImageView *redDotView = [[UIImageView alloc]initWithImage:redDot];
    kViewRadius(redDotView, 9/2.0);
    
    [cell.contentView addSubview:redDotView];
    
    
    //添加约束
    CGFloat sizeRatio = kScreenWidth/375.0;
    
    [logo mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(35*sizeRatio, 35*sizeRatio));
        make.left.equalTo(cell.contentView).with.offset(8*sizeRatio);
        make.top.equalTo(cell.contentView).with.offset(8*sizeRatio);
    }];
    
    [titleLable mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(70, 17*sizeRatio));
//        make.size.mas_equalTo(CGSizeMake(76*sizeRatio, 17*sizeRatio));
        make.left.equalTo(cell.contentView).with.offset(45*sizeRatio);
        make.centerY.equalTo(logo);
    }];
    
    [timeLabel mas_makeConstraints:^(MASConstraintMaker *make) {
//        make.size.mas_equalTo(CGSizeMake(68*sizeRatio, 10*sizeRatio));
        make.right.equalTo(cell.contentView).with.offset(-17*sizeRatio);
        make.centerY.equalTo(logo);
    }];
    
    [imgV mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(350*sizeRatio, 155*sizeRatio));
        make.centerX.equalTo(cell.contentView);
        make.top.equalTo(logo.mas_bottom).with.offset(10*sizeRatio);
    }];
    
    [seperatorLine mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(kScreenWidth, 8));
        make.top.equalTo(imgV.mas_bottom).with.offset(10*sizeRatio);
        make.left.equalTo(cell.contentView);
        //autolayout竖直方向报错,因为限制死了
//        make.bottom.equalTo(cell.contentView);
    }];
    
    [redDotView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(9, 9));
        make.centerX.equalTo(titleLable.mas_right);
        make.centerY.equalTo(titleLable.mas_top);
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
