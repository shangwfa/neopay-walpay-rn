import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import {colors} from '../constants/index'


const MoreClickComponet = props => {
    const {
        component,
        ...attributes
    } = props

    let Component=TouchableOpacity

    if (component) {
        Component = component;
    }
    const styles = StyleSheet.create({
        value:{
            color: colors.white,
            fontSize: 15,
        },
        container:{
            backgroundColor: colors.one_color,
            height: 50,
            marginLeft: 10,
            marginRight: 10,
            justifyContent:'center',
            alignItems: 'center',
        },
    })

    const toPress = async ()=>{
        const {onPress} = this.props
        onPress&&onPress()
        await this.setState({isDisable:true})//防重复点击
        this.timer = setTimeout(async()=>{
            await this.setState({isDisable:false})//1.5秒后可点击
        },1000)
    }
    return (
        <Component
            onPress={this.toPress()}
            {...attributes}>
            {this.props.children}
        </Component>
    )
}



export default MoreClickComponet
