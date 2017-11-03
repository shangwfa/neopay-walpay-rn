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
import TradeRecordList from '../page/TradeRecordListPage'
import MyLotteryRecord from '../page/MyLotteryRecordPage'
import RedList from "../page/RedListPage"
import PayMessage from "../page/PayMessagePage"
import BankCardList from "../page/BankCardListPage"
import TransactionDetailsPage from "../page/TransactionDetailsPage"
import BankCardDetail from "../page/BankCardDetailPage"
import TopupMsgList from "../page/PhoneTopupMsgListPage"
import QrCodeScan from '../page/QrCodeScanPage'
import InvalidQrCode from '../page/InvalidQrCodePage'
import Payment from '../page/PaymentPage'
import Test from '../page/Test'
import CardPack from "../page/CardPackPage";
import PayCode from "../page/PayCodePage";
import MyBalance from "../page/MyBalancePage"
import AccountWithdrawPage from "../page/AccountWithdrawPage";
import AccountWithdrawResultPage from "../page/AccountWithdrawResultPage"
import AccountTopup from "../page/AccountTopupPage"
import AccountTopupResult from "../page/AccountTopupResultPage"
import PayResultPage from "../page/PayResultPage"
import MerchantActivityList from "../page/MerchantActivityListPage"
import CreditCardInput from "../page/CreditCardInputPage"

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
    tradeRecordList: {screen: TradeRecordList},
    myLotteryRecord: {screen: MyLotteryRecord},
    filter: {screen: Filter},
    myAsset: {screen: MyAsset},
    swRefreshScrollView: {screen: SwRefreshScrollView},
    payMessage: {screen: PayMessage},
    transactionDetails: {screen: TransactionDetailsPage},
    bankCardList: {screen: BankCardList},
    bankCardDetail: {screen: BankCardDetail},
    topupMsgList: {screen: TopupMsgList},
    qrCodeScan: {screen: QrCodeScan},
    invalidQrCode: {screen: InvalidQrCode},
    payment: {screen: Payment},
    bankCardList: {screen: BankCardList},
    bankCardDetail: {screen: BankCardDetail},
    topupMsgList: {screen: TopupMsgList},
    qrCodeScan: {screen: QrCodeScan},
    invalidQrCode: {screen: InvalidQrCode},
    payment: {screen: Payment},
    cardPack: {screen: CardPack},
    payCode: {screen: PayCode},
    myBalance: {screen: MyBalance},
    accountWithdraw: {screen: AccountWithdrawPage},
    accountWithdrawResult: {screen: AccountWithdrawResultPage},
    test:{screen:Test},
    accountTopup:{screen:AccountTopup},
    accountTopupResult:{screen:AccountTopupResult},
    payResult: {screen: PayResultPage},
    merchantActivityList: {screen: MerchantActivityList},
    creditCardInput: {screen: CreditCardInput},
}

export default RouterSetting