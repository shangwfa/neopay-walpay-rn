//
//  FontAndColorMacros.h
//  MiAiApp
//
//  Created by JK on 2017/5/18.
//  Copyright © 2017年 JK. All rights reserved.
//

//字体大小和颜色配置

#ifndef FontAndColorMacros_h
#define FontAndColorMacros_h

#pragma mark -  间距区

//默认间距
#define kNormalSpace 12.0f

#pragma mark -  颜色区
//主题色 导航栏颜色
#define kAPPTheamColor [UIColor colorWithHexString:@"d63638"]
#define kNavBgColor    [UIColor colorWithHexString:@"FFFFFF"]
#define kNavBgColor2    [UIColor colorWithHexString:@"FFFFFF"]
#define kNavBgFontColor  [UIColor colorWithHexString:@"010101"]


//#define CNavBgColor2  [UIColor colorWithHexString:@"00AE68"]
//#define CNavBgColor    [UIColor colorWithHexString:@"ffffff"]
//#define CNavBgFontColor  [UIColor colorWithHexString:@"000000"]
//默认页面背景色
#define kViewBgColor [UIColor colorWithHexString:@"f2f2f2"]

//分割线颜色
#define kLineColor [UIColor colorWithHexString:@"DCDCDC"]

//次级字色
#define CFontColor1 [UIColor colorWithHexString:@"1f1f1f"]

//再次级字色
#define CFontColor2 [UIColor colorWithHexString:@"5c5c5c"]

//颜色
#define kClearColor [UIColor clearColor]
#define kYellowColor [UIColor yellowColor]
#define kGreenColor [UIColor greenColor]
#define kWhiteColor [UIColor whiteColor]
#define kBlackColor [UIColor blackColor]
#define kGrayColor [UIColor grayColor]
#define kGray2Color [UIColor lightGrayColor]
#define kBlueColor [UIColor blueColor]
#define kRedColor [UIColor redColor]
#define kRandomColor   [UIColor colorWithRed:arc4random_uniform(256)/255.0 green:arc4random_uniform(256)/255.0 blue:arc4random_uniform(256)/255.0 alpha:1.0]     //随机色生成

//字体
#define kBOLDSYSTEMFONT(FONTSIZE)[UIFont boldSystemFontOfSize:FONTSIZE]
#define kSYSTEMFONT(FONTSIZE)    [UIFont systemFontOfSize:FONTSIZE]
#define kFONT(NAME, FONTSIZE)    [UIFont fontWithName:(NAME) size:(FONTSIZE)]

#pragma mark -  字体区


#define kTextFieldFont [UIFont systemFontOfSize:14.0f]

#endif /* FontAndColorMacros_h */
