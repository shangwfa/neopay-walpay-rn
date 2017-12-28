import React, {Component} from 'react'
import {DeviceEventEmitter, BackHandler} from 'react-native'

class BasePage extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props)
        global.nav = this.props.navigation
        console.log("当前页面======" + nav.state.routeName)
    }

    /*event={type:'xxxxx',data:{}}*/
    componentWillMount() {
        console.log("----------------->basePage");
        this.emitterListener = DeviceEventEmitter.addListener(nav.state.routeName, (event) => {
            this.emitEvent(event)
        })

        this.backListener = BackHandler.addEventListener('hardwareBackPress', () => {
            if(this.back){
                this.back()
            }

        })
    }

    /**
     * 1.emitEvent=(event)=>{console.log(event)}
     * 2.DeviceEventEmitter.emit('activityList',{type:'xxx',data:{a:'xxxxx',b:'yyyyyy'}})
     * */

    componentWillUnmount() {
        // 移除
        if (this.emitterListener) this.emitterListener.remove()
        if (this.backListener) this.backListener.remove()
    }
}


export default BasePage