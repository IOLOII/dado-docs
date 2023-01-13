
# Cordova
Demo项目：[Cordova-demo](http://39.104.63.170:8099/IOLOII/cordova-demo)
## 基本使用
  ### （目前用不上）发布release与配置
  cordova run android --release -- --keystore=../my-release-key.keystore --storePassword=password --alias=alias_name --password=password

  ### （目前用不上）生成keytool
  ```shell
    keytool -genkey -v -keystore roadapp-release.keystore -alias roadApp -keyalg RSA -validity 4000
  ```
  （执行命令之后会提示你输入密码，设置一些公司名称之类的，密码要记住，其他随意）

  roadapp-release.keystore ：签名文件的名称（左边一个空格）

  roadApp ：签名文件的别名（左右一个空格）

  4000：有效天数

  秘钥：123456

  ### （目前用不上）签名：
  ```shell
  jarsigner -verbose -keystore roadapp-release.keystore -signedjar MF.apk app-release.aab roadApp
  ```
  roadapp-release.keystore 秘钥文件
  app-release.aab 未签名目录下的文件名
  roadApp 别名
  MF.apk 签名后的名称


#### roadapp-release.keystore SHA 打包机sha
   MD5: BD:A8:7D:66:81:49:C2:6B:61:68:32:35:70:25:D5:BA
   SHA1: 65:C4:1A:D4:8A:2B:0C:D4:74:F0:76:AE:7F:92:F6:C4:5C:24:9D:D7
   SHA256: 7A:96:01:5A:D7:A0:88:55:19:2B:4B:57:B5:A1:87:F1:B7:6B:B9:0E:9C:38:A2:C5:62:31:E3:AF:16:BC:C8:BD

 #### debugger 打包机开发sha
   MD5: BF:39:CC:FB:D6:2D:05:6C:05:78:AF:51:18:EC:84:5B
   SHA1: 8D:32:7F:E7:8B:B2:1E:68:C3:06:C4:80:A8:C5:FC:1D:6B:A8:13:D3
   SHA256: 9C:8C:72:15:29:D2:EF:8F:F4:4E:12:DD:EA:B3:80:D1:27:EC:E1:DD:86:F4:7B:C4:B9:F6:A9:A4:CF:4C:7A:10

## 插件安装
### 定位插件 cordova-plugin-gaodelocation-chenyu
> ff8949d957801603ee7279ab88bdaac5 账号为135****4429 分属公路app应用下
```shell
## install
## cordova plugin add cordova-plugin-gaodelocation-chenyu --variable  ANDROID_API_KEY=ff8949d957801603ee7279ab88bdaac5
cordova plugin add cordova-plugin-gaodelocation-chenyu --variable  ANDROID_API_KEY=
```
<!-- cordova plugin add https://github.com/waliu/cordova-plugin-gaodelocation-chenyu  --variable  ANDROID_API_KEY=ff8949d957801603ee7279ab88bdaac5
npm install --save @ionic-native/gao-de-location -->

### （已弃用）AmapTrackPlugin 下方仅做了解
~~高德猎鹰插件 https://gitee.com/wlyer/AmapTrackPlugin~~
AmapTrackPlugin-master
1. 申请Web服务API KEY: `dc646e461029ade1b010eae77bf0dfd8`
2. 创建终端
  https://tsapi.amap.com/v1/track/terminal/add
  "name": "公路app猎鹰",
  "sid": `866078`
#### 安装
> cordova plugin add ./additional/AmapTrackPlugin-master
#### 配置
```xml
<platform name="android">
  <config-file target="AndroidManifest.xml" parent="/manifest/application" mode="merge">
    <!-- 高德地图 android key -->
    <meta-data android:name="com.amap.api.v2.apikey" android:value="72ecd018b48e21a8e85d556b56765505" />
    <!-- 定位需要的服务 -->
    <service android:name="com.amap.api.location.APSService" />
    <!-- 轨迹上报需要的服务 -->
    <service android:name="com.amap.api.track.AMapTrackService" />
  </config-file>
</platform>
```
**注意：** 该插件与其他高德插件使用中：
如果同时安装有cordova-plugin-gaodelocation-chenyu 这种插件
且cordova-plugin-gaodelocation-chenyu插件中已经配置高德androidkey 则不需配置上方内容

> android 定位sdk 9.3之后 猎鹰,地图,定位 三个共用时会有问题

### 关于弃用该插件后的猎鹰功能解决方案
> 调试过程：原插件中调试文件：AmapTrackPlugin.java 进行文件替换
> image/AmapTrackPlugin.java =>
> android/app/src/main/java/com/plugin/wly/amaptrack/AmapTrackPlugin/AmapTrackPlugin.java
> >image/AmapTrackPlugin.java 在当前地址栏中输入并访问下载

原因：不能使用 无法走入回调
![1673513435331](image/cordova/1673513435331.png)
解决方案：使用android持续定位，将定位结果给到后端，后端通过web server服务调用创建猎鹰轨迹





### 权限插件使用
1. 在config.xml文件中设置需要使用到的权限 [issues](https://github.com/NeoLSN/cordova-plugin-android-permissions/issues/73##issuecomment-535815058)
2. 使用cordova-plugin-android-permissions 插件校验权限 申请权限

### 关于权限
* android6 之后 分（普通权限）normal permission 和 （危险权限）dangerous permission
* 普通权限直接写在config.xml 文件中 在软件安装后自动获取
* **危险权限**不仅需要配置，还需要在使用的过程中申请获取，得到用户授权同意后才可以正常使用  (保证危险权限调用前申请即可)

危险权限一共9组24个权限（不在以下名单的为普通权限）
| 权限组名  |权限名|
|---|---|
|  CALENDAR |READ_CALENDAR，WRITE_CALENDAR|
| CAMERA|CAMERA |
| CONTACTS| READ_CONTACTS，WRITE_CONTACTS，GET_ACCOUNTS|
| LOCATION|ACCESS_FINE_LOCATION，ACCESS_COARSE_LOCATION |
|MICROPHONE | RECORD_AUDIO|
|PHONE |READ_PHONE_STATE，CALL_PHONE， READ_CALL_LOG，WRITE_CALL_LOG，ADD_VOICEMAIL，USE_SIP，PROCESS_OUTGOING_CALLS |
| SENSORS|BODY_SENSORS |
|SMS |SEND_SMS，RECEIVE_SMS，READ_SMS，RECEIVE_WAP_PUSH，RECEIVE_MMS |
|STORAGE | READ_EXTERNAL_STORAGE，WRITE_EXTERNAL_STORAGE|

```txt
android.permission.READ_CALENDAR允许程序读取用户日历数据
android.permission.WRITE_CALENDAR允许一个程序写入但不读取用户日历数据
android.permission.CAMERA，允许访问摄像头进行拍照
android.permission.READ_CONTACTS允许程序读取用户联系人数据
android.permission.WRITE_CONTACTS允许程序写入但不读取用户联系人数据
android.permission.GET_ACCOUNTS访问一个帐户列表在Accounts Service中
android.permission.ACCESS_FINE_LOCATION允许一个程序访问精良位置(如GPS)
android.permission.ACCESS_COARSE_LOCATION允许一个程序访问CellID或WiFi热点来获取粗略的位置
android.permission.RECORD_AUDIO允许程序录制音频
android.permission.CALL_PHONE允许一个程序初始化一个电话拨号不需通过拨号用户界面需要用户确认
android.permission.READ_PHONE_STATE 访问电话状态
android.permission.READ_CALL_LOG  查看电话日志
android.permission.WRITE_CALL_LOG写入电话日志
android.permission.ADD_VOICEMAIL  允许应用程序添加系统中的语音邮件
android.permission.USE_SIP  允许程序使用SIP视频服务
android.permission.PROCESS_OUTGOING_CALLS   允许应用程序监视、修改、忽略拨出的电话
android.permission.BODY_SENSORS  允许该应用存取监测您身体状况的传感器所收集的数据，例如您的心率
android.permission.SEND_SMS允许程序发送SMS短信
android.permission.RECEIVE_SMS允许程序监控一个将收到短信息，记录或处理
android.permission.READ_SMS允许程序读取短信息
android.permission.RECEIVE_WAP_PUSH允许程序监控将收到WAP PUSH信息
android.permission.RECEIVE_MMS允许一个程序监控将收到MMS彩信,记录或处理
android.permission.WRITE_EXTERNAL_STORAGE   允许程序写入外部存储，如SD卡上写文件
android.permission.READ_EXTERNAL_STORAGE   访问您设备上的照片、媒体内容和文件
```
> [权限参照](https://developer.android.com/reference/android/Manifest.permission)


## 问题记录
### line32 cdvCreateAssetManifest
Error: Could not find method leftShift() for arguments [dev_build_extras_bfw7hxbiphfvf2wlbp02s8oxb\$_run_closure1\$_closure4@455ef480] on task ':app:cdvCreateAssetManifest' of type org.gradle.api.DefaultTask.

> https://blog.csdn.net/xiaopangcame/article/details/115543966
![1672977879381](image/cordova/1672977879381.png)

按照提示找到文件 接着找到line32 cdvCreateAssetManifest 这个任务 ，原因是其中写法是旧版 需要将 `<<` 箭头删除 即可

<!-- ## 过时api whitelist
> 不要使用旧版的code-push
```shell
cordova plugin add cordova-plugin-code-push@latest
```
通过卸载旧版cordova-plugin-code-push 与相关的其他包后重新安装
code-push  cordova-plugin-file-transfer  cordova-plugin-file  cordova-plugin-compat cordova-plugin-zip -->

### 无法定位问题
> Q: https://github.com/apache/cordova-plugin-geolocation/issues/255
> I'm using this plugin instead:
> cordova plugin add https://github.com/ToniKorin/cordova-plugin-location-provider.git
> this plugin using LocationProvider natively, not W3C API and work on vivo, oppo, xiaomi.
> cordova.plugins.LocationProvider.getOwnPosition(param like w3C, successcallback, errorcallback)
> https://github.com/ToniKorin/cordova-plugin-location-provider
> > 来自github https://github.com/apache/cordova-plugin-geolocation/issues/255#issuecomment-1325908536


### 警告过时api问题- 无关紧要可以忽略
项目根目录下 build.gradle中增加内容
```java
    // add
    gradle.projectsEvaluated {
        tasks.withType(JavaCompile) {
            options.encoding = "UTF-8"
            options.compilerArgs << "-Xlint:unchecked" << "-Xlint:deprecation"
        }
    }
```
![1672892156648](image/cordova/1672892156648.png)

app/build.gradle中增加
```java
  multiDexEnabled true
```
![1672892269035](image/cordova/1672892269035.png)

### UnhandledPromiseRejectionWarning
环境：
cordova:8.0.0
<engine name="android" spec="7.0.0" />
问题原因: Android版本问题
更换为Android6

### cordova couldn't send request

安卓9.0之后出于安全考虑，默认只使用https的方式发送，除非由开发设置
解决：
可以在项目路径下的这个位置…/platforms/android/app/src/main/AndroidManifest.xml
找到AndroidManifest.xml文件, application标签添加
> android:usesCleartextTraffic="true"

![1672926831580](image/cordova/1672926831580.png)

参见：[networkerror](#networkerror)


### networkerror
> ***Android9.0不再支持http**

解决：
在 AndroidManifest.xml的application中 添加
`android:usesCleartextTraffic="true"`  同上[cordova couldn't send request](#cordova-couldnt-send-request)


> cordova-android@9及以下(cordova@10及以下)
> 页面可以直接展示 file://.....
> cordova-android@10及以上 (cordova@11及以上)
> 这个版本的 cordova-android 会默认使用自定义协议打开本地html (不配置即默认)
<!-- > 可以通过配置不同协议打开 -->
<!-- ```xml
  <preference name="scheme" value="http">
  <preference name="hostname" value="localhost">
  或者
  <preference name="scheme" value="https">
  <preference name="hostname" value="127.0.0.1">
``` -->
```xml
  <platform name="android">
    <edit-config file="app/src/main/AndroidManifest.xml" mode="merge" target="/manifest/application">
      <application android:usesCleartextTraffic="true" />
    </edit-config>
  </platform>
```

### ~~关于如何使用 cordova-custom-config~~
demo: https://github.com/dpa99c/cordova-custom-config-example/blob/master/config.xml#L5

### Could not dispatch a message to the daemon
内存不足

### 当新建项目 使用第三方脚本 加载报错 Refused to load the script *** 时
注释掉 `<meta http-equiv ** >`

### URL blocked by whitelist
安装插件 cordova plugin add cordova-plugin-whitelist
配置config.xml `<access origin="*" />`


### build的时候 报错 AAPT: error: unbound prefix.
命名空间
![1673332568504](image/cordova/1673332568504.png)
给config.xml添加 xmlns:android="http://schemas.android.com/apk/res/android"
![1673332590110](image/cordova/1673332590110.png)


### android.useAndroidX
> Execution failed for task ':app:mergeDebugResources'. This project uses AndroidX dependencies, but the 'android.useAndroidX' property is not enabled. Set this property to true in the gradle.properties file and retry.

解决办法：

在config.xml的 < platform name="android">中添加：
```xml
<preference name=”AndroidXEnabled” value=”true” />
```

或者（未尝试）通过设置 项目下（非app）下的gradle.properties中添加
android.useAndroidX=true
android.enableJetifier=true


### :app:cdvCreateAssetManifest
FAILURE: Build failed with an exception.
* Where:
Script 'D:\program\workspace\Other\cordova-codepush\permission-http-9\platforms\android\cordova-plugin-code-push\hellocordova-build-extras.gradle' line: 32

* What went wrong:
A problem occurred evaluating project ':app'.
Could not find method leftShift() for arguments [hellocordova_build_extras_s5knc19qx54eei8uaro81mup$_run_closure1$_closure4@656dfdb4] on task ':app:cdvCreateAssetManifest' of type org.gradle.api.DefaultTask.

> 这个问题一般是在安装cordova-plugin-code-push 之后build android时发生，原因是gradle中语法版本过高，找到报错的 `.gradle文件` 将 << 删除即可


### 错误: 程序包com.example.chenyu不存在 import com.example.chenyu.R;
在安装cordova-plugin-gaodelocation-chenyu插件后 也会报错 ***.R 的问题
这个问题找到 platforms/android/app/src/main/java/com/chenyu/GaoDeLocation/SerialLocation.java
将第17行的 `import com.example.chenyu.R;` 改为当前项目包名（例如包名：io.cordova.hellocordova） `io.cordova.hellocordova.R;` 即可

### duplicated Element meta-data#com.amap.api.v2.apikey at AndroidManifest.xml:16:9-109 duplicated with element declared at AndroidManifest.xml:15:9-109
这种 报错信息包含 duplicated 和 AndroidManifest.xml的错误为 config.xml标签中定义的插件变量与已安装的插件中配置的变量不一致导致的变量重复添加至AndroidManifest.xml文件中
解决：
1. 可以将AndroidManifest.xml文件中定义重复的内容删除（删除前确认当前需要使用变量是哪个，且后续build会重新插入重复变量）
2. 或者删除插件，移除android platform，重新安装platform与插件
3. 或者找到 /platforms/android/android.json 这份文件中的变量值，修改与config.xml文件中插件使用的变量值一致（简单有效）
> 统一以config.xml 文件中变量为准

### [Error]  The uploaded package is identical to the contents of the specified deployment's current release.
推送版本与当前版本一致

### 错误: 找不到符号      AMapLocationClient.updatePrivacyShow(cordova.getContext(), true, true);
原因是 cordova-plugin-gaodelocation-chenyu 与 com.plugin.wly.amaptrack
两个插件使用的高德api版本不一致
![1673446797658](image/cordova/1673446797658.png)
![1673447783161](image/cordova/1673447783161.png)


### tag mismatch
dx.bat问题,一般出现在高版本sdk上
找到报错的android sdk下build-tool 重命名d8.bat 为dx.bat 还有lib内的同名文件

https://stackoverflow.com/questions/68387270/android-studio-error-installed-build-tools-revision-31-0-0-is-corrupted

![1673610093996](image/cordova/1673610093996.png)

### 关于使用打包机打包后app安装后打开空白的问题：
插件加载问题，需要逐步调试

### 不支持在file协议使用，请在http或https协议下使用！
I/chromium: [INFO:CONSOLE(45)] "腾讯地图 JavaScript API 不支持在file协议使用，请在http或https协议下使用！", source: https://map.qq.com/api/gljs?v=1.exp&key=THKBZ-COO3O-XREWV-S3S5M-QCMWO-72BDM (45)

方案一
这类http问题是因为在cordova-android@9中 使用的是file协议打开的webview，升级platform->andorid@10以上就是https协议
更换平台出现的新问题有：
1. 符号 org.apache.cordova.Whitelist; 不存在  解决方式：需要在原先platform android@9中安装的Whitelist.java复制一份

![1673618119824](image/cordova/1673618119824.png)

2. "Mixed Content: The page at 'https://localhost/index.html' was loaded over HTTPS, but requested an insecure script 'http://api.tianditu.gov.cn/api?v=4.0&tk=2e97b3454ae50efd923c41f5fb4129d7'. [Mixed Content](##Mixed-Content)

方案二：
这两个测试后不行，在当前版本android@9中不可用 ，其他使用时都是将http转file用到此配置
```xml
<preference name="scheme" value="http" />
<preference name="AndroidInsecureFileModeEnabled" value="false" />
```

方案三：
继续使用andorid@9 使用webview插件修改file协议至http （当前使用）
安装插件
```shell
cordova plugin add cordova-plugin-ionic-webview
```
当前安装版本为： "cordova-plugin-ionic-webview": "5.0.0"
安装后即解决

### Mixed Content

摘抄自[cordova遇到的几个问题记录](https://zhuanlan.zhihu.com/p/539173572)
```txt
1、修改cordova默认的本地https服务为http服务。搜索工程代码中的SCHEME_HTTPS的值，从https修改为http。

2、设置webview的属性，在SystemWebViewEngine.java文件的void initWebViewSettings()方法中添加如下属性设置：

webView.getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
经过以上的修改后，页面内容可以正常打开，可以正常访问网络了。
```


### java.io.IOException: Couldn't delete ***\platforms\android\app\build\outputs\apk\debug\output.json
该情况为文件占用，关闭相关占用服务重新打包