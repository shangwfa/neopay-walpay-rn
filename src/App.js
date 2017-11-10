import React, {Component} from 'react'
import {NativeModules, View, DeviceEventEmitter, Animated, Easing,Text,TextInput} from 'react-native'
import {StackNavigator, NavigationActions} from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator'
import JsonUtil from './utils/JsonUtil'
import ScreenUtils from './utils/ScreenUtils'
import RouterSetting from './constants/RouterSetting'


class App extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        console.log(this.props)
        Text.defaultProps.allowFontScaling=false;
        Text.defaultProps.fontFamily = 'system font';
    }


    render() {
        let params = ScreenUtils.isIOS ? this.props.params : JsonUtil.strToJson(this.props.params)
        if(ScreenUtils.isIOS){//适配IPhone X 刘海
            ScreenUtils.statusBarHeight = Number(params.statusBarHeight)
            ScreenUtils.headerHeight = Number(params.statusBarHeight)+44
        }
        const Navigator = StackNavigator(RouterSetting,
            {
                initialRouteName: params.page,
                headerMode: 'screen',
                transitionConfig: () => ({
                    transitionSpec: {
                        duration: 300,
                        easing: Easing.ease,
                        timing: Animated.timing,
                    },
                    screenInterpolator: sceneProps => {
                        const { layout, position, scene } = sceneProps
                        const { index } = scene
                        const width = layout.initWidth

                        const translateX = position.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [width, 0, 0],
                        })

                        return {transform: [{ translateX }] }
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
            //一级页面允许右划返回
            else if(state && action.type === NavigationActions.BACK && state.routes.length ===2) {
                if (ScreenUtils.isIOS === true) {
                    //开启系统右划手势
                    NativeModules.commModule.rnJumpBackToFirstLevel()
                }
            }
            //进入二级页面禁用系统右划
            else if(state && action.type === NavigationActions.NAVIGATE && state.routes.length ===1) {
                if (ScreenUtils.isIOS === true) {
                    NativeModules.commModule.rnJumpIntoSecondLevel()
                }
            }
            return defaultStateAction(action, state);
        };

        const  getCurrentRouteName=(navigationState) =>{
            if (!navigationState) {
                return null;
            }
            const route = navigationState.routes[navigationState.index];
            // dive into nested navigators
            if (route.routes) {
                return getCurrentRouteName(route);
            }
            return route.routeName;
        }

        return (
            <View style={{flex: 1}}>
                <Navigator screenProps={this.props.params} onNavigationStateChange={(prevState, currentState) => {
                    const currentScreen = getCurrentRouteName(currentState);
                    const prevScreen = getCurrentRouteName(prevState);
                    if (prevScreen !== currentScreen) {
                        console.log("从页面"+prevScreen+"跳转页面"+currentScreen)
                    }
                }}/>
            </View>

        );
    }

}


export default App
