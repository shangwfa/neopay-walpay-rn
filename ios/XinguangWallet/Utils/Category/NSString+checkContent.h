//
//  NSString+checkContent.h
//  NeoPay
//
//  Created by Jesus on 2017/5/15.
//  Copyright © 2017年 Jesus. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSString (checkContent)

- (BOOL)checkMobile;
- (BOOL)simpleVerifyIdentityCardNum;
- (BOOL)checkPassword;
- (BOOL)checkPayPassword;
- (BOOL)isValidateEmail;
-(NSString*)secPhoneStr;

@end
