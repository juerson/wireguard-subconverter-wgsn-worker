import pako from 'pako'; //  JavaScript 压缩和解压库

// 这里是普通账号，使用时，建议更换成自己的plus账号
let wireguardParameters = [
  { 'privateKey': 'AKs7CKzbDVmfjSgCB4A1JNI5YBMclHYV2OQ7srIijW4=', 'ipv6': '2606:4700:110:876d:4d3c:4206:c90c:6bd0/128', 'reserved': "tBDy" },
  { 'privateKey': 'ILJiqBa4QguF5YHRiB9Xfq2Ll01qbYe4dUKZLdgNTFs=', 'ipv6': '2606:4700:110:8e7b:3658:cd12:5c4f:d86e/128', 'reserved': "2rSJ" },
  { 'privateKey': 'aJ2wqfkki3um7JnNAH2R6/OnAo2Td+pmxbRReh1v9GE=', 'ipv6': '2606:4700:110:8310:d937:2fb:c312:9498/128', 'reserved': "omje" },
  { 'privateKey': '0EefAfoz3eY1PUwycUO5/Ux0GKnjOq6TJk5NySdOglk=', 'ipv6': '2606:4700:110:8b5b:874a:4dbe:b6d2:d333/128', 'reserved': "udAY" },
  { 'privateKey': 'gNPBZNJg1mOGJjoTTof9luaQHdZP2oMRU8nXd3xjpX8=', 'ipv6': '2606:4700:110:83b7:3a13:7ef3:96fc:f055/128', 'reserved': "" },
  { 'privateKey': 'sIVbx/54EJOM0caRr/kksFAkdni+V9VZawSZaha0tms=', 'ipv6': '2606:4700:110:8502:e803:c14e:2858:c0e7/128', 'reserved': "" },
  { 'privateKey': '+Cgu25E1zo9PkW5fC299zgbGVGKJamWgF6/iqQdoUW0=', 'ipv6': '2606:4700:110:805e:1441:a533:975b:8a39/128', 'reserved': "mbeS" },
  { 'privateKey': 'GKaNRx+KVRL3F1sguZHO8wh70yUprNsPjmUapCGUsGk=', 'ipv6': '2606:4700:110:88f9:54b8:120e:d01d:c77e/128', 'reserved': "eWZI" },
  { 'privateKey': 'qEqlXOEDcFt803y8Gs/fo8DuZJpZpWV/FSh1oKReFXI=', 'ipv6': '2606:4700:110:890f:f926:98fe:7e61:d0e7/128', 'reserved': "Eg/7" },
  { 'privateKey': '+HfkMSyh7obEkX4J8Qa7Xk77CLVn45AW4CdBbnFNaGc=', 'ipv6': '2606:4700:110:83e8:84f7:8c64:70b4:6709/128', 'reserved': "XPKM" },
  { 'privateKey': 'cA8htoCSuLJbax8I6HewsDTwTbuWt5DjEItcGvLGREw=', 'ipv6': '2606:4700:110:8c0b:359c:ee61:a221:d261/128', 'reserved': "Mg/q" },
  { 'privateKey': 'iLHohl4txwAsgUPW1lGsnAeJDFvit6LAdMYTwbNRGUM=', 'ipv6': '2606:4700:110:81a6:2bc6:e542:7f3e:57f1/128', 'reserved': "Bhob" },
  { 'privateKey': 'eMkBv99f6rbTboaKNV4HJhvu/Dn35mub7BrY8xFrCVo=', 'ipv6': '2606:4700:110:8980:cd13:9729:f969:9aab/128', 'reserved': "ia3l" },
  { 'privateKey': '8NquX1vPe6AHY5qXmShDELMtx4was2awcNqKj2MgRGM=', 'ipv6': '2606:4700:110:82e8:22b6:a7ee:b89c:a5a2/128', 'reserved': "7Lqd" },
  { 'privateKey': 'kK/MhN/pbNI05H77pgSsNN6OqM+jPba3Lz9A5Jlg8lw=', 'ipv6': '2606:4700:110:8847:e19b:4828:fe35:d337/128', 'reserved': "i6sj" },
  { 'privateKey': '6L1n+NV62WEr2o4/pEUopsgB6RzcY86BLIgYwdOTxmc=', 'ipv6': '2606:4700:110:833b:f16c:a4f3:cf60:8fa3/128', 'reserved': "jdXG" },
  { 'privateKey': 'sALjsE4FBGPC/GosnaOhFy/+2cog7roA3jN8yC75F3g=', 'ipv6': '2606:4700:110:8d06:7ef8:cf45:2393:9ac7/128', 'reserved': "QpBX" },
  { 'privateKey': 'iEpioH7klluHVhhhDsz0JodBtjqECXMT7J0LLqHmsEs=', 'ipv6': '2606:4700:110:871a:f575:a463:76a0:1984/128', 'reserved': "QaoR" },
  { 'privateKey': 'IIBhFRq9qkF0nxPXHzzvATyRVcEePvPU5bJOuoC2S0g=', 'ipv6': '2606:4700:110:8ea1:c997:fbfe:f888:3946/128', 'reserved': "Eow2" },
  { 'privateKey': 'gO/NAt7kT3zNWk6OiQ5Ru9A2ksAr96sPxxr68B8TtH0=', 'ipv6': '2606:4700:110:8775:bf6c:a489:d6db:fd76/128', 'reserved': "Kkwg" },
  { 'privateKey': 'iBtKwA/VDkj1n8uFD0v+E3bIQHMPWsRagclDwr6lUVI=', 'ipv6': '2606:4700:110:8dcd:e0e6:7c9a:c35e:2ece/128', 'reserved': "zicA" },
];

let PrivateKey = "wBUDtqZGfV1gpV7n4GNsGEyR76hAMN1hGaM1yfYcFms=";
let Address = ["172.16.0.2/32", "2606:4700:110:816b:ef6f:4f25:f7ab:dc09/128"];
let PublicKey = "bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=";
let Reserved = "gUxW";
let MTU = 1280;

let cidrs = ['162.159.192.0/24', '162.159.193.0/24', '162.159.195.0/24', '188.114.96.0/24', '188.114.97.0/24', '188.114.98.0/24', '188.114.99.0/24'];
let ports = [854, 859, 864, 878, 880, 890, 891, 894, 903, 908, 928, 934, 939, 942, 943, 945, 946, 955, 968, 987, 988, 1002, 1010, 1014, 1018, 1070, 1074, 1180, 1387, 1843, 2371, 2506, 3138, 3476, 3581, 3854, 4177, 4198, 4233, 5279, 5956, 7103, 7152, 7156, 7281, 7559, 8319, 8742, 8854, 8886, 2408, 500, 4500, 1701];

// 它们控制生成 SN Link 的数量
let randomIpSize = 1000; // 在cidrs中，海选出1000个IP地址(指从cidrs中获取的总IP数，不是每个cidr获取randomIpSize个IP；获取IP没有重复的，randomIpSize指不重复的IP数)，超出cidrs的总IP数，就生成cidrs范围中所有IP地址
let randomPortSize = 10; // 在ports中，海选出10个端口，该值输入不合法(共54个端口)，则默认为10个随机端口；注意：该值太大，会很大几率生成同一个IP对应不同的端口
let randomNodeSize = 300; // 从前面海选得到的IP和PORT后，将它们组合成一个ip_with_port的数组，从该数组中，随机挑300个ip_with_port数据，这个数据应用到生成 SN Link 分享链接

// ————————————————————————————————————————— SN Link 的 wireguard 序列化 ———————————————————————————————————————————————————

function encodeSnStr(s) {
	let encoder = new TextEncoder();
	if (!s) {
		return new Uint8Array([0x81]);
	}
	if (s.length === 1) {
		let arr1 = new Uint8Array([0x82]);
		let arr2 = encoder.encode(s);
		let ret = new Uint8Array(arr1.length + arr2.length);
		ret.set(arr1);
		ret.set(arr2, arr1.length);
		return ret;
	}
	let ret = encoder.encode(s);
	ret[ret.length - 1] |= 0x80;
	return ret;
}

function p32(n) {
	let buffer = new ArrayBuffer(4);
	let view = new DataView(buffer);
	view.setUint32(0, n, true); // true 参数表示使用 little-endian 排序
	return new Uint8Array(buffer);
}

function p8(n) {
	return new Uint8Array([n]);
}

class SnBase {
	serialize() {
		let ret = new Uint8Array(0);
		for (let key in this) {
			if (this.hasOwnProperty(key)) {
				let newPart = this.objSerialize(this[key]);
				let temp = new Uint8Array(ret.length + newPart.length);
				temp.set(ret);
				temp.set(newPart, ret.length);
				ret = temp;
			}
		}
		return ret;
	}

	objSerialize(obj) {
		if (typeof obj === 'string') {
			return encodeSnStr(obj);
		} else if (typeof obj === 'boolean') {
			return p8(obj ? 1 : 0);
		} else if (typeof obj === 'number') {
			return p32(obj);
		} else if (obj instanceof SnBase) {
			return obj.serialize();
		}
		return new Uint8Array(0);
	}
}


class SnServer extends SnBase {
	constructor(serverAddress = '', serverPort = 0) {
		super();
		this.serverAddress = serverAddress;
		this.serverPort = Number(serverPort);
	}
}


class SnMeta extends SnBase {
	constructor(name = "") {
		super();
		this.extraVersion = 2;
		this.name = name;
	}
}


class Wireguard extends SnBase {
	constructor(
		server = new SnServer(),
		privateKey = '',
		localAddress = '172.16.0.2/32',
		peerPublicKey = 'bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=',
		peerPreSharedKey = '',
		mtu = 1280,
		reserved = ''
	) {
		super();
		this.version = 2;
		this.server = server;
		this.privateKey = privateKey;
		this.localAddress = localAddress;
		this.peerPublicKey = peerPublicKey;
		this.peerPreSharedKey = peerPreSharedKey;
		this.mtu = Number(mtu);
		this.reserved = reserved;
	}

	serialize() {
		let ret = new Uint8Array(0);
		ret = this.concatTypedArrays(ret, this.objSerialize(this.version));
		ret = this.concatTypedArrays(ret, this.objSerialize(this.server));
		ret = this.concatTypedArrays(ret, this.objSerialize(this.localAddress));
		ret = this.concatTypedArrays(ret, this.objSerialize(this.privateKey));
		ret = this.concatTypedArrays(ret, this.objSerialize(this.peerPublicKey));
		ret = this.concatTypedArrays(ret, this.objSerialize(this.peerPreSharedKey));
		ret = this.concatTypedArrays(ret, this.objSerialize(this.mtu));
		ret = this.concatTypedArrays(ret, this.objSerialize(this.reserved));
		return ret;
	}

	concatTypedArrays(a, b) {
		const c = new Uint8Array(a.length + b.length);
		c.set(a, 0);
		c.set(b, a.length);
		return c;
	}
}

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		let password = env.PASSWORD || ""; // 从cloudflare后台的环境变量中获取密码
		//———————————————————————————————————————— 从 URL 请求链接中获取需要的参数 ————————————————————————————————————————
		let target = url.searchParams.get('target') || ""; // 转换为目标客户端或链接类型，v2rayn/wireguard、nekobox/nekoray
		let pwd = url.searchParams.get('pwd') || ""; // 从链接中获取密码
		let cidrsValue = url.searchParams.get('cidrs') || "";
		let newcidrs = cidrsValue ? cidrsValue.trim().split(',') : cidrs;
		let nodeSize = url.searchParams.get('nodeSize') || randomNodeSize;
		let ipSize = url.searchParams.get('ipSize') || randomIpSize;
		let portSize = url.searchParams.get('portSize') || randomPortSize;

		let location = url.searchParams.get('loc') || url.searchParams.get('location') || ""; // 粗略地选择哪些IP段(162/188开头的IP)
		if (location.toLocaleLowerCase() === "gb" && cidrsValue.trim() === "") {
			newcidrs = cidrs.filter(item => item.startsWith("188")); // 188开头的cidr
		} else if (location.toLocaleLowerCase() === "us" && cidrsValue.trim() === "") {
			newcidrs = cidrs.filter(item => item.startsWith("162")); // 162开头的cidr
		}

		MTU = url.searchParams.get('mtu') || MTU; // 修改MTU值
		let mtu = isNaN(Number(MTU)) ? 1280 : Number(MTU);
		
		// 将除了字母、数字、下划线、连字符和点号之外的所有字符进行编码
		if (pwd) {
			password = encodeURIComponent(password);
			pwd = encodeURIComponent(pwd);
		}
		
		// ———————————————————————————— 获取多个 ip_with_port 并添加到 ips_with_ports 数组中 ————————————————————————————

		// 收集IP:PORT
		let ips_with_ports = [];
		// 在newcidrs范围内，生成随机一定数量的IP地址
		generateRandomIPv4InRange(newcidrs, ipSize).forEach(ip => {
			// 在ports范围内，选择随机一定数量的PORT端口
			getRandomElementsFromArray(ports, portSize).forEach(port => {
				ips_with_ports.push(`${ip}:${port}`);
			});
		});

		switch (url.pathname) {
			case '/sub':
				// 符合转换目标的才会进行转换
				if (target.toLocaleLowerCase() === "wgsn" && password === pwd) {
					let endpoints = getRandomElementsFromArray(ips_with_ports, nodeSize);
					let snLinkResult = [];
					endpoints.forEach(ip_with_port => {
						// 分割IP和端口
						let [ip, port] = sliceIPAndPort(ip_with_port);
						if (ip === null && port === null) {
							return;
						}

						// —————————————————————————————————— 随机wireguard的参数或使用预设参数 ——————————————————————————————————

						let private_key, localAddress, reserved;
						if (wireguardParameters.length === 0) {
							private_key = PrivateKey;
							localAddress = Address;
							reserved = Reserved;
						} else {
							// 随机选择一个数据组
							let randomGroup = wireguardParameters[Math.floor(Math.random() * wireguardParameters.length)];
							private_key = randomGroup['privateKey'];
							localAddress = ["172.16.0.2/32", randomGroup['ipv6']].join(',');
							reserved = randomGroup['reserved'];
						}

						// —————————————————————————————————————— 将数据传入，构建 SN Link ——————————————————————————————————————

						// 创建 SnServer 、SnMeta对象并设置属性
						const server = new SnServer(ip, Number(port));
						const meta = new SnMeta(`warp-${ip_with_port}`);

						// 创建 Wireguard 对象并设置属性
						const wg = new Wireguard(server, // server 和 port
							private_key, // privateKey
							localAddress, // localAddress
							PublicKey, // peerPublicKey
							"", // peerPreSharedKey
							mtu, // mtu
							reserved, // reserved
						);

						// 将数据序列化为URL编码的字符串
						const serializedData = wg.serialize();
						const metaSerializedData = meta.serialize();

						// 将 serializedData 和 metaSerializedData 转换为 Buffer 对象
						let serializedBuffer = new Uint8Array(serializedData);
						let metaserializedBuffer = new Uint8Array(metaSerializedData);

						// 合并两个 Buffer 对象
						const combinedBuffer = concatBuffers(serializedBuffer, metaserializedBuffer);

						// 对 combinedBuffer 进行压缩
						const compressedData = pako.deflate(combinedBuffer);

						// 将压缩后的数据进行 URL 安全的 Base64 编码
						const encodedData = encodeBase64Url(compressedData);

						snLinkResult.push(`sn://wg?${encodedData}`);
					});
					const snLinkResult_string = snLinkResult.join('\n');
					const base64EncodedStr = btoa(snLinkResult_string);
					return new Response(base64EncodedStr, {
						headers: {
							"Content-Type": "text/plain; charset=utf-8",
						}
					});
				}
				default:
					return new Response("Not found", {
						status: 404,
						headers: {
							"Content-Type": "text/plain; charset=utf-8",
						}
					});
		}
	},
};

// —————————————————————————————————— 合并两个 buffer和 urlsafe_b64encode ——————————————————————————————————————————————

// 合并两个 Uint8Array
function concatBuffers(buffer1, buffer2) {
	if (!(buffer1 instanceof Uint8Array) || !(buffer2 instanceof Uint8Array)) {
		throw new Error('buffer1 and buffer2 must be instances of Uint8Array');
	}

	const length = buffer1.length + buffer2.length;
	const result = new Uint8Array(length);

	result.set(buffer1, 0);
	result.set(buffer2, buffer1.length);

	return result;
}

// URL 安全的 Base64 编码函数
function encodeBase64Url(data) {
	let base64Encoded = btoa(String.fromCharCode.apply(null, new Uint8Array(data)));
	// 替换 Base64 编码中的特殊字符
	return base64Encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// —————————————————— 从cidrs中随机生成IP地址，从ports中随机生成 port端口，分割ip_with_port的 IP 和 PORT ——————————————————
// 从众多的CIDR范围中，生成随机、不重复的numOfIPs个IP地址
function generateRandomIPv4InRange(cidrs, numOfIPs) {
	// 使用 Set 来存储唯一的 IP 地址
	let ips = new Set();
	// 计算每个CIDR范围的总IP数量
	let totalIPs = cidrs.reduce(function (acc, cidr) {
		let cidrParts = cidr.split('/');
		let subnetMask = parseInt(cidrParts[1]);
		let numberOfIPs = Math.pow(2, 32 - subnetMask);
		return acc + numberOfIPs;
	}, 0);
	// 如果numOfIPs超过了所有CIDR范围内的IP总数，将numOfIPs设置为所有CIDR范围内的IP总数
	numOfIPs = Math.min(numOfIPs, totalIPs);
	// 如果numOfIPs小于等于0，则返回空数组
	if (numOfIPs <= 0) {
		return Array.from(ips); // 将 Set 转换为数组并返回
	}
	// 从所有CIDR范围中随机选择指定数量的IP
	while (ips.size < numOfIPs) {
		let randIndex = Math.floor(Math.random() * totalIPs);
		let cumulativeIPs = 0;
		let selectedCIDR;
		let numberOfIPs;
		for (let j = 0; j < cidrs.length; j++) {
			let cidr = cidrs[j];
			let cidrParts = cidr.split('/');
			let subnetMask = parseInt(cidrParts[1]);
			numberOfIPs = Math.pow(2, 32 - subnetMask);
			cumulativeIPs += numberOfIPs;

			if (randIndex < cumulativeIPs) {
				selectedCIDR = cidr;
				break;
			}
		}
		if (selectedCIDR) {
			let range = selectedCIDR.split('/');
			let baseIP = range[0];
			let baseIPParts = baseIP.split('.');
			let baseInt = baseIPParts.reduce(function (acc, val) {
				return (acc << 8) + parseInt(val);
			}, 0);
			let randomOffset = Math.floor(Math.random() * numberOfIPs);
			let ipInt = (baseInt + randomOffset) >>> 0;
			ips.add(ipInt);
		}
	}
	return Array.from(ips).map(function (ipInt) {
		return [
			(ipInt >>> 24) & 0xff,
			(ipInt >>> 16) & 0xff,
			(ipInt >>> 8) & 0xff,
			ipInt & 0xff
		].join('.');
	});
}

// 从数组中随机选择n个的元素
function getRandomElementsFromArray(arr, n = 10) {
	// 确保 n 的值在有效范围内
	if (n < 1 || n > arr.length) {
		n = 10; // 设置默认值为 10
	}
	const result = [];
	const arrCopy = arr.slice(); // 创建数组副本以避免修改原数组
	while (result.length < n && arrCopy.length > 0) {
		const randomIndex = Math.floor(Math.random() * arrCopy.length);
		const selectedElement = arrCopy[randomIndex];
		// 检查选取的元素是否已经存在于结果数组中
		if (!result.includes(selectedElement)) {
			result.push(selectedElement);
		}
		arrCopy.splice(randomIndex, 1); // 从副本数组中移除已选择的元素
	}
	return result;
}

// 分割IP和端口
function sliceIPAndPort(ip_with_port) {
	let matches = ip_with_port.match(/^\[?([^\]]+)\]?:([0-9]+)$/);
	if (matches) {
		return [matches[1], parseInt(matches[2])]
	} else {
		return [null, null];
	}
}
