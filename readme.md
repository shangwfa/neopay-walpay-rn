## RN 项目相关规范

- 开发工具（统一采用WebStorm）安装成功后，安装相关插件
    - ReactNativeTools
    - ReactNative console 该插件提供RN相关的快捷功能（启动本地服务器,打包jsbundle到Android/IOS包）

- 第一期RN相关开发目标（钱包）
    承担钱包项目，弱交互页面（展示性页面），后期随着RN相关开发的积累，再进一步拓展其应用范围。

    
- js业务代码 目录结构
    - components 视图组件
    - constants 常量相关
        - colors 视图色值
        - Urls  路由名称
        - 后续根据具体需要扩展
    - page 具体页面
    - res 资源目录
        - img 图片资源
        - 其他，后续根据具体需要扩展
    - utls 工具类
        - JSonUtil Json序列化反序列化工具类
        - NetUtil  访问后端接口工具类
        - ScreenUtils 屏幕信息工具类
        - 其他，后续根据具体需要扩展
        
    - App.js统一入口文件，说明：在index.android.js和index.ios.js文件中，统一入口文件为App.js,且保持所在目录和index.android.js和index.ios.js同级

- WebStorm 添加RN模板代码
    - 打开Preferences
    - Editor->File and Code Template 
    - 添加ReactNative模板代码
    
    ```

    import React, {Component} from 'react'
    import {
        StyleSheet,
        View,
        Text,
        Image,
    } from 'react-native'
    
    class ${NAME} extends Component {
        render() {
            return (
                <View style={styles.container}>
    
                </View>
            );
        }
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
        }
    });
    
    export default ${NAME}

    ```
    
    - 新建RN .js 代码，选择ReactNative 生产模板代码
    
 - 页面编写规范
    - 使用ES6语法进行编码（http://es6.ruanyifeng.com/）
    
    - 代码中初始化state因在constructor函数中，而且尽量对每个变量进行注释；
    ```
        constructor() {
                super()
                this.state = {
                    data: {}
                }
            }
    ```
    - 代码中使用props时，需进行defaultProps默认值初始化
    ```
        static defaultProps = {
                 color: '#1e90ff',
                 dotRadius: 10,
                 size: 40
             };
    ```
    - 代码中创建数组或对象使用以下方式
    
    ```
    const user={
            name:'time',
            sex:'男',
            age:25,
        };
    
    const itemArray=['0','1','2',3,{name:'25',age:'男'}];
    ```
    - 代码中函数绑定this，强制使用箭头函数； 注：除组件原有方法，其他自定义函数命名时，需使用箭头函数
    
    ```
        //系统组件生命周期方法
        constructor(props){
            super(props);
        };
        //自定义方法
        goMainPage=()=>{
            
        };
    ```
    
    - 代码中一些网络数据初始化，配置信息，推荐在此生命周期进行初始化
    ```javascript
      componentWillMount
    ```
    
    - 代码中使用定时器或者DeviceEventEmitter，必须在组件卸载进行销毁或者清除
    
    ``` 
        componentDidMount() {
            //注意addListener的key和emit的key保持一致
            this.msgListener = DeviceEventEmitter.addListener('Msg',(listenerMsg) => {
                this.setState({
                    listenerMsg:listenerMsg,
                })
            });
        }
        
        goMainPage=()=>{
            this.timer = setTimeout(
                () => { console.log('把一个定时器的引用挂在this上'); },
                500
            );
        };
        
        
        componentWillUnmount() {
            //此生命周期内，去掉监听和定时器
            this.msgListener&&this.msgListener.remove();
            // 如果存在this.timer，则使用clearTimeout清空。
            // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
            this.timer && clearTimeout(this.timer);
        }

    ```
    
    - 当组件使用样式属性达到三个或者三个以上时，必须使用StyleSheet来创建样式属性并进行引用
    
    ```jsx harmony
        const styles = StyleSheet.create({
             container: {
                 flex: 1,
                 justifyContent: 'center',
                 alignItems: 'center',
                 backgroundColor: '#F5FCFF',
                 marginTop:10,
             },
         });
    ```
    - 当使用单一属性，或者全局样式属性时，推荐使用公共样式类
    ```js
        export default {
            white: '#ffffff',
            one_color: '#D93638',
            orange: '#FF7900',
            page_background: '#efefef',
            black: '#333333',
            black_light: '#666666',
            divider:'#cccccc'
        }
    ```
    - 当使用多个state或者props值时，推荐使用以下方式
    ```jsx harmony
        const {size, dotRadius, color} = this.props;
        const { maxNumber,minNumber,}=this.state;
    ```
    - var,let,const
        - 对所有变量，对象的引用，使用const,不要使用var
        - 如果一定需要引用可变动的变量，对象，建议使用let代替var
    
    - render()函数代码过长时，请适当进行拆分，拆分为‘‘页面内组件‘‘，提高可读性。render()函数代码行请勿超过八十行，超过之后，请自行进行拆分
    
    - 些输入框的值，放入到state中，并且设置defaultValue，不要使用全局变量进行引用,参照以下方式：
    
    ```
    constructor(props) {
        super(props);
        this.state = {
            editSalesPrice:'',  //修改后的商品售价
            editPurchasePrice:'', //修改后的商品进价
        };
    }
    
    render(){
      return(
      <View style={styles.viewPadding}>
                           <TextInput
                                style={styles.rowInput}
                                placeholder="请输入调整后的价格"
                                onChangeText={(text)=>{
                                    this.setState({
                                        editSalesPrice:text,
                                    })
                                }}
                                defaultValue={this.state.editSalesPrice}
                                placeholderTextColor='#B0B7C2'
                                underlineColorAndroid = 'transparent'
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                clearButtonMode={'while-editing'}
                                keyboardType='numeric'
                            />
                        </View>
                        );
    }
    ```
- 三方开源库（https://js.coach/react-native），多参考别人是怎么写代码的 
    