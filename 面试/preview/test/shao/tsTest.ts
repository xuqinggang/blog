interface XType {
  a: number;
  b: number;
  c: number;
}

function getProperty(obj: XType, key: keyof XType) {
  return obj[key].toString();
}

let x = { a: 1, b: 2, c: 3, d: 4 };

// getProperty(x, "a");
getProperty(x, "d");