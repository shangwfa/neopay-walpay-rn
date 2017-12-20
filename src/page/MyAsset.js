import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'
import BasePage from './BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import my_asset from '../res/img/my_asset.png'
import NetUtil from '../utils/NetUtil'
import FormatUtils from "../utils/FormatUtils";

class MyAsset extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                balance: '0.00'
            }
        }
    }

    componentWillMount() {
        NetUtil.post('balance/get_user_asset_info', {}, (data) => {
            this.setState({
                data: data
            })
        })
    }

    renderItem = () => {
        return (
            <View style={styles.item_container}>
                <View style={styles.point}/>
                <Text style={styles.item_key}>账户余额</Text>
                <View style={{flex: 1}}/>
                <Text style={styles.item_value}>{FormatUtils.moneyWithTag(this.state.data.balance)}</Text>
            </View>
        )
    }
    renderTop = () => {
        return (
            <View style={{marginTop: 60, alignItems: 'center'}}>
                <Image style={styles.img} source={my_asset}>
                    <View style={{marginLeft: 65, marginTop: 90}}>
                        <Text style={styles.amount_title}>总资产(元)</Text>
                        <Text style={styles.amount}>{this.state.data.balance}</Text>
                    </View>
                </Image>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='我的资产'/>
                {this.renderTop()}
                {this.renderItem()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item_value: {
        fontSize: 15,
        color: '#E66941',
        marginRight: 18
    },
    item_key: {
        marginLeft: 10,
        fontSize: 15,
        color: colors.black
    },
    point: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 18,
        backgroundColor: '#E38D33',
    },
    item_container: {
        height: 40,
        flexDirection: 'row',
        marginTop: 60,
        alignItems: 'center',
    },
    amount_title: {
        width: 100,
        fontSize: 15,
        color: colors.balck_more_light,
        textAlign: 'center'
    },
    amount: {
        width: 100,
        fontSize: 19,
        color: colors.one_color,
        marginTop: 10,
        textAlign: 'center'
    },
    img: {
        width: 258,
        height: 232,
    },
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    }
});

export default MyAsset