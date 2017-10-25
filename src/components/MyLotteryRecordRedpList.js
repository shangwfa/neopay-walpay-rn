import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList
} from 'react-native'
import {colors} from '../constants/index'
import RedPacketItemComponent from '../components/RedPacketItemComponent'
import BasePage from '../page/BasePage'


class MyLotteryRecordRedpList extends BasePage {
    renderItem = ({item}) => (
        <RedPacketItemComponent itemData={item} navigation={this.props.navigation}/>
    )

    render() {
        const itemArray = [
            {
                key:"1",
                packetType:'newYear',
                descText: '新店开张,多多捧场!',
                shop:'胡萝卜的兔子店'
            },
            {
                key:"2",
                packetType:'birthday',
                descText: '生日快乐!',
                shop:'马云的伙食店'
            },
            {
                key:"3",
                packetType:'newYear',
                descText: '店庆得大奖！店庆赢积分！店庆一起来!',
                shop:'胡萝卜的兔子店'
            },
            {
                key:"4",
                packetType:'birthday',
                descText: '店庆得大奖！店庆赢积分！店庆一起来!',
                shop:'楼下小卖部'
            }
        ];
        return (
            <View style={styles.container}>
                <FlatList
                    data={itemArray}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    }
});

export default MyLotteryRecordRedpList