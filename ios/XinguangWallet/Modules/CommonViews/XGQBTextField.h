//
//  XGQBTextField.h
//  XinguangWallet
//
//  Created by Neopay-iOS on 30/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import <UIKit/UIKit.h>

typedef NS_ENUM(NSInteger, XGQBTextFieldType) {
    XGQBTextFieldTypeNormal = 0,
    XGQBTextFieldTypeIDNo,
    XGQBTextFieldTypeBankCard,
    XGQBTextFieldTypeSecurityPhoneNo,
    XGQBTextFieldTypePhoneNo,
    XGQBTextFieldTypeRegisterCode,
    XGQBTextFieldTypePassword,
    XGQBTextFieldTyepPayPassword,
};


@interface XGQBTextField : UITextField  <UITextFieldDelegate>

@property (nonatomic,assign) XGQBTextFieldType type;

+(instancetype)textFieldWithType:(XGQBTextFieldType)textFieldType;

@end
