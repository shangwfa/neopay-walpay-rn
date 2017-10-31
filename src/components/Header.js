import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';
import Divider from '../components/Divider'
import colors from '../constants/colors'
import ScreenUtils from '../utils/ScreenUtils'
import img_left_arrow from '../res/img/img_left_arrow.png'
import three_points from '../res/img/three_points.png'
import white_back_arrow from '../res/img/white_back_arrow.png'

class Header extends Component {
    static defaultProps = {
        isScan:false
    };

    constructor(props) {
        super(props)
        console.log(props)
    }


    renderHeaderRight=()=>{
        if(this.props.rightTitle){
           return  <Text style={styles.header_right_title}>{this.props.rightTitle}</Text>
        }else if(this.props.rightIconType){
            return <Image style={styles.right_icon} source={this.getRightIcon()}/>
        }
    }
    getRightIcon=()=>{
        switch (this.props.rightIconType){
            case '1':
                return three_points
                break
        }
    }

    goback = () => {
        console.log("回退")
        console.log(this.props.navigation)
        this.props.navigation.goBack();
    }
    renderDivider=()=>{
        if(this.props.isScan){
            return null
        }else {
            return <Divider/>
        }
    }

    render() {
        return (
            <View>
                <View style={[styles.container,this.props.isScan?{}:{backgroundColor: colors.white}]}>
                    {/*header左侧*/}
                    <TouchableOpacity style={styles.header_left} onPress={()=>this.goback()}>
                        <Image style={styles.header_back_img} source={this.props.isScan?white_back_arrow:img_left_arrow}/>
                    </TouchableOpacity>

                    {/*header中间*/}
                    <View style={styles.header_middle}>
                        <Text style={[styles.title,this.props.isScan?{color:'white'}:{color:colors.black}]}> {this.props.title}</Text>
                    </View>
                    {/*header右侧*/}
                    <TouchableOpacity style={styles.header_right} onPress={()=>this.props.onRightPress()}>
                        {this.renderHeaderRight()}
                    </TouchableOpacity>

                </View>
                {this.renderDivider()}
            </View>
            )
    }
}

const styles = StyleSheet.create({
    right_icon:{
        width: 20,
        height: 4,
    },
    header_right_title:{
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
        marginLeft: 10,
    },
    header_middle: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header_right: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 10,
        alignItems:'flex-end',
    },
    title: {
        fontSize: 16,
        color: colors.white,
    },
    container: {
        flexDirection: 'row',
        height: ScreenUtils.headerHeight,
        paddingTop:ScreenUtils.statusBarHeight

    },
});

export default Header