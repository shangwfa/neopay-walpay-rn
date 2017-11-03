//
//  XGQBHomeCellView.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 09/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBHomeCellView.h"
#import "XGQBHomeCellBtn.h"

@interface XGQBHomeCellView()

@property (nonatomic, strong)NSArray *homeCellNameArray;
@property (nonatomic, strong)NSArray *homeCellImgArray;

@end


@implementation XGQBHomeCellView


-(NSArray *)homeCellNameArray
{
    if (!_homeCellNameArray) {
        _homeCellNameArray =@[@"卡包",@"大红包",@"手机充值",@"四季严选",@"天下食集",@"快递跑腿",@"员工贷款",@"信用卡申请"];
    }
    return _homeCellNameArray;
}

-(NSArray *)homeCellImgArray
{
    if (!_homeCellImgArray) {
        _homeCellImgArray = @[@"sy_kabao",@"sy_dahongbao",@"sy_chongzhi",@"sy_siji",@"sy_shiji",@"sy_paotui",@"sy_daikuan",@"sy_xinyongka"];
    }
    return _homeCellImgArray;
}

-(instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:CGRectMake(frame.origin.x, frame.origin.y, kScreenWidth, kScreenWidth*0.584)];
    
    if (self) {
        self.backgroundColor = kWhiteColor;
        
        for (int i=0; i<self.homeCellNameArray.count; i++) {
            
            XGQBHomeCellBtn *homeCellBtn = [XGQBHomeCellBtn buttonWithType:UIButtonTypeCustom];
            [homeCellBtn setImage:[UIImage imageNamed:self.homeCellImgArray[i]] forState:UIControlStateNormal];
            [homeCellBtn setTitle:self.homeCellNameArray[i] forState:UIControlStateNormal];
            [self addSubview:homeCellBtn];
            
            [homeCellBtn addTarget:self action:@selector(homeCellBtnClicked:) forControlEvents:UIControlEventTouchUpInside];
            
            kWeakSelf(self);
            [homeCellBtn mas_makeConstraints:^(MASConstraintMaker *make) {
                make.size.mas_equalTo(CGSizeMake(weakself.width/4.0, weakself.height/2.0));
                
                if (i<4) {
                    make.top.equalTo(weakself);
                    make.left.mas_equalTo(weakself).with.offset(kScreenWidth/4.0*i);
                }else{
                    make.top.equalTo(weakself).with.offset(weakself.height/2.0);
                    make.left.mas_equalTo(weakself).with.offset(kScreenWidth/4.0*(i-4));
                }
                
            }];
//            NSLog(@"homecellbtnframe:%@",NSStringFromCGRect(homeCellBtn.frame));
        }

    }

    return self;
}

-(void)homeCellBtnClicked:(XGQBHomeCellBtn*)btn
{
    [self.delegate btnClicked:btn];
}

@end
