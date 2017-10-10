//
//  XGQBLoginInputView.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 30/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBLoginInputView.h"

@implementation XGQBLoginInputView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/


+(instancetype)inputViewWithLeftImage:(UIImage *)leftImage placeHolder:(NSString *)placeHolder rightBtn:(UIButton *)rightBtn
{
    
    XGQBLoginInputView *inputView = [XGQBLoginInputView new];
//    inputView.backgroundColor = [UIColor grayColor];

    //左边图标
    UIImageView *leftImageView = [[UIImageView alloc]initWithImage:leftImage];
    //下划线
    UIView *underlineView = [UIView new];
    underlineView.backgroundColor = kLineColor;
    //输入框
    XGQBTextField *textField = [XGQBTextField new];
    textField.placeholder = placeHolder;
    
    inputView.textField = textField;
    inputView.rightBtn = rightBtn;
    inputView.leftImgView = leftImageView;
    
    [inputView addSubview:underlineView];
    [inputView addSubview:leftImageView];
    [inputView addSubview:textField];
    [inputView addSubview:rightBtn];
    
    //设置全局尺寸
    inputView.frame = CGRectMake(0, 0, kScreenWidth*0.9, 40);
    
    //添加约束
    [leftImageView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(19, 19));
        make.centerY.equalTo(inputView);
        make.left.equalTo(inputView).with.offset(7);
    }];
    if(rightBtn){
    [rightBtn mas_makeConstraints:^(MASConstraintMaker *make) {
       
//        make.size.mas_equalTo(CGSizeMake(19, 19));
        make.centerY.equalTo(inputView).with.offset(0);
        make.right.equalTo(inputView).with.offset(-3);

    }];
    }
    if(rightBtn){
    [textField mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(inputView.width-leftImage.size.width-rightBtn.size.width-15-30, inputView.height));
        make.centerY.equalTo(inputView);
        make.left.equalTo(leftImageView.mas_right).with.offset(10);
    }];
    }else{
    [textField mas_makeConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(inputView.width-leftImage.size.width-rightBtn.size.width-15, inputView.height));
            make.centerY.equalTo(inputView);
            make.left.equalTo(leftImageView.mas_right).with.offset(10);
        }];
    }
    
    [underlineView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(inputView.width-32, 1));
        make.bottom.equalTo(inputView).with.offset(-5);
        make.right.equalTo(inputView).with.offset(-3);
    }];
//    NSLog(@"inputView:%@",NSStringFromCGRect(inputView.frame) );
//    NSLog(@"rightBtn:%@",NSStringFromCGRect(rightBtn.frame) );
//    NSLog(@"textField:%@",NSStringFromCGRect(textField.frame) );
//    NSLog(@"leftImageView:%@",NSStringFromCGRect(leftImageView.frame) );
//    NSLog(@"underlineViewFrame:%@",NSStringFromCGRect(underlineView.frame) );
    return inputView;
}


@end
