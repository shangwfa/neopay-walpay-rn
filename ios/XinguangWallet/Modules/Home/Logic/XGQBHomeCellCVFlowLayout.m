//
//  XGQBHomeCellCVFlowLayout.m
//  XinguangWallet
//
//  Created by BossKing on 24/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBHomeCellCVFlowLayout.h"

@implementation XGQBHomeCellCVFlowLayout

-(instancetype)init{
    self = [super init];
    if (self) {
        self.minimumLineSpacing=1.0;
        self.minimumInteritemSpacing=1.0;
    }
    return self;
}

-(UICollectionViewLayoutAttributes *)layoutAttributesForItemAtIndexPath:(NSIndexPath *)indexPath
{
    UICollectionViewLayoutAttributes *atts =[UICollectionViewLayoutAttributes layoutAttributesForCellWithIndexPath:indexPath];
    
    if (indexPath.section==0&&indexPath.row==0) {
        atts.frame = CGRectMake(0,0, (kScreenWidth-1)/2.0, 152/375.0*kScreenWidth);
    }else if (indexPath.section==0&&indexPath.row==1){
        atts.frame = CGRectMake((kScreenWidth-1)/2.0+1,0, (kScreenWidth-1)/2.0, (152/375.0*kScreenWidth-1)/2.0);
    }else if (indexPath.section==0&&indexPath.row==2){
        atts.frame = CGRectMake((kScreenWidth-1)/2.0+1,((152/375.0*kScreenWidth-1)/2.0)+1, (kScreenWidth-1)/2.0, (152/375.0*kScreenWidth-1)/2.0);
    }
    
    return atts;
}

-(NSArray<UICollectionViewLayoutAttributes *> *)layoutAttributesForElementsInRect:(CGRect)rect
{
    NSMutableArray *attsArray = [NSMutableArray new];
    for (int i=0; i<3; i++) {
        UICollectionViewLayoutAttributes *atts =[self layoutAttributesForItemAtIndexPath:[NSIndexPath indexPathForRow:i inSection:0]];
        [attsArray addObject:atts];
    }
    return attsArray;
}

-(CGSize)collectionViewContentSize
{
    return CGSizeMake(kScreenWidth, 152/375.0*kScreenWidth);
}


@end
