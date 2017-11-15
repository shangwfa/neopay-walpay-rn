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
        horizontal = true,
        autoplay = false,
        dotStyle,
        activeDotStyle,
        dotColor,
        activeDotColor,
        arrayData,
        renderItem,
        ...attributes
    } = props

    const styles = StyleSheet.create({
        wrapper: {},
    });

    const renderItems = () => {
        if (arrayData) {
            let itemViews = []
            arrayData.map((item, key) => {
                itemViews.push(<View key={key}>
                    {renderItem(item)}
                </View>)
            })

            return itemViews
        }

    }

    const renderSwiper = () => {
        if (arrayData&&arrayData.length > 0) {
            return (
                <Swiper style={styles.wrapper}
                        paginationStyle={{marginBottom: -20}}
                        horizontal={horizontal}
                        autoplay={autoplay}
                        dotStyle={dotStyle}
                        activeDotStyle={activeDotStyle}
                        dotColor={dotColor}
                        activeDotColor={activeDotColor}>
                    {renderItems()}
                </Swiper>)
        }
    }

    return (
        <View  {...attributes}>
            {renderSwiper()}
        </View>
    );
};

ViewPager.propTypes = {
    arrayData: PropTypes.array,
    renderItem: PropTypes.func,
    dotStyle: PropTypes.any,
    activeDotStyle: PropTypes.any,

}

export default ViewPager
