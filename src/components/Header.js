import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';
import Divider from '../components/Divider'
import colors from '../constants/colors'
import ScreenUtils from '../utils/ScreenUtils'
import img_left_arrow from '../res/img/img_left_arrow.png'
import three_points from '../res/img/three_points.png'
import PropTypes from 'prop-types'
import white_back_arrow from '../res/img/white_back_arrow.png'
import events from '../constants/events'


class Header extends Component {
    static defaultProps = {
        isShowLine: true,
        backgroundColor: colors.white,
        textColor: colors.absolute_black,
        isWhiteArrow: false,
        rightTextColor: colors.absolute_black,
        onRightPress: () => {
        }
    };
    static propTypes = {
        rightIcon: React.PropTypes.any,
        rightIconStyle: React.PropTypes.any,
        header_middleStyle: React.PropTypes.any

    }

    constructor(props) {
        super(props)
        console.log(props)
    }


    renderHeaderRight = () => {
        if (this.props.rightTitle) {
            return <Text
                style={[styles.header_right_title, {color: this.props.rightTextColor}]}>{this.props.rightTitle}</Text>
        } else if (this.props.rightIcon) {
            return <Image style={[styles.right_icon, this.props.rightIconStyle && this.props.rightIconStyle]}
                          source={this.props.rightIcon}/>
        }
    }

    goback = () => {
        if (this.props.onLeftPress) {
            this.props.onLeftPress()
        } else {
            if(this.props.back){
                this.props.back()
            }
            nav.goBack()
        }
    }
    renderDivider = () => {
        if (this.props.isShowLine) {
            return <Divider/>
        } else {
            return null
        }
    }

    render() {
        return (
            <View>
                <View style={[styles.container, {backgroundColor: this.props.backgroundColor}, {
                    height: ScreenUtils.headerHeight,
                    paddingTop: ScreenUtils.statusBarHeight
                }]}>
                    {/*header左侧*/}
                    <TouchableOpacity style={styles.header_left} onPress={() => this.goback()}>
                        <Image style={styles.header_back_img}
                               source={this.props.isWhiteArrow ? white_back_arrow : img_left_arrow}/>
                    </TouchableOpacity>

                    {/*header中间*/}
                    <View
                        style={[styles.header_middle, this.props.header_middleStyle && this.props.header_middleStyle]}>
                        <Text style={[styles.title, {color: this.props.textColor}]}> {this.props.title}</Text>
                    </View>
                    {/*header右侧*/}
                    <TouchableOpacity style={styles.header_right} onPress={() => this.props.onRightPress()}>
                        {this.renderHeaderRight()}
                    </TouchableOpacity>

                </View>
                {this.renderDivider()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    right_icon: {
        width: 20,
        height: 4,
    },
    right_icon_normal: {
        width: 20,
        height: 20,
    },
    header_right_title: {
        fontSize: 14,
        color: colors.black,
    },
    header_back_img: {
        width: 10,
        height: 18,
    },
    header_left: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 13,
    },
    header_middle: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header_right: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 13,
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 18,
        color: colors.white,
    },
    container: {
        flexDirection: 'row',
        backgroundColor: 'blue',
    },
});


export default Header