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
import PayMessage from "../page/PayMessagePage"
import BankCardList from "../page/BankCardListPage"
import TransactionDetailsPage from "../page/TransactionDetailsPage"
import BankCardDetail from "../page/BankCardDetailPage"
import TopupMsgList from "../page/PhoneTopupMsgListPage"
import CardPack from "../page/CardPackPage";
import PayCode from "../page/PayCodePage";
import MyBalance from "../page/MyBalancePage"
import AccountWithdrawPage from "../page/AccountWithdrawPage";
import AccountWithdrawResultPage from "../page/AccountWithdrawResultPage"
import PayResultPage from "../page/PayResultPage";
const RouterSetting = {
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
    filter: {screen: Filter},
    myAsset: {screen: MyAsset},
    swRefreshScrollView: {screen: SwRefreshScrollView},
    payMessage: {screen: PayMessage},
    transactionDetails: {screen: TransactionDetailsPage},
    bankCardList: {screen: BankCardList},
    bankCardDetail: {screen: BankCardDetail},
    topupMsgList: {screen: TopupMsgList},
    cardPack: {screen: CardPack},
    payCode: {screen: PayCode},
    myBalance: {screen: MyBalance},
    accountWithdraw: {screen: AccountWithdrawPage},
    accountWithdrawResult: {screen: AccountWithdrawResultPage},
    payResult:{screen:PayResultPage},
};

export default RouterSetting