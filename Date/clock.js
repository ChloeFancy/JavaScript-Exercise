(function(){
	var days = {
		MON:'星期一',
		TUE:'星期二',
		WEDN:'星期三',
		THU:'星期四',
		FRI:'星期五',
		SAT:'星期六',
		SUN:'星期日'
	};
	var div = document.createElement('div');
	document.body.appendChild(div);
	// var btn = document.getElementById('showtime');

	// btn.onclick = function(){
	// 	var now = new Date();
	// 	var reg = /([A-Za-z]+)\s([A-Za-z]+)\s(\d+)\s+[\w,]+\s+(\d{2}):(\d{2}):(\d{2})/ig;

	// 	var string = now.toString();
	// 	var matches = reg.exec(string);
	// 	div.innerHTML = days[matches[1].toUpperCase()]+" "+matches[4]+':'+matches[5]+":"+matches[6];

	// };
	var div2 = document.createElement('div');
	document.body.appendChild(div2);
	var reg = null;
	setTimeout(function(){
		var now = new Date();
		var string = now.toString();
		reg = /([A-Za-z]+)\s([A-Za-z]+)\s(\d+)\s+[\w,]+\s+(\d{2}):(\d{2}):(\d{2})/ig;
		// 每一次都要创建新的正则表达式实例
		// 如果不每次重新创建实例，该实例的属性不会重置（尤其重要的是lastIndex，表示下一个匹配项的开始搜索位置
		var matches = reg.exec(string);
		// reg.lastIndex=0;
		// 也可以通过是手动调整下一次开始搜索的位置，就不用每一次重新创建实例

		div.innerHTML = days[matches[1].toUpperCase()]+" "+matches[4]+':'+matches[5]+":"+matches[6];

		div2.innerHTML = (now.getDay()+1)+" "+now.getHours()+':'+now.getMinutes()+":"+now.getSeconds();

		// get方法中，星期和月份是从0开始的
		setTimeout(arguments.callee,1000);
	},0);
}());