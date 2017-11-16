//
//  NSString+checkContent.m
//  NeoPay
//
//  Created by Jesus on 2017/5/15.
//  Copyright © 2017年 Jesus. All rights reserved.
//

#import "NSString+checkContent.h"

@implementation NSString (checkContent)

- (BOOL)isValidateByRegex:(NSString *)regex
{
    NSPredicate *pre = [NSPredicate predicateWithFormat:@"SELF MATCHES %@",regex];
    return [pre evaluateWithObject:self];
}

- (BOOL)checkMobile
{
    if (self.length != 11)
    {
        return NO;
    }else{
        return YES;
    }
}

- (BOOL)simpleVerifyIdentityCardNum
{
    NSString *regex2 = @"^(\\d{14}|\\d{17})(\\d|[xX])$";
    return [self isValidateByRegex:regex2];
}

-(BOOL)isValidateEmail
{
    NSString *emailRegex = @"[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}";
    
    NSPredicate *emailTest = [NSPredicate predicateWithFormat:@"SELF MATCHES%@",emailRegex];
    
    return [emailTest evaluateWithObject:self];
    
}

- (BOOL)checkPassword
{
    BOOL result = false;
    
    if ([self length] >= 6){
        // 判断长度大于6位后再接着判断是否同时包含数字和字符
        NSString * regex = @"^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$";
        NSPredicate *pred = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", regex];
        result = [pred evaluateWithObject:self];
    }
    return result;
}

- (BOOL)checkPayPassword
{
    NSString * regex = @"(^-?[1-9]\\d*$)";
    NSPredicate * pred = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", regex];
    
    BOOL isMatch = [pred evaluateWithObject:self];
    
    if (isMatch && self.length == 6) {
        return YES;
    }else{
        return NO;
    }
}

-(NSString *)secPhoneStr
{
    NSString *secPhone = [self stringByReplacingCharactersInRange:NSMakeRange(3, 4) withString:@"****"];
    
    return secPhone;
}

@end
