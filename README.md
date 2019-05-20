# 1024 GAME

## 代码结构

### ui

ui为前端代码（感谢三哥和阿文的帮助），目录下的config/config.json定义了后端的请求地址backendUri以及要显示的元素列表eleList（如果eleList被定义，则不去请求后端地址）

### backend

backend为后端代码， 目录下的config/config.json定义了玩1024游戏需要展示的元素列表eleList，比如传统的2,4,8,16，...，1024可以定义为

```
{
  "eleList": [2,4,8,16,32,64,128,256,512,1024]
}
```

也可以定义为其他有意思的列表，如：
```
{
  "eleList": ["小兵","排长","连长","营长", "团长", "师长","军长","司令","总统"]
}
```
字符串长度最好不要大于两个汉字


## 使用说明

### 前后端统一模式

- 使用golang代码部署，指定github地址`https://github.com/AvTiMp/1024Game`， 前后端的构建目录分别为/ui和/backend
- 为前后端创建相应的service，可以参看yamls文件夹下的例子，注意容器的端口不能随便改动（前端容器端口为8888，后端容器端口为8000）
- 为前后端创建相应的route
- 创建前后端的configmap（key值为`config.json`，值根据自己的需求定义，另外，前端的backendUri必须为后端路由地址），分别挂载到每个容器里代码目录下的`config`
- enjoy your own 1024 game


### 前端独立模式
- 使用golang代码部署，指定github地址`https://github.com/AvTiMp/1024Game`， 构建目录为/ui
- 为前端创建相应的service，可以参看yamls文件夹下的例子，注意容器的端口不能随便改动（前端容器端口为8888）
- 为前端创建相应的route
- 创建configmap， key值为`config.json`，值为一个json字典，且必须包含eleList字段
- enjoy your own 1024 game
