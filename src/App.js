import React, {Component} from 'react'
import {NativeModules, View, StatusBar, DeviceEventEmitter,Animated,Easing} from 'react-native'
import {StackNavigator, NavigationActions} from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import JsonUtil from './utils/JsonUtil'
import Splash from './page/SplashPage'
import Home from "./page/HomePage"
import ChangeName from './page/ChangeNamePage'
import ActivityList from './page/ActivityListPage'
import ModalDemo from './page/ModalDemoPage'
import ScreenUtils from './utils/ScreenUtils'
import DemoModal from './modal/DemoModal'
import QRCode from './page/QRCodePage'
import PersonalInfo from "./page/PersonalInfoPage"
import BindBankCard from './page/BindBankCardPage'
import Feedback from './page/FeedbackPage'
import Setting from './page/SettingPage'
import MyOrder from './page/MyOrderPage'
import PanResponderDemo from './page/PanResponderDemoPage'
import {events} from './constants/index'

import BackCardOrderList from './page/BankCardOrderListPage'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalTypeEvent: ''
        }
    }

    componentWillMount() {
        console.log(this.props)
    }

    componentDidMount() {
       this.emitter= DeviceEventEmitter.addListener(events.MODAL_TYPE_EVENT, (type) => {
            this.setState({
                modalTypeEvent: type
            })
        })
    }

    whichModal = () => {
        this.timer = setTimeout(() => {  DeviceEventEmitter.emit(this.state.modalTypeEvent, true) }, 300);//这种处理方式很不好，思考有没有比较好的处理方式
        switch (this.state.modalTypeEvent) {
            case events.DEMO_MODAL_EVENT:
                return (<DemoModal/>)
                break
            default:
                return null
                break
        }
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        this.emitter.remove();
    }

    render() {
        console.log(this.props)
        let params = ScreenUtils.isIOS ? this.props.params : JsonUtil.strToJson(this.props.params)

        console.log(this.props.params.page)
        const Navigator = StackNavigator(
            {
                splash: {screen: Splash},
                home: {screen: Home},
                changeName: {screen: ChangeName},
                activityList: {screen: ActivityList},
                modal: {screen: ModalDemo},
                qrCode:{screen:QRCode},
                personalInfo:{screen:PersonalInfo},
                bindBankCard:{screen:BindBankCard},
                feedback:{screen:Feedback},
                setting:{screen:Setting},
                myOrder:{screen:MyOrder},
                panResponderDemo:{screen:PanResponderDemo},
                bankCardOrderList:{screen:BackCardOrderList}
            },
            {
                initialRouteName: params.page,
                headerMode: 'screen',
                navigationOptions: {
                    headerStyle: {
                        backgroundColor: '#3e9ce9'
                    },
                    headerTitleStyle: {
                        color: '#fff',
                        fontSize: 20
                    },
                    headerTintColor: '#fff'
                },
                transitionConfig: () => ({
                    screenInterpolator: CardStackStyleInterpolator.forHorizontal,//设置跳转动画左右滑动
                    transitionSpec: {
                        duration: 250,
                        easing: Easing.linear,
                        timing: Animated.timing,
                    },
                })

            }
        );

        const defaultStateAction = Navigator.router.getStateForAction
        Navigator.router.getStateForAction = (action, state) => {
            if (state && action.type === NavigationActions.BACK && state.routes.length === 1) {
                console.log("退出RN页面")
                console.log(NativeModules)
                NativeModules.commModule.closeRNPage()
                const routes = [...state.routes];
                return {
                    ...state,
                    ...state.routes,
                    index: routes.length - 1,
                };
            }
            return defaultStateAction(action, state);
        };


        return (
            <View style={{flex: 1}}>
                {/*状态栏*/}
                {/*<StatusBar*/}
                    {/*barStyle={'dark-content'}*/}
                    {/*backgroundColor={'white'}*/}
                    {/*translucent={true}/>*/}
                {/*导航器*/}
                <Navigator screenProps={this.props.params}/>
                {this.whichModal()}
            </View>

        );
    }

}


export default App
