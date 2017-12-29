import React from 'react'
import {
    StyleSheet,
    View,
    FlatList
} from 'react-native'
import {colors} from '../constants/index'
import Header from '../components/Header'
import ActivityItemComponent from '../components/ActivityItemComponent'
import BasePage from './BasePage'
import ApiManager from '../utils/ApiManager'
class ActivityListPage extends BasePage {

    constructor(props) {
        super(props)
        this.state = {
            data:[
                {
                    key:"1",
                    imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507787767410&di=eac401274fbb9b107a0bd65a9b71e37a&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dc495bd1722381f308a1485eac168267d%2Fe824b899a9014c0834bca78a007b02087bf4f41e.jpg',
                    title: '店庆得大奖！店庆赢积分！店庆一起来!',
                    linkUrl:'www.baidu.com'
                },
                {
                    key:"2",
                    imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507787767411&di=0ed2b51893735d41fe9c2597b984052e&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3De05fa110566034a83defb0c2a37a2321%2F5fdf8db1cb1349547059c0755c4e9258d1094a5f.jpg',
                    title: '店庆得大奖！店庆赢积分！店庆一起来!',
                    linkUrl:'www.baidu.com',
                },
                {
                    key:"3",
                    imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507787767411&di=47a1fba18a2d46d91ca62efea0ca1428&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3De60b264a0323dd54357eaf2bb960d9ab%2F574e9258d109b3deb19abe46c6bf6c81800a4cf2.jpg',
                    title: '店庆得大奖！店庆赢积分！店庆一起来!',
                    linkUrl:'www.baidu.com'
                },
                {
                    key:"4",
                    imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507787767410&di=87b887c0eae563c635c5d2abbaa434aa&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D355b6764a7345982d187edd1649d5bd8%2Fb3b7d0a20cf431ad6969b0294136acaf2edd9863.jpg',
                    title: '店庆得大奖！店庆赢积分！店庆一起来!',
                    linkUrl:'www.baidu.com'
                }
            ]
        }
    }


    componentDidMount() {
        ApiManager.queryBannerList(data=>{
            this.setState({
                data: data
            })
        })
    }
    renderItem = ({item}) => (
        <ActivityItemComponent itemData={item} navigation={this.props.navigation}/>
    )

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item,index)=>{return index}}
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

export default ActivityListPage