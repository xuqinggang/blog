//（防抖） 一段时间之内的多次调用只执行一次。每次调用都会重新计时。相当于最后一次调用的time之后执行一次。
function debounce(time, callback) {
	const self = this;
	let timer = null;
	return function() {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(function() {
			callback && callback.apply(self, ...arguments);
		}, time)
	}
}

function test() {
	console.log(2222);
}

window.addEventListener('scroll', debounce(2000, test));

//ERROR!!!!
function errorDebounce(time, callback) {
	const self = this;
	if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(function() {
			callback && callback.apply(self, ...arguments);
		}, time)
}

window.addEventListener('scroll', function() {
	errorDebounce(2000, test);
});
// 以上是ERROR示例，原因：每次scroll否执行一次errDebounce.都是新的作用域。没有共同timer





// 每隔固定时间隔调用一次。 节流
function throttle(time, callback) {
	const self = this;
	let lasttime = Date.now();
	return function() {
		if (Date.now() - lasttime >= time) {
			callback && callback.apply(self, arguments);
			lasttime = Date.now();
		}
	}
}


window.addEventListener('scroll', throttle(2000, test));

















