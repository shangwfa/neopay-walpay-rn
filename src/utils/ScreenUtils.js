import {Dimensions, Platform, PixelRatio} from 'react-native'

export default {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    pixelRatio:PixelRatio.get(),
    onePixel: 1 / PixelRatio.get(),
    statusBarHeight: (Platform.OS === 'ios' ? 20 : 0),
    headerHeight:(Platform.OS === 'ios' ? 60 : 48),
    isIOS:Platform.OS === 'ios',
    isIOSSmall:Platform.OS === 'ios'&&Dimensions.get('window').height===568,// phoneSE,phone4,phone5,phone5s
    isIOSNomarl:Platform.OS === 'ios'&&Dimensions.get('window').height===667,// phone6,phone7,phone8
    isIOSP:Platform.OS === 'ios'&&Dimensions.get('window').height===736,//phone6p,phone7p,phone8p
    isIOSX:Platform.OS === 'ios'&&Dimensions.get('window').height===812
}