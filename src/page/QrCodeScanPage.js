import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'
import {colors} from '../constants/index'
import QRScannerView from '../components/QRScannerView'
import Header from '../components/Header'
import BasePage from './BasePage'
import TwoBottomItemModal from '../modal/TwoBottomItemModal'
import scan_bottom_icon from '../res/img/scan_bottom_icon.png'
import scan_line from '../res/img/scan_line.png'
import three_points from '../res/img/three_points.png'
class QrCodeScanPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            isShowBottom: false,

        };
    }

    scanResult = (e) => {
        console.log('Type: ' + e.type + '\nData: ' + e.data);
    }

    close = () => {
        this.setState({isShowBottom: false})
    }
    onRightPress = () => {
        console.log('xxxxxxx')
        this.setState({isShowBottom: true})
    }


    renderHeader = () => {
        return (<View>
            <Header navigation={this.props.navigation} backgroundColor={colors.transparent} title='扫一扫' isShowLine={false}
                    isWhiteArrow={true} textColor={colors.white} rightIcon={three_points} onRightPress={this.onRightPress.bind(this)}/>
            <View style={styles.header_container}>
                <Text style={{color: 'white'}}>请将下框对准二维码</Text>
            </View>

        </View>)
    }

    renderBottom = () => {
        return (
            <View style={styles.bottom_container}>
                <Image style={styles.bottom_icon} source={scan_bottom_icon}/>
                <Text style={{color: 'white', marginLeft: 8}}>支持扫描通宝汇APP付款码付钱</Text>
            </View>)
    }

    render() {
        return (
            <View style={styles.container}>
                <QRScannerView
                    rectWidth={270}
                    rectHeight={270}
                    cornerColor='#FC0000'
                    iscorneroffset={false}
                    scanBarImage={scan_line}
                    cornerOffsetSize={0}
                    scanBarAnimateTime={2000}
                    onScanResultReceived={this.scanResult}
                    renderTopBarView={() => this.renderHeader()}
                    renderBottomMenuView={() => this.renderBottom()}
                />
                <TwoBottomItemModal oneItemTitle='使用说明' twoItemTitle='关闭弹窗' isShow={this.state.isShowBottom} close={() => this.close()} ensure={() => {
                    this.close()
                    // TODO 跳转使用说明页面
                }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bottom_icon: {
        width: 32,
        height: 32
    },
    bottom_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:colors.transparent
    },
    header_container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 85,
        backgroundColor:colors.transparent
    },
    hint_text_style: {
        color: '#C0C0C0'
    },
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    }
});

export default QrCodeScanPage