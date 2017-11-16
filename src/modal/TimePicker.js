import React from 'react';
import Picker from 'react-native-picker'


const showTimePicker = (onPicker) => {
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
        pickerBg:[232, 232, 232, 1],
        wheelFlex: [1,1,1],
        onPickerConfirm: pickedValue => {
            onPicker(pickedValue)
        },
        onPickerCancel: pickedValue => {
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
};

export default {
    showTimePicker
}

