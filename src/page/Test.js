import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from 'react-native'
import {colors} from '../constants/index'
import BasePage from './BasePage'
import ScreenUtils from '../utils/ScreenUtils'
import Picker from 'react-native-picker'
import CommonButton from '../components/CommonButton'
class Test extends BasePage {

    constructor(props) {
        super(props);
        console.log('width:'+ScreenUtils.width+' height:'+ScreenUtils.height+' pixelRatio:'+ScreenUtils.pixelRatio)
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content_container}>

                    <CommonButton value='时间选择器' style={{marginTop:50}} onPress={()=>{this.showTimePicker()}}/>
                </View>
            </View>
        );
    }

    showTimePicker=()=> {
        let years = [],
            months = [],
            days = []

        for(let i=1;i<51;i++){
            years.push(i+1980);
        }
        for(let i=1;i<13;i++){
            months.push(i);
        }
        for(let i=1;i<32;i++){
            days.push(i);
        }
        let pickerData = [years, months, days];
        let date = new Date();
        let selectedValue = [
            date.getFullYear(),
            date.getMonth()+1,
            date.getDate()
        ];
        Picker.init({
            pickerData,
            selectedValue,
            pickerTitleText: '选择日期',
            pickerTitleColor:[1, 186, 245, 1],
            pickerConfirmBtnText:'确认',
            pickerConfirmBtnColor:[1, 186, 245, 1],
            pickerCancelBtnText:'取消',
            pickerCancelBtnColor:[1, 186, 245, 1],
            wheelFlex: [1,1,1],
            onPickerConfirm: pickedValue => {
                console.log('area', pickedValue);
            },
            onPickerCancel: pickedValue => {
                console.log('area', pickedValue);
            },
            onPickerSelect: pickedValue => {
                let targetValue = [...pickedValue];
                if(parseInt(targetValue[1]) === 2){
                    if(targetValue[0]%4 === 0 && targetValue[2] > 29){
                        targetValue[2] = 29;
                    }
                    else if(targetValue[0]%4 !== 0 && targetValue[2] > 28){
                        targetValue[2] = 28;
                    }
                }
                else if(targetValue[1] in {4:1, 6:1, 9:1, 11:1} && targetValue[2] > 30){
                    targetValue[2] = 30;

                }
                if(JSON.stringify(targetValue) !== JSON.stringify(pickedValue)){
                    targetValue.map((v, k) => {
                        if(k !== 3){
                            targetValue[k] = parseInt(v);
                        }
                    });
                    Picker.select(targetValue);
                }
            }
        });
        Picker.show();
    }
}

const styles = StyleSheet.create({
    close_icon: {
        width: 11,
        height: 11,
        marginLeft: 13
    },
    top_container: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
    },
    content_container: {
        width: 316,
        backgroundColor: colors.white,
        alignItems: 'center',
        borderRadius:5,
    },
    container: {
        backgroundColor: colors.page_background,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Test
