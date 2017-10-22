//
//  XGQBTextField.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 30/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBTextField.h"

@interface XGQBTextField()

@end


@implementation XGQBTextField

+(instancetype)textFieldWithType:(XGQBTextFieldType)textFieldType
{
    XGQBTextField *textField = [[XGQBTextField alloc]init];
    
    textField.type = textFieldType;
    return textField;
    
}

-(void)setType:(XGQBTextFieldType)type
{
    _type = type;
    
    switch (type) {
        case XGQBTextFieldTypePhoneNo:
            self.keyboardType = UIKeyboardTypeNumberPad;
            break;
            
        case XGQBTextFieldTypeIDNo:
            self.keyboardType = UIKeyboardTypeNumberPad;
            break;
            
        case XGQBTextFieldTypeSecurityPhoneNo:
            self.keyboardType = UIKeyboardTypeNumberPad;
            break;
            
        case XGQBTextFieldTypeBankCard:
            self.keyboardType = UIKeyboardTypeNumberPad;
            break;
            
        case XGQBTextFieldTypeRegisterCode:
            self.keyboardType = UIKeyboardTypeNumberPad;
            break;
            
        case XGQBTextFieldTypeLoginPassword:
            self.secureTextEntry = YES;
            break;
            
        default:
            break;
    }
}


-(instancetype)initWithFrame:(CGRect)frame
{
    self= [super initWithFrame:frame];
    
    if(self){
        
    self.clearButtonMode = UITextFieldViewModeWhileEditing;
    self.font = [UIFont systemFontOfSize:15.0f];
        
    self.delegate = self;
    }
    return self;
}

//设置placeholder的样式
-(void)setPlaceholder:(NSString *)placeholder
{
    [super setPlaceholder:placeholder];
    
    self.attributedPlaceholder = [[NSAttributedString alloc]initWithString:placeholder
                                                                attributes:@{
                                                                             NSForegroundColorAttributeName :[UIColor colorWithHexString:@"CACACF"],
                                                                                         NSFontAttributeName:kSYSTEMFONT(14.0)
                                                                                                         }];
}


-(BOOL)textField:(XGQBTextField *)textField shouldChangeCharactersInRange:(NSRange)range replacementString:(NSString *)string
{
    BOOL returnValue = YES;
    //处理银行卡输入框分隔符
    if (textField.type == XGQBTextFieldTypeBankCard) {
        
        NSMutableString* newText = [NSMutableString stringWithCapacity:0];
        [newText appendString:textField.text];// 拿到原有text,根据下面判断可能给它添加" "(空格);
        
        NSString * noBlankStr = [textField.text stringByReplacingOccurrencesOfString:@" "withString:@""];
        NSInteger textLength = [noBlankStr length];
        
        
        if (string.length) {
            if (textLength < 25) {//这个25是控制实际字符串长度,比如银行卡号长度
                if (textLength > 0 && textLength %4 == 0) {
                    newText = [NSMutableString stringWithString:[newText stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceCharacterSet]]];
                    [newText appendString:@" "];
                    [newText appendString:string];
                    textField.text = newText;
                    returnValue = NO;//为什么return NO?因为textField.text = newText;text已经被我们替换好了,那么就不需要系统帮我们添加了,如果你ruturnYES的话,你会发现会多出一个字符串
                }else {
                    [newText appendString:string];
                }
            }else { // 比25长的话 return NO这样输入就无效了
                returnValue =NO;
            }
        }else { // 如果输入为空,该怎么地怎么地
            [newText replaceCharactersInRange:range withString:string];
        }
    }
    //处理手机号输入
    else if (textField.type == XGQBTextFieldTypePhoneNo){
        if (textField.text.length>10 && ![string isEqualToString:@""]) {
            [SVProgressHUD showInfoWithStatus:@"请输入正确手机号"];
        }
        
//        NSLog(@"textfield.text:%@ range:%@ replacementStr:%@",textField.text,NSStringFromRange(range),string);
    }
    //处理密码长度
    else if(textField.type == XGQBTextFieldTypeLoginPassword){
        if (textField.text.length>17 && ![string isEqualToString:@""]) {
            [SVProgressHUD showInfoWithStatus:@"登录密码为6至18位字母加数字"];
        }
    }
    //处理支付密码
    else if(textField.type ==XGQBTextFieldTypePayPassword){
        if(textField.text.length>5 && ! [string isEqualToString:@""]){
            [SVProgressHUD showInfoWithStatus:@"支付密码为六位数字"];
        }
    }
    
    return returnValue;
}

-(void)textFieldDidEndEditing:(XGQBTextField *)textField
{
    //处理私密手机号
    if (textField.type == XGQBTextFieldTypeSecurityPhoneNo) {
        if(textField.text.length==11)
        {
        NSString *newStr = [textField.text stringByReplacingCharactersInRange:NSMakeRange(3, 4) withString:@"****"];
        [textField setText:newStr];
        }
    }
    else if (textField.type == XGQBTextFieldTypePhoneNo){
        if (textField.text.length!=11 && textField.text.length>0) {
            [SVProgressHUD showInfoWithStatus:@"请输入正确手机号"];
        }
    }
}

-(BOOL)textFieldShouldEndEditing:(UITextField *)textField
{
    return YES;
}



@end
