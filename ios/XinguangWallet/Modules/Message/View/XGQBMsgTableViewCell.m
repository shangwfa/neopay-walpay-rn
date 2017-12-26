//
//  XGQBMsgTableViewCell.m
//  XinguangWallet
//
//  Created by BossKing on 30/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBMsgTableViewCell.h"
#import "XGQBMessage.h"

@interface XGQBMsgTableViewCell()

@property(nonatomic,weak) UIImageView *bgImgV;
@property(nonatomic,weak) UILabel *timeLabel;
@property(nonatomic,weak) UIImageView *readIcon;
@property(nonatomic,weak) UILabel *desLabel;

@end

@implementation XGQBMsgTableViewCell

+(XGQBMsgTableViewCell *)cellWithMessage:(XGQBMessage *)message
{
    XGQBMsgTableViewCell *cell =[[XGQBMsgTableViewCell alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:message.msgTypeText];
    
    //红包消息//商家活动//系统活动
    if(message.msgType==XGQBMessageTypeRedPacket||(message.msgType==XGQBMessageTypeOtherMsg&&message.payNoticeType.intValue==3)||(message.msgType==XGQBMessageTypeOtherMsg&&message.payNoticeType.intValue==1)){
    
        //标题栏
        NSString *titleImgName = @"sy_hongbaolaila5";
        if (message.msgType==XGQBMessageTypeOtherMsg&&message.payNoticeType.intValue==3) {
            titleImgName = @"sy_juhui";
        }else if (message.msgType==XGQBMessageTypeOtherMsg&&message.payNoticeType.intValue==1){
            titleImgName = @"sy_xitong4";
        }
        UIImageView *titleImgV =[[UIImageView alloc]initWithImage:kIMAGENAMED(titleImgName)];
        
        //时间标签
        UILabel *timeLabel =[[UILabel alloc]initWithFrame:CGRectMake(0, 0, 70, 11)];
        cell.timeLabel = timeLabel;
        timeLabel.font = kSYSTEMFONT(11.0);
        timeLabel.textColor=UIColorHex(999999);
        timeLabel.text=[message.createTime formatDate];
        
        //背景图片
        UIImage *bgImg = kIMAGENAMED(@"beijing");
        UIImageView *bgImgV =[[UIImageView alloc]initWithFrame:CGRectMake(0, 0, kScreenWidth-2*12, kScaledSizeW(155))];
        NSString *bgImgUrl = message.themeUrl;
        cell.bgImgV=bgImgV;
        if ((message.msgType==XGQBMessageTypeOtherMsg&&message.payNoticeType.intValue==3)||(message.msgType==XGQBMessageTypeOtherMsg&&message.payNoticeType.intValue==1)) {
            bgImgUrl=message.noticeImageUrl;
        }
        [bgImgV sd_setImageWithURL:[NSURL URLWithString:bgImgUrl] placeholderImage:bgImg options:SDWebImageRefreshCached];
        kViewRadius(bgImgV, 5);

        //分割线
        UIView *sepLine =[[UIView alloc]initWithFrame:CGRectMake(0, 0, kScreenWidth, 8)];
        sepLine.backgroundColor=UIColorHex(EFEFEF);
        
        [cell.contentView addSubview:titleImgV];
        [cell.contentView addSubview:timeLabel];
        [cell.contentView addSubview:bgImgV];
        [cell.contentView addSubview:sepLine];
        
        //添加约束
        [titleImgV mas_updateConstraints:^(MASConstraintMaker *make) {
            make.top.equalTo(cell.contentView).with.offset(13).with.priority(999);
            make.size.mas_equalTo(CGSizeMake(196.5, 31));
            make.centerX.equalTo(cell.contentView);
        }];
        
        [bgImgV mas_updateConstraints:^(MASConstraintMaker *make) {
            make.top.equalTo(titleImgV.mas_bottom);
            make.size.mas_equalTo(CGSizeMake(kScreenWidth-2*12, kScaledSizeW(155)));
            make.centerX.equalTo(cell.contentView);
        }];
        
        [sepLine mas_updateConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(kScreenWidth, 8));
            make.left.equalTo(cell.contentView);
            make.top.equalTo(bgImgV.mas_bottom).with.offset(12);
            make.bottom.equalTo(cell.contentView);
        }];
        
        [timeLabel mas_updateConstraints:^(MASConstraintMaker *make) {
            make.right.equalTo(cell.contentView).with.offset(-12);
            make.top.equalTo(cell.contentView).with.offset(18);
        }];

        //如果是红包消息,添加文字描述,红包尚未被领取
        if (message.msgType==XGQBMessageTypeRedPacket) {
            if (message.receiveStatus==XGQBRedPacketReceiveStatusReceiving) {
                
                //描述文字
                UILabel *desText = [[UILabel alloc]initWithFrame:CGRectMake(98, 51, 163, 17)];
                desText.text = message.message;
                desText.font = kSYSTEMFONT(17);
                desText.textColor = message.themeType==XGQBRedPacketTypeBirthday?UIColorHex(FFFFFF):UIColorHex(FBDEB0);
                
                //店铺文字描述
                UILabel *shopText = [[UILabel alloc]initWithFrame:CGRectMake(98, 91, 200, 14)];
                shopText.font = kSYSTEMFONT(13);
                shopText.textColor = message.themeType==XGQBRedPacketTypeBirthday?UIColorHex(FFFFFF):UIColorHex(FBDEB0);;
                shopText.text =[NSString stringWithFormat:@"——来自%@的红包",message.bossName];
                
                [cell.contentView addSubview:desText];
                [cell.contentView addSubview:shopText];
                
                [desText mas_updateConstraints:^(MASConstraintMaker *make) {
                    make.bottom.equalTo(bgImgV.mas_centerY).with.offset(-10);
                    make.left.equalTo(cell.contentView).with.offset(kScaledSizeW(108));
                }];
                
                [shopText mas_updateConstraints:^(MASConstraintMaker *make) {
                    make.top.equalTo(bgImgV.mas_centerY).with.offset(10);
                    make.left.equalTo(cell.contentView).with.offset(kScaledSizeW(108));
                }];
                }
        
        //红包过期和红包抢完
        else if (message.receiveStatus==XGQBRedPacketReceiveStatusExpired||message.receiveStatus== XGQBRedPacketReceiveStatusReceiveFinished){
            
            //描述文字
            UILabel *desText = [[UILabel alloc]initWithFrame:CGRectMake(90, 40, 163, 14)];
            desText.text = message.message;
            desText.font = kSYSTEMFONT(14);
            desText.textColor = message.themeType==XGQBRedPacketTypeBirthday?UIColorHex(FFFFFF):UIColorHex(FBDEB0);
            
            //过期文字描述
            UILabel *desText2 = [[UILabel alloc]initWithFrame:CGRectMake(98, 90, 160, 17)];
            desText2.text=@"啊哦,这个红包已经过期了~";
            desText2.font = kSYSTEMFONT(17);
            desText2.textColor = message.themeType==XGQBRedPacketTypeBirthday?UIColorHex(FFFFFF):UIColorHex(FBDEB0);
            
            
            //店铺文字描述
            UILabel *shopText = [[UILabel alloc]initWithFrame:CGRectMake(98, 91, 200, 14)];
            shopText.font = kSYSTEMFONT(13);
            shopText.textColor = message.themeType==XGQBRedPacketTypeBirthday?UIColorHex(FFFFFF):UIColorHex(FBDEB0);;
            shopText.text =[NSString stringWithFormat:@"——来自%@的红包",message.bossName];
            
            [cell.contentView addSubview:desText];
            [cell.contentView addSubview:desText2];
            [cell.contentView addSubview:shopText];
            
            [desText mas_updateConstraints:^(MASConstraintMaker *make) {
                make.top.equalTo(bgImgV).with.offset(30);
                make.left.equalTo(cell.contentView).with.offset(kScaledSizeW(85));
            }];
            
            [desText2 mas_updateConstraints:^(MASConstraintMaker *make) {
                make.top.equalTo(bgImgV.mas_centerY).with.offset(5);
                make.left.equalTo(cell.contentView).with.offset(kScaledSizeW(108));
            }];
            
            [shopText mas_updateConstraints:^(MASConstraintMaker *make) {
                make.top.equalTo(bgImgV.mas_centerY).with.offset(40);
                make.left.equalTo(cell.contentView).with.offset(kScaledSizeW(108));
            }];
        }
        //红包已领取
        else if (message.receiveStatus==XGQBRedPacketReceiveStatusReceived){
            //金额
            UILabel *luckyAmountLabel = [[UILabel alloc]initWithFrame:CGRectMake(131, 50, 120, 22)];
            luckyAmountLabel.text = [NSString stringWithFormat:@"¥ %.2f",[message.luckyAmount doubleValue]];
            luckyAmountLabel.font = kSYSTEMFONT(27);
            luckyAmountLabel.textColor = message.themeType==XGQBRedPacketTypeBirthday?UIColorHex(FFFFFF):UIColorHex(FBDEB0);
            
            //文字描述
            UILabel *desText = [[UILabel alloc]initWithFrame:CGRectMake(98, 90, 160, 17)];
            desText.text=message.message;
            desText.font = kSYSTEMFONT(17);
            desText.textColor = message.themeType==XGQBRedPacketTypeBirthday?UIColorHex(FFFFFF):UIColorHex(FBDEB0);
            
            
            //店铺文字描述
            UILabel *shopText = [[UILabel alloc]initWithFrame:CGRectMake(122, 90, 200, 14)];
            shopText.font = kSYSTEMFONT(13);
            shopText.textColor = message.themeType==XGQBRedPacketTypeBirthday?UIColorHex(FFFFFF):UIColorHex(FBDEB0);;
            shopText.text =[NSString stringWithFormat:@"——来自%@的红包",message.bossName];
            
            [cell.contentView addSubview:luckyAmountLabel];
            [cell.contentView addSubview:desText];
            [cell.contentView addSubview:shopText];
            
            [luckyAmountLabel mas_updateConstraints:^(MASConstraintMaker *make) {
                make.bottom.equalTo(bgImgV.mas_centerY).with.offset(-16);
                make.centerX.equalTo(cell.contentView);
            }];
            
            [desText mas_updateConstraints:^(MASConstraintMaker *make) {
                make.top.equalTo(bgImgV.mas_centerY).with.offset(10);
                make.left.equalTo(cell.contentView).with.offset(kScaledSizeW(108));
            }];
            
            [shopText mas_updateConstraints:^(MASConstraintMaker *make) {
                make.top.equalTo(bgImgV.mas_centerY).with.offset(40);
                make.left.equalTo(cell.contentView).with.offset(kScaledSizeW(108));
            }];
        }
       
    }
    }
    //支付消息,其他消息
    else
    {
        //标题
        UILabel *title = [[UILabel alloc]initWithFrame:CGRectMake(0, 0, 66, 16)];
        title.text=message.msgTypeText;
        if ((message.msgType==XGQBMessageTypeOtherMsg&&message.payNoticeType.intValue==4)||(message.msgType==XGQBMessageTypeOtherMsg&&message.payNoticeType.intValue==2))//商家广播||系统消息
        {
            title.text = message.payNoticeTypeText;
        }
        title.font=kSYSTEMFONT(16.0);
        title.textColor= UIColorHex(333333);
        
        //未读红点
        UIImageView *readIcon = [[UIImageView alloc]initWithFrame:CGRectMake(0, 0, 5, 5)];
        cell.readIcon=readIcon;
        kViewRadius(readIcon, 2.5);
        readIcon.backgroundColor=UIColorHex(F34646);
        readIcon.alpha=message.readStatus?1.0:0.0;
        
        //时间标签
        UILabel *timeLabel =[[UILabel alloc]initWithFrame:CGRectMake(0, 0, 70, 11)];
        cell.timeLabel=timeLabel;
        timeLabel.font = kSYSTEMFONT(11.0);
        timeLabel.textColor=UIColorHex(999999);
        timeLabel.text=[message.createTime formatDate];
        
        //图标
        UIImageView *icon =[[UIImageView alloc]initWithFrame:CGRectMake(0, 0, kScaledSizeW(52), kScaledSizeW(52))];
        [icon sd_setImageWithURL:[NSURL URLWithString:message.iconUrl] placeholderImage:kIMAGENAMED(@"wd_touxiang")];
        icon.contentMode = UIViewContentModeScaleAspectFill;
        kViewRadius(icon, kScaledSizeW(52)/2.0);
        
        //描述文字
        UILabel *desLabel =[[UILabel alloc]initWithFrame:CGRectMake(0, 0, 53, 13)];
        cell.desLabel=desLabel;
        desLabel.text = message.contentString;
        desLabel.font = kSYSTEMFONT(13.0);
        desLabel.textColor=UIColorHex(999999);
        
        //分割线
        UIView *sepLine =[[UIView alloc]initWithFrame:CGRectMake(0, 0, kScreenWidth, 8)];
        sepLine.backgroundColor=UIColorHex(F5F5F5);

        [cell.contentView addSubview:title];
        [cell.contentView addSubview:readIcon];
        [cell.contentView addSubview:timeLabel];
        [cell.contentView addSubview:desLabel];
        [cell.contentView addSubview:icon];
        [cell.contentView addSubview:sepLine];
        
        [icon mas_updateConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(kScaledSizeW(52), kScaledSizeW(52)));
            make.top.equalTo(cell.contentView).with.offset(12).with.priority(999);
            make.left.equalTo(cell.contentView).with.offset(13);
        }];

        [sepLine mas_updateConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(kScreenWidth, 8));
            make.left.equalTo(cell.contentView);
            make.bottom.equalTo(cell.contentView);
            make.top.equalTo(icon.mas_bottom).with.offset(12);
        }];
        
        [title mas_updateConstraints:^(MASConstraintMaker *make) {
            make.bottom.equalTo(cell.contentView.mas_centerY).with.offset(-5);
            make.left.equalTo(icon.mas_right).with.offset(18);
        }];
        
        
        [readIcon mas_updateConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(5.0, 5.0));
            make.centerX.equalTo(title.mas_right);
            make.centerY.equalTo(title.mas_top);
        }];
        
        
        [desLabel mas_updateConstraints:^(MASConstraintMaker *make) {
            make.top.equalTo(cell.contentView.mas_centerY).with.offset(5);
            make.left.equalTo(icon.mas_right).with.offset(18);
        }];
        
        [timeLabel mas_updateConstraints:^(MASConstraintMaker *make) {
            make.right.equalTo(cell.contentView).with.offset(-18);
            make.centerY.equalTo(title);
        }];
    }
    
    return cell;
}

-(void)updateWithNewMessage:(XGQBMessage *)message
{
    if (_bgImgV) {
        NSString *bgImgUrl = message.noticeImageUrl;
        UIImage *bgImg = kIMAGENAMED(@"beijing");
        [_bgImgV sd_setImageWithURL:[NSURL URLWithString:bgImgUrl] placeholderImage:bgImg options:SDWebImageRefreshCached];
    }
    if (_timeLabel){
        _timeLabel.text=[message.createTime formatDate];
    }
    if (_desLabel) {
        _desLabel.text= message.contentString;
    }
    if (_readIcon) {
        _readIcon.alpha=message.readStatus?1.0:0.0;
    }
}

@end
