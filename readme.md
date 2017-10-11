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
        
    - App.js RN相关代码入口文件
    
    
    