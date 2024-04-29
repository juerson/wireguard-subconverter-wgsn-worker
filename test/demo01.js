// 使用 Node.js 核心模块中zlib、base64url，在Cloudflare worker中，不支持这些模块

const zlib = require('zlib');
const base64url = require('base64url');

function encodeSnStr(s) {
  if (!s) {
    return Buffer.from([0x81]);
  }
  if (s.length === 1) {
    return Buffer.concat([Buffer.from([0x82]), Buffer.from(s)]);
  }
  let ret = Buffer.from(s);
  ret[ret.length - 1] |= 0x80;
  return ret;
}

function p32(n) {
  let buffer = Buffer.alloc(4);
  buffer.writeUInt32LE(n, 0);
  return buffer;
}

function p8(n) {
  let buffer = Buffer.alloc(1);
  buffer.writeUInt8(n, 0);
  return buffer;
}

class SnBase {
  serialize() {
    let ret = Buffer.alloc(0);
    for (let key in this) {
      if (this.hasOwnProperty(key)) {
        ret = Buffer.concat([ret, this.objSerialize(this[key])]);
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
    return Buffer.alloc(0);
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

class Wgserlize extends SnBase {
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
    let ret = Buffer.alloc(0);
    ret = Buffer.concat([ret, this.objSerialize(this.version)]);
    ret = Buffer.concat([ret, this.objSerialize(this.server)]);
    ret = Buffer.concat([ret, this.objSerialize(this.localAddress)]);
    ret = Buffer.concat([ret, this.objSerialize(this.privateKey)]);
    ret = Buffer.concat([ret, this.objSerialize(this.peerPublicKey)]);
    ret = Buffer.concat([ret, this.objSerialize(this.peerPreSharedKey)]);
    ret = Buffer.concat([ret, this.objSerialize(this.mtu)]);
    ret = Buffer.concat([ret, this.objSerialize(this.reserved)]);
    return ret;
  }
}


// 创建 SnServer 对象并设置属性
const server = new SnServer('162.159.192.45', 4177);
const meta = new SnMeta("warp-001");
// 创建 Wgserlize 对象并设置属性
const wg = new Wgserlize(server,
  'sALjsE4FBGPC/GosnaOhFy/+2cog7roA3jN8yC75F3g=', // privateKey
  "172.16.0.2/32,2606:4700:110:8d06:7ef8:cf45:2393:9ac7/128", // localAddress
  'bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=', // peerPublicKey
  "", // peerPreSharedKey
  1280, // mtu
  "" // reserved
);

// 序列化 Wgserlize 对象
const serializedData = wg.serialize();
const metaSerializedData = meta.serialize();

// 将 serializedData 和 metaSerializedData 转换为 Buffer 对象
const serializedBuffer = Buffer.from(serializedData);
const metaSerializedBuffer = Buffer.from(metaSerializedData);

// 合并两个 Buffer 对象
const combinedBuffer = Buffer.concat([serializedBuffer, metaSerializedBuffer]);

// 使用 zlib 进行压缩
zlib.deflate(combinedBuffer, (err, compressedData) => {
  if (err) {
    console.error('Compression error:', err);
  } else {
    // 使用 base64url 进行 URL 安全的 Base64 编码
    const encodedData = base64url(compressedData);
    console.log(`sn://wg?${encodedData}`);
  }
});