function ping(index) {
	return new Promise(res => {
		setTimeout(res, index * 1000);
	})
}
Promise.some([ping(1), ping(2), ping(3)], 2).spread(function(fir, sec) {
	console.log(fir, sec)
})