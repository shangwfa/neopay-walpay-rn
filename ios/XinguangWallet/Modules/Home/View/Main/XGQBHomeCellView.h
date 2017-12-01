//
//  XGQBHomeCellView.h
//  XinguangWallet
//
//  Created by Neopay-iOS on 09/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import <UIKit/UIKit.h>

@protocol XGQBHomeCellViewDelegate

@end

@interface XGQBHomeCellView : UIView

@property (nonatomic,weak) id <XGQBHomeCellViewDelegate> delegate;

@end
