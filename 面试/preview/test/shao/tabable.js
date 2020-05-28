
class SyncHook {
	constructor(){
		this.hooks = [];
	}
	tap(hookname, callback) {
		this.hooks.push(callback);
	}
	call() {
		this.hooks.reduce((res, currFun) => {
			return currFun(res);
		}, this.hooks[0](...arguments));
	}
	tapAync(name, callback) {
		
	}
}

class Compiler {
	constructor() {
			this.hooks = {
				done: new SyncHook(['age']),
		}
	}
}

const compiler = new Compiler();


compiler.hooks.done.tap('myhook', function(age) {
	console.log(age);
	return age;
})

compiler.hooks.done.tap('donehook', function(age) {
	console.log('ddd' + age);
	return age;
})

compiler.hooks.done.call(18);


