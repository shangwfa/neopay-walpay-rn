//
//  XGQBLoginInputView.h
//  XinguangWallet
//
//  Created by BossKing on 20/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface XGQBLoginInputView : UIView

@property (nonatomic,strong) UIImageView *leftImgView;
@property (nonatomic,strong) XGQBTextField *textField;
@property (nonatomic,strong) UIButton *rightBtn;

+(instancetype)viewWithLeftImage:(NSString*)leftImage placeHolder:(NSString*)placeHolder rightBtn:(UIButton*)rightBtn;

@end
