# code-push

## 配置热更新：

### 当前文档中使用的环境
```code
$ cordova -v
11.0.0

$ npm -v
6.14.17

$ node -v
v14.20.0

$ cordova platform ls
Installed platforms:
  android 9.1.0

$ code-push -v
2.1.9

cordova-plugin-code-push 1.11.17
```
### 基本
```shell
npm i code-push-cli@2.1.9 -g
code-push login http://39.104.101.201:3000 # 首次登录后 后续不用在登陆
code-push whoami # 查看当前登陆用户
# 在弹出的浏览器页面进行登录并点击获取token
# 账号：road  该账号为公路app使用
# 密码：gzdd@2019
```

```xml
	<platform name="android">
		<allow-intent href="market:*" />
		<preference name="CodePushDeploymentKey" value="iEtFO69ljpTjmeQXbI8OfbQq0HF54ksvOXqoQ" />
		<preference name="CodePushServerUrl" value="http://39.104.101.201:3000" />
  </platform>
```
> dev_test 意为各版本app对应的appName

`Production`: 生产环境key
`Staging`: 开发环境key

在congfig.xml中配置不同的key之后分别打包出两个环境的apk

```shell
# 强制更新参数 --m
code-push release-cordova dev_test android --description="解决了一些已知问题" --m # 强制更新
code-push release-cordova dev_test android --description="解决了一些已知问题" # 可选更新
```
默认更新开发环境，测试完之后，把staging包推给production
```shell
code-push promote dev_test Staging Production
```

### 发布更新(摘自cordova-wrapper:main-Two)
dev_test 为 appName 注意替换
1. 当前app为发布打包过：
   1. 替换config.xml 中 CodePushDeploymentKey的value值 为已定义的热更新服务中的key值 （Staging 开发环境 ，Production 生产环境）两个版本都需要单独发包
2. 客户端已安装该app，进行热更新推送：
   1. code-push release-cordova dev_test android --description="解决了一些已知问题"
3. 推送至生产环境
   1. code-push promote dev_test Staging Production
4. 不建议： 重新发布app时 **可以** 更新app版本号config.xml 重新打包（**不建议更新版本号**：原因见docs文档cordova-plugin-code-push中描述的版本号相关内容）
5. 所有新打包apk文件 都备份到apks中 命名格式：六安-Staging.apk 六安-Production.apk (以热更新key为准，具体打包中h5使用的服务地址是生产环境还是开发环境不管)



### 其他

```shell
code-push release-cordova dev_test android -t 3.2.10 --description="推送给3.2.10的版本更新"
```
> targetBinaryVersion : `">1.2.3"`
> label：指定的部署环境里更新哪个发布版本（如：v10）
> updateContents： 指定应用更新的资源和代码的位置就是打包后的jsbundle位置。 如 /opt/www/bundle/ios
> targetBinaryVersion: 目标二进制的版本号，它的可选值规则如图
> Mandatory： 是否强制更新
> rollout： 指定可以更新的用户百分百，取值在1-100。默认为100

更新回滚
```shelll
code-push rollback <appName> <deploymentName>
code-push rollback MyApp Production --targetRelease v10
```

查看更新情况
```shell
code-push deployment ls dev_test
```


### 关于热更新插件版本管理
config.xml 中的version值 表示为当前打包安装后的app的版本
而在code-push的更新指令中，-t（targetBinaryVersion）即指向该版本。
每次推送更新后（如果更新中包含修改了config.xml）文件，也不会影响到已安装在手机中的app版本。 且更新时必须指定该版本，否则可能无法推送成功。

注意：
* 不要改动config.xml中的version值，每次更新都会默认推送到当前这个version
* 更改了config.xml中version的值，如果没有打包出新的apk给到用户安装，那么推送中的version将不会影响，一旦打包后并且给到用户安装。此时存在多个version:
  * `code-push deployment ls dev_test` 运行后app version 为3.2.10
  * `code-push release-cordova` 时修改config.xml中的version为3.2.12
  * 此时运行 `code-push release-cordova dev_test android  --description="不指定-t config.xml version为3.2.12"` 会按照当前config.xml中version推送
* 总结：【前提当时用热更新插件时】不要轻易修改config.xml中的version值，h5+cordova实现方式中通过在h5中定义自身版本标识
* 留意：在使用不同version打包后，会生成一个version名称的文件在cordova项目中
  * ![1673442715164](image/cordova-code-push/1673442715164.png)
  <!-- * ![1673440683361](image/cordova-code-push/1673440683361.png)
  * 需要传入 targetBinaryVersion 才可以正常更新
  * `code-push release-cordova dev_test android -t 3.2.10 --description="推送给3.2.10的版本更新"`
  * ![1673440933298](image/cordova-code-push/1673440933298.png) -->


## 各版本对应热更新
### 六安 luan
`apiUrl = 'https://la.91jt.net:18093/testroad'`
`regionalVersion = '六安';`

Production: `rb5hTQJ6HBkfpDXBTQap6qRczrhW4ksvOXqoQ`
Staging: `9sDiypMh43BxlamKJjOmQwCeuvE54ksvOXqoQ`

### 长兴 changxing
`apiUrl = 'https://cxjt.91jt.net:9090/rmsRoad'`
`regionalVersion = '长兴';`

Production: `oG8RBknuRUlTRZ0gaUL9gDhFRqAj4ksvOXqoQ`
Staging: `hJjfCsgWyjxACHKz8JUWqFqssLOQ4ksvOXqoQ`


### 诸暨 zhuji
`apiUrl = 'https://yx.91jt.net/ddRmsRoad'`
`regionalVersion = '诸暨';`

Production: `FDO54guZkhuQ6kID6zzztwYm7gKg4ksvOXqoQ`
Staging: `M61y5qdJhV6TgrE5lyMyYS2fxtsS4ksvOXqoQ`

### 聊城开发区 liaocheng_kf
`apiUrl = 'https://lckfq.91jt.net:9090/ddRmsRoad'`
`regionalVersion = '聊城';`

Production: `7xIM8WoJ6YUBkQ6lqzcAuVfekQ9z4ksvOXqoQ`
Staging: `IXNeVNEeIkQfwSUztMXUHdBwREan4ksvOXqoQ`

### 聊城高新区 liaocheng_gx
`apiUrl = 'https://lcgxjt.91jt.net:19012/ddRmsRoad'`
`regionalVersion = '聊城';`

Production: `KS2N1kEYSm582VUHpxdfOAVTHpAW4ksvOXqoQ`
Staging: `QtzmOpXrvHYTX1KT1SMJqEWXXQJW4ksvOXqoQ`


### 即墨 jimo
`apiUrl = 'https://jimo.91jt.net:9096/testroad'`
`regionalVersion = '即墨';`

Production: `21jXq1CpPU1iu4hQEesmbeU6Oq6p4ksvOXqoQ`
Staging: `S6Qt4fhjJELzkC85VI1czAoExM8j4ksvOXqoQ`


### 宁波 ningbo
`apiUrl = 'https://yx.91jt.net/nbddRmsRoad'`
`regionalVersion = '宁波';`

Production: `kVwME5y6fUMmVqCI6mhMOWV0ktnG4ksvOXqoQ`
Staging: `GoSQ6i4kP0uKhSJKWjlbeaYxn7yZ4ksvOXqoQ`


### 松阳 songyang
`apiUrl = 'https://yx.91jt.net/syddRmsRoad'`
`regionalVersion = '松阳';`

Production: `Y32ax6lXCrTgrstD1vCkupZzPLTY4ksvOXqoQ`
Staging: `Y8QYYvB5UPu1GB2N5XuYDYV55ToG4ksvOXqoQ`


### 测试环境 dev_test
`apiUrl = 'https://yx.91jt.net/testroad'`
`regionalVersion = '长兴';`

Production: `iEtFO69ljpTjmeQXbI8OfbQq0HF54ksvOXqoQ`
Staging: `ifwE6nq83JF7AwwwIjMOnF8ZKmUz4ksvOXqoQ`
