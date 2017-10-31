import React, {Component} from 'react'
import {NativeModules, View, DeviceEventEmitter, Animated, Easing} from 'react-native'
import {StackNavigator, NavigationActions} from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import JsonUtil from './utils/JsonUtil'
import ScreenUtils from './utils/ScreenUtils'
import RouterSetting from './constants/RouterSetting'


class App extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        console.log(this.props)
    }


    render() {
        let params = ScreenUtils.isIOS ? this.props.params : JsonUtil.strToJson(this.props.params)
        const Navigator = StackNavigator(RouterSetting,
            {
                initialRouteName: params.page,
                headerMode: 'screen',
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
                <Navigator screenProps={this.props.params}/>
            </View>

        );
    }

}


export default App
