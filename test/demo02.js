// 从../src/worker.js迁移到这里

import pako from 'pako'; //  JavaScript 压缩和解压库

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
		// 创建 SnServer 、SnMeta对象并设置属性
		const server = new SnServer('162.159.192.45', 4177);
		const meta = new SnMeta("warp-001");

		// 创建 Wireguard 对象并设置属性
		const wg = new Wireguard(server, // server 和 port
			'sALjsE4FBGPC/GosnaOhFy/+2cog7roA3jN8yC75F3g=', // privateKey
			"172.16.0.2/32,2606:4700:110:8d06:7ef8:cf45:2393:9ac7/128", // localAddress
			'bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=', // peerPublicKey
			"", // peerPreSharedKey
			1280, // mtu
			"QpBX", // reserved
		);

		// 序列化 Wireguard 对象
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

		let sn = `sn://wg?${encodedData}`;

		return new Response(sn);
	},
};


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