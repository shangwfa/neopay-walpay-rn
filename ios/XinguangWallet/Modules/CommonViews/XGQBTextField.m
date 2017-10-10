//
//  XGQBTextField.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 30/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBTextField.h"

@implementation XGQBTextField

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

-(instancetype)initWithFrame:(CGRect)frame
{
    self= [super initWithFrame:frame];
    
    if(self){
        
    self.clearButtonMode = UITextFieldViewModeWhileEditing;
    self.font = [UIFont systemFontOfSize:15.0f];
    }
    return self;
}

//设置placeholder的样式
-(void)setPlaceholder:(NSString *)placeholder
{
    [super setPlaceholder:placeholder];
    
    self.attributedPlaceholder = [[NSAttributedString alloc]initWithString:placeholder attributes:@{
                                                                                                         NSForegroundColorAttributeName :[UIColor colorWithHexString:@"CACACF"],
                                                                                                         NSFontAttributeName:kSYSTEMFONT(14.0)
                                                                                                         }];
}

@end
