const a = '好';
const hex = Buffer.from(a).toString('hex');
console.log(Buffer.from(hex, 'hex').length);
console.log(Buffer.byteLength(a, 'hex'))
console.log(hex);
