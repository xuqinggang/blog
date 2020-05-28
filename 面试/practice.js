// 动手练习

// weakmap 私有属性

// promise

// compose

// 中间件机制

// 装饰器

// string replace async
function stringReplaceAsync(str, reg, handler) {
  function matchAll(str, re) {
    var matches = [];
    var res = re.exec(str);

    // NOTICE
    while (res) {
      matches.push(res);

      // NOTICE
      if (!re.global) {
        break;
      }

      res = re.exec(str);
    }

    return matches;
  }

  const matches = matchAll(str, reg);

  const promiseAll = matches.map(match => {
    return handler(...match, match.index, match.input).then(res => {
      // NOTICE
      return Object.assign({}, match, { replacement: res });
    });
  });

  return Promise.all(promiseAll).then(matches => {
    // NOTICE
    return matches.reverse().reduce((resStr, match) => {
      console.log('resStr', resStr, match);
      const prefix = resStr.slice(0, match.index);
      const postfix = resStr.slice(match.index + match[0].length);
      console.log('prefix + match.replacement + postfix', prefix, match.replacement, 'postfix:', postfix)
      return prefix + match.replacement + postfix;
    }, str)
  });
}

(async () => {
  const res = await stringReplaceAsync('1.{{1-123}}x2.{{2-234}}', /\{\{([^{]+)-([^}]+)\}\}/g, async () => {
    return 'test';
  });
  console.log('res', res)
})();

// LRU