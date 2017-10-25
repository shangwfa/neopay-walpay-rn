import Splash from '../page/SplashPage'
import Home from "../page/HomePage"
import ChangeName from '../page/ChangeNamePage'
import ActivityList from '../page/ActivityListPage'
import ModalDemo from '../page/ModalDemoPage'
import QRCode from '../page/QRCodePage'
import PersonalInfo from "../page/PersonalInfoPage"
import BindBankCard from '../page/BindBankCardPage'
import Feedback from '../page/FeedbackPage'
import Setting from '../page/SettingPage'
import MyOrder from '../page/MyOrderPage'
import PanResponderDemo from '../page/PanResponderDemoPage'
import Filter from '../page/FilterPage'
import MyAsset from '../page/MyAsset'
import SwRefreshScrollView from '../page/SwRefreshScrollViewDemo'
import BackCardOrderList from '../page/BankCardOrderListPage'
import MyLotteryRecord from '../page/MyLotteryRecordPage'
import RedList from "../page/RedListPage"
 const  RouterSetting={
    splash: {screen: Splash},
    home: {screen: Home},
    changeName: {screen: ChangeName},
    activityList: {screen: ActivityList},
    modal: {screen: ModalDemo},
    qrCode: {screen: QRCode},
    personalInfo: {screen: PersonalInfo},
    bindBankCard: {screen: BindBankCard},
    feedback: {screen: Feedback},
    setting: {screen: Setting},
    myOrder: {screen: MyOrder},
    panResponderDemo: {screen: PanResponderDemo},
    redList: {screen: RedList},
    bankCardOrderList: {screen: BackCardOrderList},
    myLotteryRecord: {screen: MyLotteryRecord},
    filter:{screen:Filter},
    myAsset:{screen:MyAsset},
    swRefreshScrollView:{screen:SwRefreshScrollView}
}

export default RouterSetting