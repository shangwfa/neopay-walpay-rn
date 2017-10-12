//
//  XGQBHomeBottomADView.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 09/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBHomeBottomADView.h"
#import "XGQBHomeBannerView.h"

@implementation XGQBHomeBottomADView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

-(instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:CGRectMake(frame.origin.x, frame.origin.y, kScreenWidth, kScreenWidth/0.557)];
    
    if (self) {
        //广告页头部图片标签
        UIImageView *titleView = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"sy_juhui"]];
        [self addSubview: titleView];
        
        //更多按钮
        UIButton *rightArrowBtn = [UIButton buttonWithType:UIButtonTypeCustom];
        [rightArrowBtn setImage:[UIImage imageNamed:@"sy_jiantoyu"] forState:UIControlStateNormal];
        [rightArrowBtn setTitle:@"更多" forState:UIControlStateNormal];
        rightArrowBtn.imageView.size = CGSizeMake(13, 13);
        rightArrowBtn.titleLabel.font = kSYSTEMFONT(12.0);
        [rightArrowBtn setTitleColor:[UIColor colorWithHexString:@"666666"] forState:UIControlStateNormal];
        rightArrowBtn.imageEdgeInsets = UIEdgeInsetsMake(0, 20, 0, 0);
        rightArrowBtn.titleEdgeInsets = UIEdgeInsetsMake(0, -40, 0, 0);
        
        [rightArrowBtn addTarget:self action:@selector(rightArrowBtnClicked) forControlEvents:UIControlEventTouchUpInside];
        
        [self addSubview:rightArrowBtn];
        
        //广告页
        XGQBHomeBannerView *adView = [[XGQBHomeBannerView alloc]initWithFrame:CGRectMake(0, 0, kScreenWidth*0.95, kScreenWidth*0.9*0.44)];
        adView.backgroundColor = [UIColor yellowColor];
        [self addSubview:adView];
        
        
        //获取首页banner列表
//        NSMutableDictionary *body = [NSMutableDictionary dictionaryWithCapacity:0];
//        [MerchantCoreService queryBannerList:body andSuccessFn:^(id responseAfter, id responseBefore) {
////            [responseBefore writeToFile:@"/Users/bossking/DesktopNSString/test.plist" atomically:YES encoding:NSUTF8StringEncoding error:nil];
//            NSLog(@"获取首页信息成功:%@",responseBefore);
//        } andFailerFn:^(NSError *error) {
//            nil;
//        }];
        
        //添加约束
        kWeakSelf(self)
        [titleView mas_makeConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(0.525*self.size.width, 0.525*self.size.width*0.183));
            make.top.equalTo(weakself).with.offset(8);
            make.centerX.equalTo(weakself);
        }];
        
        [rightArrowBtn mas_makeConstraints:^(MASConstraintMaker *make) {
            make.right.equalTo(weakself);
            make.top.equalTo(weakself).with.offset(20);
        }];
        
        [adView mas_makeConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(kScreenWidth*0.95, kScreenWidth*0.9*0.44));
            make.centerX.equalTo(weakself);
            make.top.equalTo(titleView.mas_bottom).with.offset(5);
        }];
    }
    self.backgroundColor = kWhiteColor;
    return self;
}

-(void)rightArrowBtnClicked
{
    NSLog(@"点击了更多按钮");
}
@end
