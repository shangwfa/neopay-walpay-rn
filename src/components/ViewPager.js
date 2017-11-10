import React from 'react'
import PropTypes from 'prop-types'
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import {colors} from '../constants/index'
import Swiper from 'react-native-swiper'


const ViewPager = props => {
    const {
        horizontal=true,
        autoplay=false,
        dotStyle,
        activeDotStyle,
        dotColor,
        activeDotColor,
        arrayData,
        renderItem,
        ...attributes
    } = props

    const styles = StyleSheet.create({
        wrapper:{
        },
    });

    const renderItems=()=>{
        if(arrayData){
            let itemViews=[]
            for (let item of arrayData){
                itemViews.push(renderItem(item))
            }
            return itemViews
        }

    }

    return (
        <View  {...attributes}>
            <Swiper style={styles.wrapper}   horizontal={horizontal} autoplay={autoplay}
                    dotStyle={dotStyle} activeDotStyle={activeDotStyle} dotColor={dotColor}
                    activeDotColor={activeDotColor}>
                {renderItems()}
            </Swiper>
        </View>
    );
};

ViewPager.propTypes = {
    arrayData: PropTypes.array,
    renderItem:PropTypes.func,
    dotStyle:PropTypes.any,
    activeDotStyle:PropTypes.any,

}

export default ViewPager
