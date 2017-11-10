import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'

class BasePage extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props)
        global.nav=this.props.navigation
        console.log("当前页面======"+nav.state.routeName)

    }
}



export default BasePage