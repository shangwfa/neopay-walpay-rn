import React, {Component} from 'react'
import {NativeModules} from 'react-native'
import {StackNavigator, NavigationActions} from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import JsonUtil from './utils/JsonUtil'
import Splash from './page/SplashPage'
import Home from "./page/HomePage"
import ChangeName from './page/ChangeNamePage'
import ScreenUtils from './utils/ScreenUtils'

class App extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        console.log(this.props)
    }


    render() {
        console.log(this.props)
        let params=ScreenUtils.isIOS?this.props.params:JsonUtil.strToJson(this.props.params)

        console.log(this.props.params.page)
        const Navigator = StackNavigator(
            {
                splash: {screen: Splash},
                home: {screen: Home},
                changeName: {screen: ChangeName},
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
            <Navigator screenProps={this.props.params}/>
        );
    }
}


export default App