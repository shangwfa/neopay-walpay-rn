import Splash from '../page/SplashPage'
import Home from "../page/HomePage"
import ChoseCity from '../page/ChoseCityPage'
import ChangeName from '../page/ChangeNamePage'
import ActivityList from '../page/ActivityListPage'
import ModalDemo from '../page/ModalDemoPage'
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
import BigRedPacket from "../page/BigRedPacketPage";
import RedPacketSquare from  "../page/RedPacketSquarePage";
import ReceiveRedPacket from  "../page/ReceiveRedPacketPage";
import MyBalance from "../page/MyBalancePage"
import AccountWithdrawPage from "../page/AccountWithdrawPage";
import AccountWithdrawResultPage from "../page/AccountWithdrawResultPage"
import AccountTopup from "../page/AccountTopupPage"
import AccountTopupResult from "../page/AccountTopupResultPage"
import PayResultPage from "../page/PayResultPage"
import MerchantActivityList from "../page/MerchantActivityListPage"
import CreditCardInput from "../page/CreditCardInputPage"
import Contacts from '../page/ContactsPage'
import PhoneTopUpPage from "../page/PhoneTopUpPage"
import RedPacketReady from "../page/RedPacketsReadyPage"
import RedPacketRecord from "../page/RedPacketRecordPage"
import ChargeFluxResult from '../page/ChargeFluxResultPage'
import RedPacketReceiver from '../page/RedPacketReceiverPage'
import RpDetailPage from '../page/RpDetailPage'
import RpRecordListPage from '../page/RpRecordListPage'
import TopupRecordListPage from '../page/TopupRecordListPage'
import RpTitleStylePage from '../page/RpTitleStylePage'
import LottieDemo from '../page/LottieDemoPage'
import SendRedPacket from '../page/SendRedPacketPage'
import ViewpageDemo from '../page/ViewpageDemoPage'
import InstructionsPage from "../page/InstructionsPage"
import OccupationSelectionPage from "../page/OccupationSelectionPage"
import BigRedPacketSimplePage from "../page/BigRedPacketSimplePage";
import RpMonthDetailRecord from "../page/RpMonthDetailRecord"
import NewBindBankCard from "../page/NewBindBankCardPage"
import NewUserInfoCertify from "../page/NewUserInfoCertifyPage"
import RedPacketResult from "../page/RedPacketResultPage";
import AboutUsPage from "../page/AboutUsPage";

const RouterSetting = {
    splash: {screen: Splash},
    home: {screen: Home},
    choseCity: {screen: ChoseCity},
    changeName: {screen: ChangeName},
    activityList: {screen: ActivityList},
    modal: {screen: ModalDemo},
    personalInfo: {screen: PersonalInfo},
    bindBankCard: {screen: BindBankCard},
    feedback: {screen: Feedback},
    setting: {screen: Setting},
    myOrder: {screen: MyOrder},
    instructions: {screen: InstructionsPage},
    panResponderDemo: {screen: PanResponderDemo},
    redList: {screen: RedList},
    chargeFluxResult: {screen: ChargeFluxResult},
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
    cardPack: {screen: CardPack},
    bigRedPacket: {screen: BigRedPacket},
    bigRedPacketSimple: {screen: BigRedPacketSimplePage},
    redPacketSquare: {screen: RedPacketSquare},
    receiveRedPacket: {screen: ReceiveRedPacket},
    payCode: {screen: PayCode},
    sendRedPacket: {screen: SendRedPacket},
    myBalance: {screen: MyBalance},
    accountWithdraw: {screen: AccountWithdrawPage},
    accountWithdrawResult: {screen: AccountWithdrawResultPage},
    test: {screen: Test},
    accountTopup: {screen: AccountTopup},
    accountTopupResult: {screen: AccountTopupResult},
    payResult: {screen: PayResultPage},
    merchantActivityList: {screen: MerchantActivityList},
    creditCardInput: {screen: CreditCardInput},
    phoneTopUp: {screen: PhoneTopUpPage},
    redPacketReady: {screen: RedPacketReady},
    redPacketResult:{screen:RedPacketResult},
    redPacketRecord: {screen: RedPacketRecord},
    contacts: {screen: Contacts},
    redPacketReceiver: {screen: RedPacketReceiver},
    rpDetail: {screen: RpDetailPage},
    rpRecordList: {screen: RpRecordListPage},
    topupRecordList: {screen: TopupRecordListPage},
    rpTitleStyle: {screen: RpTitleStylePage},
    lottieDemo: {screen: LottieDemo},
    viewpageDemo: {screen: ViewpageDemo},
    rpMonthDetailRecord: {screen: RpMonthDetailRecord},
    newBindBankCard: {screen: NewBindBankCard},
    userInfoCerfity: {screen: NewUserInfoCertify},
    occupationSelection: {screen: OccupationSelectionPage},
    aboutUs:{screen:AboutUsPage}
}

export default RouterSetting