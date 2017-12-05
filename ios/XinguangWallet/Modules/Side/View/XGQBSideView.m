//
//  XGQBSideView.m
//  XinguangWallet
//
//  Created by BossKing on 14/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBSideView.h"

@interface XGQBSideView ()

@end

@implementation XGQBSideView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

-(instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    
    if (self) {
        [self addsubviewsWithFrame:frame];
    }
    
    return self;
}

-(void)addsubviewsWithFrame:(CGRect)frame{

    //添加背景图
    NSString *bgImgName = kiPhoneX?@"sy_beijing_x.gif":@"sy_beijing.gif";
    
    UIImage *bgImg = [YYImage imageNamed:bgImgName];
//    UIImageView *sideBgView = [[UIImageView alloc]initWithImage:bgImg];
    YYAnimatedImageView *sideBgView =[[YYAnimatedImageView alloc]initWithImage:bgImg];
    
    [self addSubview:sideBgView];
    
    //添加头部试图
    XGQBSideHeaderView *sideHeaderView = [[XGQBSideHeaderView alloc]initWithFrame:CGRectMake(0, 0, frame.size.width, frame.size.height*0.45)];
    [self addSubview:sideHeaderView];
    _headerView = sideHeaderView;
    
    //添加列表
    XGQBSideTableView *sideTableView = [[XGQBSideTableView alloc]initWithFrame:CGRectMake(0, frame.size.height*0.45, frame.size.width, frame.size.height*0.55)];
    [self addSubview:sideTableView];
    _tableView=sideTableView;
    
    //添加约束
    kWeakSelf(self);
    [sideBgView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.top.right.equalTo(weakself);
        make.height.mas_equalTo(kScaledSizeH(191.0));
    }];

}
@end
