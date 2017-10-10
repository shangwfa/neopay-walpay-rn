//
//  XGQBLoginInputView.h
//  XinguangWallet
//
//  Created by Neopay-iOS on 30/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface XGQBLoginInputView : UIView

@property (nonatomic,strong) UIImageView *leftImgView;
@property (nonatomic,strong) XGQBTextField *textField;
@property (nonatomic,strong) UIButton *rightBtn;

+(instancetype)inputViewWithLeftImage:(UIImage*)leftImage placeHolder:(NSString*)placeHolder rightBtn:(UIButton*)rightBtn;

@end
