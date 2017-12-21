//
//  XGQBSideHeaderView.m
//  XinguangWallet
//
//  Created by BossKing on 23/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBSideHeaderView.h"

@implementation XGQBSideHeaderView

-(instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    
    [kNotificationCenter addObserver:self selector:@selector(updateAvatarAndNickName) name:kNotificationSideViewUpdateAvatar object:nil];
    
    [self setupViewComponentsWithFrame:frame];
    
    return self;
}

-(void)layoutSubviews
{
    [super layoutSubviews];
    
}

-(void)updateAvatarAndNickName
{
    //更新头像
    [_headerIcon sd_setImageWithURL:[NSURL URLWithString:[GVUserDefaults standardUserDefaults].avatarUrl] placeholderImage:kIMAGENAMED(@"wd_touxiang")];
    
    //更新实名认证标签
    NSString *imageName = [GVUserDefaults standardUserDefaults].authStatus==2?@"wd_yishiming":@"wd_weishiming";
    [_regIcon setImage:[UIImage imageNamed:imageName]];
    
    //更新用户名标签
    [_userNameView removeFromSuperview];
    UIView *userNameView = [self getUserNameViewWithFrame:CGRectMake(0,0, self.frame.size.width, self.frame.size.height)];
    _userNameView = userNameView;
    [self addSubview:userNameView];
    
    kWeakSelf(self);
    [userNameView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.equalTo(weakself);
        make.right.equalTo(weakself);
        make.top.equalTo(_headerIcon.mas_bottom);
        make.bottom.equalTo(weakself);
    }];

}

-(void)setupViewComponentsWithFrame:(CGRect)frame
{
    //头像
    UIImageView *headerIcon = [[UIImageView alloc]initWithFrame:CGRectMake(0, 0, frame.size.width*0.285, frame.size.width*0.285)];
    [headerIcon sd_setImageWithURL:[NSURL URLWithString:[GVUserDefaults standardUserDefaults].avatarUrl] placeholderImage:kIMAGENAMED(@"wd_touxiang")];
    _headerIcon=headerIcon;
    [self addSubview:headerIcon];
    headerIcon.contentMode = UIViewContentModeScaleAspectFill;
    kViewRadius(_headerIcon,frame.size.width*0.285/2.0);
    headerIcon.userInteractionEnabled=YES;
    
    //认证标签
    NSString *imageName = [GVUserDefaults standardUserDefaults].authStatus==2?@"wd_yishiming":@"wd_weishiming";
    UIImageView *regIcon = [[UIImageView alloc]initWithImage:kIMAGENAMED(imageName)];
    _regIcon=regIcon;
    [self addSubview:regIcon];
    
    //用户名视图
    UIView *userNameView = [self getUserNameViewWithFrame:frame];
    _userNameView = userNameView;
    [self addSubview:userNameView];
    
    kWeakSelf(self);
    //添加约束
    [headerIcon mas_makeConstraints:^(MASConstraintMaker *make) {
        make.centerX.equalTo(weakself);
        make.top.equalTo(weakself).with.offset(0.195*kScreenHeight);
        make.size.mas_equalTo(CGSizeMake(frame.size.width*0.285, frame.size.width*0.285));
    }];

    [regIcon mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(frame.size.width*0.118, frame.size.width*0.039));
        make.bottom.equalTo(headerIcon);
        make.right.equalTo(headerIcon);
    }];
    
    [userNameView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.equalTo(weakself);
        make.right.equalTo(weakself);
        make.top.equalTo(headerIcon.mas_bottom);
        make.bottom.equalTo(weakself);
    }];

}

-(UIView*)getUserNameViewWithFrame:(CGRect)frame
{
    UIView *userNameView =[[UIView alloc]initWithFrame:CGRectMake(0, 0, frame.size.width, frame.size.height)];
    
    //未实名并且昵称为空
    if ([GVUserDefaults standardUserDefaults].authStatus==1&&[[GVUserDefaults standardUserDefaults].nickName isEqualToString:[GVUserDefaults standardUserDefaults].phone])
    {

        //手机号标签
        UILabel *phoneNoLabel = [[UILabel alloc]initWithFrame:CGRectMake(0, 0, 98, 13)];
        phoneNoLabel.text = [[GVUserDefaults standardUserDefaults].phone secPhoneStr];
        phoneNoLabel.font=kSYSTEMFONT(17.0);
        [userNameView addSubview:phoneNoLabel];
        
        //认证按钮
        UIButton *regBtn = [UIButton buttonWithType:UIButtonTypeCustom];
        [regBtn setImage:kIMAGENAMED(@"wd_qianwang") forState:UIControlStateNormal];
        [userNameView addSubview:regBtn];
        _regBtn=regBtn;
        
        [phoneNoLabel mas_makeConstraints:^(MASConstraintMaker *make) {
            make.centerX.equalTo(userNameView);
            make.top.equalTo(userNameView).with.offset(15);
        }];
        [regBtn mas_makeConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(0.236*frame.size.width, 0.0754*frame.size.width));
            make.top.equalTo(phoneNoLabel.mas_bottom).with.offset(11);
            make.centerX.equalTo(userNameView);
        }];
    }
    //未实名并且昵称不为空
    else if ([GVUserDefaults standardUserDefaults].authStatus==1&&![[GVUserDefaults standardUserDefaults].nickName isEqualToString:[GVUserDefaults standardUserDefaults].phone])
    {
        
        //用户名标签
        UILabel *nameLabel = [[UILabel alloc]initWithFrame:CGRectMake(0, 0, 50, 20)];
        nameLabel.text = [GVUserDefaults standardUserDefaults].nickName;
        nameLabel.font = kSYSTEMFONT(17.0);
        [userNameView addSubview:nameLabel];
        
        //手机号标签
        UILabel *phoneNoLabel = [[UILabel alloc]initWithFrame:CGRectMake(0, 0, 75, 20)];
        phoneNoLabel.text = [[GVUserDefaults standardUserDefaults].phone secPhoneStr];
        phoneNoLabel.font=kSYSTEMFONT(12.0);
        [userNameView addSubview:phoneNoLabel];
        
        //认证按钮
        UIButton *regBtn = [UIButton buttonWithType:UIButtonTypeCustom];
        [regBtn setImage:kIMAGENAMED(@"wd_qianwang") forState:UIControlStateNormal];
        [userNameView addSubview:regBtn];
        _regBtn=regBtn;
        
        
        [nameLabel mas_makeConstraints:^(MASConstraintMaker *make) {
            make.top.equalTo(userNameView).with.offset(15);
            make.right.equalTo(userNameView.mas_centerX).with.offset(-5);
        }];
        
        [regBtn mas_makeConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(0.236*frame.size.width, 0.0754*frame.size.width));
            make.centerY.equalTo(nameLabel);
            make.left.equalTo(userNameView.mas_centerX).with.offset(5);
        }];

        [phoneNoLabel mas_makeConstraints:^(MASConstraintMaker *make) {
            make.centerX.equalTo(userNameView);
            make.top.equalTo(nameLabel.mas_bottom).with.offset(12);
        }];

    }
    //已实名
    else if ([GVUserDefaults standardUserDefaults].authStatus==2)
    
    {
        //用户名标签
        UILabel *nameLabel = [[UILabel alloc]initWithFrame:CGRectMake(0, 0, 150, 17)];
        nameLabel.text = [NSString stringWithFormat:@"%@（%@）",[GVUserDefaults standardUserDefaults].nickName,[[GVUserDefaults standardUserDefaults].name secureName]];
        nameLabel.font = kSYSTEMFONT(17.0);
        [userNameView addSubview:nameLabel];
        
        //手机号标签
        UILabel *phoneNoLabel = [[UILabel alloc]initWithFrame:CGRectMake(0, 0, 75, 20)];
        phoneNoLabel.text = [[GVUserDefaults standardUserDefaults].phone secPhoneStr];
        phoneNoLabel.font=kSYSTEMFONT(12.0);
        [userNameView addSubview:phoneNoLabel];
        
        [nameLabel mas_makeConstraints:^(MASConstraintMaker *make) {
            make.top.equalTo(userNameView).with.offset(15);
            make.centerX.equalTo(userNameView);
        }];
        
        [phoneNoLabel mas_makeConstraints:^(MASConstraintMaker *make) {
            make.centerX.equalTo(userNameView);
            make.top.equalTo(nameLabel.mas_bottom).with.offset(12);
        }];
    }
    [_regBtn addTarget:self action:@selector(sideViewRegBtnClicked) forControlEvents:UIControlEventTouchUpInside];
    return userNameView;
}

-(void)sideViewRegBtnClicked{
    [kNotificationCenter postNotificationName:kNotificationRegisterIDAction object:nil];
}


@end
