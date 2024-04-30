# wireguard-subconverter-wgsn-worker

免费在 Cloudflare Workers / Pages 中搭建 WARP 的 WireGuard 转换 Nekobox for Android 的 "sn://" 订阅脚本。

每次更新订阅地址，都会生成的不同的 `Endpoint`（相当于更换 WireGuard 配置中的 `Endpoint`） => `SN Link` 也会不同，实现订阅节点想换就随时更换，还是批量更换。

### 一、转换流程

<img src="images\图1.png" />

### 二、搭建教程

部署前，建议将 `_worker.js`中第**4183**行代码中的 `wireguardParameters` 参数改为自己的 `wireguard` 配置的参数（也可以在 `_worker.js` 代码中搜索 `worker.js` 快速定位），然后按照下面不同方式，部署到 `Cloudflare` 中。

- Cloudflare Workers

将 `_worker.js` 的代码复制到您的 `cloudflare worker` 应用程序中，替换掉原来的 `worker.js` 代码，部署。

- Cloudflare Pages

将`_worker.js`的代码下载到本地电脑，文件名称要一样，不能修改，然后在文件外面套一层文件夹，也就是将 `_worker.js` 下载到一个空文件夹中，然后使用 git 工具，在这个文件夹的路径中执行 `git init` 命令，最后将这个文件夹以zip格式压缩，或者直接以文件夹的形式上传到 `Cloudflare Pages` 中，完成部署。

##### （可选）添加访问密码

为了防止别人知道你的网站地址，使用您的 `Cloudflare WARP` 账号的流量，您可以选择性添加订阅链接的访问密码。
<details>
<summary>点击展开，在workers中设置访问密码</summary>
	<img src="images\图2.png" />
</details>

<details>
<summary>点击展开，在pages中设置访问密码</summary>
	<img src="images\图3.png" />
</details>

如果设置了访问密码，在订阅链接中没有传入或传入的`pwd` 值与  `PASSWORD` 值不相同时，无法获取订阅地址的订阅内容。
```
https://a.abc.workers.dev/sub?target=wgsn&pwd=<这里添加你设置的变量密码>
```

### 三、参数说明

| 参数         | 含义                                                         | 例子                                                         |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| target       | （必须）转换成的目标，这个代码只能转换为Nekobox for Android 的 `sn://` 。 | target=wgsn，wireguard => wg+sn => wgsn<br>特指 Nekobox for Android 中 wireguard 代理协议的 sn 分享链接 |
| pwd          | （必须/可选）访问订阅内容的密码<br>如果您在 cloudflare 中设置了`PASSWORD` 变量值(访问密码)，这个参数是必须的。 | pwd=???<br>密码等于您在 cloudflare 后台设置的`PASSWORD` 变量值 |
| nodeSize     | （可选）您需要多少条sn://链接?                               | nodeSize=100，100条 `SN Link` 链接，默认为200                |
| loc/location | （可选）你想要哪个 cidr 段的IP？<br>us => 162.159开头的IP；gb => 188.114开头的IP。 | loc=us、loc=gb                                               |
| mtu          | （可选）修改 WirGuard 中的 mtu 的值。                        | mtu=1280，或者 `1280~1500` 之间的数，默认1280                |
| ipSize       | （可选）从所有 cidrs 中随机生成多少个不重复的IP，一定程度上可以控制 SN Link 生成的数量。 | ipSize=500，生成500个IP地址，默认为1000                      |
| portSize     | （可选）从 ports 的54个端口中随机生成多少个不重复的 port ，一定程度上可以控制 SN Link 生成的数量。 | portSize=5，随机选择54个port的5个，默认为10                  |
| cidrs        | （可选）使用自定义的 cidr ，不使用内置的 cidrs ，支持多个 cidr 以逗号隔开、字符串形式传入。只支持 IPv4 CIDR 的传入。 | cidrs=162.159.192.0/24<br>cidrs=162.159.192.0/24,162.159.193.0/24 |


```
https://a.abc.workers.dev/sub?target=wgsn
https://a.abc.workers.dev/sub?target=wgsn&loc=us
https://a.abc.workers.dev/sub?target=wgsn&loc=gb
https://a.abc.workers.dev/sub?target=wgsn&mtu=1280
ttps://a.abc.workers.dev/sub?target=wgsn&nodeSize=100
ttps://a.abc.workers.dev/sub?target=wgsn&nodeSize=100&mtu=1280
https://a.abc.workers.dev/sub?target=wgsn&ipSize=200&portSize=10
https://a.abc.workers.dev/sub?target=wgsn&ipSize=200&portSize=10&cidrs=162.159.192.0/24,162.159.193.0/24
```

### 四、工具

NekoBoxForAndroid：https://github.com/MatsuriDayo/NekoBoxForAndroid
