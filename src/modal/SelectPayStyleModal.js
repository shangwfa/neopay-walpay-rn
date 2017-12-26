/**
 * @author: carlos.guo
 * @data:  2017/10/31.
 * @description: 选择支付方式--弹窗
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image, Modal, TouchableOpacity, FlatList,
} from 'react-native'
import img_close from "../res/img/img_close.png";
import img_bank from "../res/img/img_bank.png";
import img_select_add_bank_card from "../res/img/img_select_add_bank_card.png";
import img_select from "../res/img/img_select.png";
import colors from "../constants/colors";
import Space from "../components/Space";
import ApiManager from "../utils/ApiManager";
import FormatUtils from "../utils/FormatUtils";
import StringUtils from "../utils/StringUtils";

class SelectPayStyleModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectPayStyleData: [],
        }
    }

    componentWillMount() {
        if(this.props.bankCardOnly === true){
            ApiManager.getUserBankCardList({}, (data) => {
                this.setState({
                    selectPayStyleData: data,
                });
            });
        }else{
            ApiManager.getUserPayTypeList({}, (data) => {
                this.setState({
                    selectPayStyleData: data,
                });
            });
        }
    }


    render() {
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.props.isShow}
                onRequestClose={() => {
                }}>
                <View style={styles.modalStyle}>
                    {/*title*/}
                    {this._renderTitle()}
                    {/*line*/}
                    <View style={styles.line}/>
                    {/*支付方式*/}
                    <View>

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            style={{backgroundColor: colors.white}}
                            ref='FlatList'
                            ItemSeparatorComponent={this._renderItemLine}
                            ListFooterComponent={this._renderFooterItem}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                            data={this.state.selectPayStyleData}
                            refreshing={false}
                        />
                    </View>
                </View>
            </Modal>
        );
    }

    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={this._handleBankCardItemClick.bind(this, item)}>
                <View
                    style={styles.item_container}>
                    <Image
                        style={styles.img_item_bank}
                        source={{uri: item.iconUrl}}/>
                    <Text style={styles.item_txt}>{this._handleBankCardItemNickName(item)}</Text>
                    <Space/>
                    {this._handleBankCardItemSelectImgView(item)}
                </View>
            </TouchableOpacity>
        )
    };
    _renderFooterItem = () => {
        return (

            <TouchableOpacity
                activeOpacity={0.5}
                onPress={this._handleBankCardFooterItemClick.bind(this)}>
                {this._handleNoDataView()}
                <View
                    style={styles.item_container}>
                    <Image
                        style={styles.img_item_bank}
                        source={ img_bank }/>
                    <Text style={styles.item_txt}>添加绑定银行卡</Text>
                    <Space/>
                    <Image
                        style={styles.item_arrow}
                        source={img_select_add_bank_card}/>
                </View>
            </TouchableOpacity>
        )
    };
    _handleNoDataView = () => {
        if (this.state.selectPayStyleData.length !== 0) {
            return this._renderItemLine();
        }
    };
    _renderItemLine = () => {
        return (
            <View style={styles.line}/>
        )
    };
    _renderTitle = () => {
        return <View style={styles.item_container}>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={this.props.closeClick}>
                <Image
                    style={styles.img_close}
                    source={img_close}/>
            </TouchableOpacity>
            <View style={{flex: 1, alignItems: "center"}}>
                <Text
                    style={{fontSize: 16, marginLeft: -11, color: "#000"}}>
                    {this.props.title}</Text>
            </View>
        </View>;
    };
    _handleBankCardItemSelectImgView = (item) => {
        if (item.id === this.props.selectBankId) {
            return <Image
                style={styles.item_arrow}
                source={img_select}/>;
        }
    };
    _handleBankCardItemNickName = (item) => {
        let str = item.id === -1 ? FormatUtils.money(item.cardNo) : FormatUtils.bankCardEnd(item.cardNo);
        return (item.bankName + "(" + str + ")");
    };
    _handleBankCardItemClick = (item) => {
        this.props.bankCardItemClick(item);
    };
    _handleBankCardFooterItemClick = () => {
        this.props.bankCardFooterItemClick();
    };
    _keyExtractor = (item, index) => {
        return index;
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    modalStyle: {
        backgroundColor: colors.mask,
        justifyContent: 'flex-end',
        flex: 1,
    },
    item_container: {
        flexDirection: "row",
        backgroundColor: colors.white,
        height: 50,
        alignItems: "center"
    },
    line: {
        height: 0.5,
        backgroundColor: "#DCDCDC"
    },
    img_close: {
        width: 11,
        height: 11,
        resizeMode: "cover",
        marginLeft: 11,
    },
    img_add_bank: {
        marginLeft: 11,
        width: 26,
        height: 18,
        resizeMode: "cover"
    },
    img_item_bank: {
        marginLeft: 11,
        width: 25,
        height: 25,
        resizeMode: "cover"
    },
    img_arrow: {
        width: 7,
        height: 12,
        marginRight: 10,
        resizeMode: "cover"
    },
    item_arrow: {
        width: 16,
        height: 16,
        marginRight: 10,
        resizeMode: "cover"
    },
    item_txt: {
        marginLeft: 11,
        fontSize: 16,
        color: "#000"
    }
});

export default SelectPayStyleModal