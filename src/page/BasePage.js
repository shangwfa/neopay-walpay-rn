import React, {Component} from 'react'
import {DeviceEventEmitter} from 'react-native'

class BasePage extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props)
        global.nav=this.props.navigation
        console.log("当前页面======"+nav.state.routeName)
    }

    /*event={type:'xxxxx',data:{}*/
    componentDidMount() {
        DeviceEventEmitter.addListener(nav.state.routeName, (event) => {
            this.emitEvent(event)
        })
    }
    /**
     * 1.emitEvent=(event)=>{console.log(event)}
     * 2.DeviceEventEmitter.emit('activityList',{type:'xxx',{a:'xxxxx',b:'yyyyyy'}})
     * */
}



export default BasePage