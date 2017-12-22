//
//  XGQBHomeCellView.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 09/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBHomeCellView.h"
#import <SafariServices/SafariServices.h>

#import "XGQBHomeCellCVFlowLayout.h"
#import "XGQBRNViewController.h"

#import "XGQBAPPRootViewController.h"

@interface XGQBHomeCellView()<UICollectionViewDelegateFlowLayout,UICollectionViewDataSource>

@end

static NSString *const cellId = @"cellId";

@implementation XGQBHomeCellView

-(instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    
    XGQBHomeCellCVFlowLayout *layout = [[XGQBHomeCellCVFlowLayout alloc]init];

    UICollectionView *cellCollectionV = [[UICollectionView alloc]initWithFrame:CGRectMake(0, 0, frame.size.width, frame.size.height-8)collectionViewLayout:layout];
    
    cellCollectionV.dataSource = self;
    cellCollectionV.delegate = self;
    cellCollectionV.backgroundColor = kViewBgColor;
    
    [self addSubview:cellCollectionV];
    
    //增加下划线
    UIView *sepLine =[[UIView alloc]initWithFrame:CGRectMake(0, frame.size.height-8, frame.size.width, 8)];
    sepLine.backgroundColor=UIColorHex(F5F5F5);
    [self addSubview:sepLine];
    
    [cellCollectionV registerClass:[UICollectionViewCell class] forCellWithReuseIdentifier:cellId];
    
    return self;
    
}

#pragma mark - UICollectionViewDataSource
- (nonnull __kindof UICollectionViewCell *)collectionView:(nonnull UICollectionView *)collectionView cellForItemAtIndexPath:(nonnull NSIndexPath *)indexPath {
    
    UICollectionViewCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:cellId forIndexPath:indexPath];
    cell.contentView.backgroundColor = kWhiteColor;

    if (indexPath.section==0&&indexPath.row==0) {
        [cell.contentView addSubview:[self firstCell]];
    }else if (indexPath.section==0&&indexPath.row==1){
        [cell.contentView addSubview:[self secondAndThirdCellWithTitle:@"四季严选" des:@"新鲜到家" andImageNamed:@"sy_siji"]];
    }else if (indexPath.section==0&&indexPath.row==2){
        [cell.contentView addSubview:[self secondAndThirdCellWithTitle:@"余额" des:@"我的资产" andImageNamed:@"sy_yue6"]];
    }
    return cell;
    
}

-(NSInteger)numberOfSectionsInCollectionView:(UICollectionView *)collectionView{
    return 1;
}

- (NSInteger)collectionView:(nonnull UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section {
    return 3;
}


#pragma mark - 生成cell视图
-(UIView*)firstCell
{
    UIView *firstCell =[[UIView alloc]initWithFrame: CGRectMake(0,0, (kScreenWidth-1)/2.0, 152/375.0*kScreenWidth)];
    
    UILabel *titleLabel = [[UILabel alloc]init];
    titleLabel.text = @"员工贷款";
    titleLabel.font = kSYSTEMFONT(14.0);
    titleLabel.textColor = UIColorHex(333333);
    [firstCell addSubview:titleLabel];
    
    UILabel *desLabel = [[UILabel alloc]init];
    desLabel.text = @"快速低息";
    desLabel.font = kSYSTEMFONT(13.0);
    desLabel.textColor = UIColorHex(999999);
    [firstCell addSubview:desLabel];
    
    UIImageView *icon = [[UIImageView alloc]initWithImage:kIMAGENAMED(@"sy_daikuan5")];
    [firstCell addSubview:icon];
    
    [titleLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(firstCell).with.offset(28*kSizeRatioW);
        make.centerX.equalTo(firstCell);
    }];
    
    [desLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(titleLabel.mas_bottom).with.offset(8*kSizeRatioW);
        make.centerX.equalTo(firstCell);
    }];
    
    [icon mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(38.5*kSizeRatioW, 49*kSizeRatioW));
        make.top.equalTo(desLabel.mas_bottom).with.offset(20*kSizeRatioW);
        make.centerX.equalTo(firstCell);
    }];
    
    return firstCell;
}

-(UIView*)secondAndThirdCellWithTitle:(NSString*)title des:(NSString*)des andImageNamed:(NSString*)imageName
{

    UIView *cell = [[UIView alloc]initWithFrame: CGRectMake(0,0, (kScreenWidth-1)/2.0, (152/375.0*kScreenWidth-1)/2.0)];
    
    UILabel *titleLabel = [[UILabel alloc]init];
    titleLabel.text = title;
//    titleLabel.font = kSYSTEMFONT(14.0*kSizeRatioW);
    titleLabel.font = kSYSTEMFONT(14.0);
    titleLabel.textColor = UIColorHex(333333);
    [cell addSubview:titleLabel];
    
    UILabel *desLabel = [[UILabel alloc]init];
    desLabel.text = des;
//    desLabel.font = kSYSTEMFONT(13.0*kSizeRatioW);
    desLabel.font=kSYSTEMFONT(13.0);
    desLabel.textColor = UIColorHex(999999);
    [cell addSubview:desLabel];
    
    UIImageView *icon = [[UIImageView alloc]initWithImage:kIMAGENAMED(imageName)];
    [cell addSubview:icon];
    
    [titleLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(cell).with.offset(21*kSizeRatioW);
        make.left.equalTo(cell).with.offset(30*kSizeRatioW);
    }];
    
    [desLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(titleLabel.mas_bottom).with.offset(8*kSizeRatioW);
        make.left.equalTo(titleLabel);
    }];
    
    [icon mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(kScaledSizeW(40),kScaledSizeW(40)));
        make.right.equalTo(cell).with.offset(-34*kSizeRatioW);
        make.centerY.equalTo(cell);
    }];
    
    return cell;
}

#pragma mark - UICollectionViewDelegateFlowLayout

-(void)collectionView:(UICollectionView *)collectionView didSelectItemAtIndexPath:(NSIndexPath *)indexPath
{
    //点击余额按钮
    if (indexPath.section==0&&indexPath.row==2) {

        XGQBAPPRootViewController *rootVC =(XGQBAPPRootViewController*)kAppWindow.rootViewController;
        
        if([GVUserDefaults standardUserDefaults].authStatus==XGQBUserAuthStatusUnauthorized){
            [rootVC.homeVC checkIDStatus];
        }else{
            XGQBRNViewController *RNVC =[XGQBRNViewController new];
            RNVC.pageType=@"myBalance";
            [rootVC.rootNAV pushViewController:RNVC animated:YES];
        }
    }else if(indexPath.section==0&&indexPath.row==0){//点击了员工贷款
//        SFSafariViewController *safari = [[SFSafariViewController alloc]initWithURL:[NSURL URLWithString:@"http://www.baidu.com"]];
//        XGQBAPPRootViewController *rootVC = (XGQBAPPRootViewController*)kAppWindow.rootViewController;
//        [rootVC.rootNAV pushViewController:safari animated:YES];
        JKLog();
    }else if(indexPath.section==0&&indexPath.row==1){//点击了四季严选
        JKLog();
    }else{
        JKLog();
    }
    

}


@end
