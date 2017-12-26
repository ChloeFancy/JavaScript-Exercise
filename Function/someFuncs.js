var concat = function(){
	var arr = Array.prototype.slice.call(arguments);
	return arr.join('');
};
console.log(concat('1','2','3'));
console.log(concat());
console.log(concat('1','csavds','cscsac','56565'));
console.log(concat('I',' ','wish',' ','you',' ','a',' ','merry',' ','Christmas','!'));

var fio = function(n){
	var arr=new Array();
	arr.push(0);
	arr.push(1);
	for(var i=2;i<n;i++){
		arr.push(arr[i-1]+arr[i-2]);
	}
	return arr;
}
console.log(fio(12));

var fio = function(n){
	var arr = new Array();
	for(var i=0;i<n;i++){
			arr.push((function(n) {
				if(n==0){
					return 0;
				}else if(n==1){
					return 1;
				}else{
					var i = arguments.callee(n-1)+arguments.callee(n-2);
					return i;
				}
			})(i));
	}
	return arr;
}
console.log(fio(12));

//
var arr = [2,3,4,[2,3,[2,3,4,666],5],3,5,[2,3,[2,3,4,2],2],4,3,6,2];
var unique = function(arr){
    var result = new Array();
    arr.forEach(
    	function(item){
    		if(item instanceof Array){
    			item.forEach(arguments.callee);
    		}else{
    			if(result.indexOf(item)==-1){
    				result.push(item);
    			}
    		}
    	}
    );
    return result;
};
console.log(unique(arr));
// [2,3,4,666,5,6]
//

// 2017-12-26
// 数组去重
// 挑战一，一维数组
var arr = [2,3,4,2,3,5,6,4,3,2];

var unique_1 = function(arr){
    // 待实现方法体
    var result = new Array();
    arr.forEach(
    	function(item){
    		if(result.indexOf(item)==-1){
    			result.push(item);
    		}
    	}
    );
    return result;
};

var unique_2 = function(arr){
	arr.forEach(
		function(item){
			while(arr.indexOf(item)!=arr.lastIndexOf(item)){
				arr.splice(arr.lastIndexOf(item),1);
			}
		}
	);
	return arr;
};

var unique_3 = function(arr){
	var result = [];
	for(var i=0,l=arr.length;i<l;i++){
		for(var j=i+1;j<l;j++){
			if(arr[i]==arr[j]) j=++i;
			//后面还有和当前重复的数字，所以就跳过它
		}
		result.push(arr[i]);
	}
	return result;
};

var unique_4 = function(arr){
	arr.sort();
	var result=[arr[0]];
	for(var i=0;i<arr.length;i++){
		var l = result.length;
		if(arr[i]!=result[l-1])
			result[l]=arr[i];
	}
	return result;
};

console.log(unique_4(arr));
console.log(unique(arr)); // [2,3,4,5,6]
// 挑战二，二维数组
var arr = [2,3,4,[2,3,4,5],3,5,[2,3,4,2],4,3,6,2];
var unique = function(arr){
	var result=[];
    arr.forEach(function (item) {
    	// body...
    	if(item instanceof Array){
    		result.concat(unique_4(item))
    	}else{
    		if(result.indexOf(item)==-1){
    			result.push(item);
    		}
    	}
    })
    return result;
};
console.log(unique(arr)); // [2,3,4,5,6]
// 挑战三，三维数组或 n 维数组
var arr = [2,3,4,[2,3,[2,3,666,2],5],3,5,[2,3,[2,3,4,2],2],4,3,6,2];
var unique = function(arr){
    // 待实现方法体
}
console.log(unique(arr)); // [2,3,4,5,6]

//多维数组降维
//通过concat方法可以降一维
//因为concat既可以连接数字，也可以连接数组
function f(arr) {
	// body...
	var args = Array.prototype.concat.apply([],arguments);
	console.log(args);
}
f.apply(null,arr);

function dec(arr){
	var result = [];
	arr.forEach(function(item){
	//匿名函数定义在dec的作用域，因此可以访问result
	//神奇的闭包
		if(item instanceof Array){
			item.forEach(arguments.callee);
		}else{
			result.push(item);
		}
	});
	return result;
}
console.log(dec(arr));

function dec(arr){
	var result = [];
	var tmp = function(item){
		if(item instanceof Array){
			item.forEach(arguments.callee);
		}else{
			result.push(item);
		}
	};
	arr.forEach(tmp);
	return result;
}
console.log(dec(arr));

//栈方法
//pass by reference
//因为stack是arr的地址，应用了pop方法后，所以arr的值被修改了
var arr = [2,3,4,[2,3,[2,3,666,2],5],3,5,[2,3,[2,3,4,2],2],4,3,6,2];
console.log(arr);
function dec_1(arrr){
	var result = [];
	var stack = arrr;
	while(stack.length!=0){
		var t = stack.pop();
		if(Array.isArray(t)){
			stack = stack.concat(t);
			console.log(arr);
			console.log(stack);
		}else{
			result.unshift(t);
		}

	}
	return result;
}
console.log(dec_1(arr));
console.log(arr);
// (11) [2, 3, 4, Array(4), 3, 5, Array(4), 4, 3, 6, 2]
// VM227424:10 (6) [2, 3, 4, Array(4), 3, 5]
// VM227424:11 (10) [2, 3, 4, Array(4), 3, 5, 2, 3, Array(4), 2]
// VM227424:10 (6) [2, 3, 4, Array(4), 3, 5]
// VM227424:11 (12) [2, 3, 4, Array(4), 3, 5, 2, 3, 2, 3, 4, 2]
// VM227424:10 (6) [2, 3, 4, Array(4), 3, 5]
// VM227424:11 (7) [2, 3, 4, 2, 3, Array(4), 5]
// VM227424:10 (6) [2, 3, 4, Array(4), 3, 5]
// VM227424:11 (9) [2, 3, 4, 2, 3, 2, 3, 666, 2]
// VM227424:19 (23) [2, 3, 4, 2, 3, 2, 3, 666, 2, 5, 3, 5, 2, 3, 2, 3, 4, 2, 2, 4, 3, 6, 2]
// VM227424:20 (6) [2, 3, 4, Array(4), 3, 5]
//以上结果的分析：
//arr最开始将其地址赋值给arrr
//然后arrr赋值给stack
//stack开始进行pop操作，会影响此地址所指向的数组
//直到出栈了第一个数组后
//stack被重新赋值了一个数组的引用
//这个数组是stack.concat(t),stack不再指向原数组
//因此原数组也不会再变化了
//pass by value
var a=1;
function f(num){
	num=0;
}
f();
console.log(a);

function dec_2(arrr){
	var result = [];
	//stack指向和arrr一样的一个数组
	var stack = arrr.slice(0,arrr.length);
	while(stack.length!=0){
		var t = stack.pop();
		if(Array.isArray(t)){
			stack = stack.concat(t);
		}else{
			result.unshift(t);
		}
	}
	return result;
}
console.log(dec_2(arr));
console.log(arr);
// (23) [2, 3, 4, 2, 3, 2, 3, 666, 2, 5, 3, 5, 2, 3, 2, 3, 4, 2, 2, 4, 3, 6, 2]
// VM229007:18 (11) [2, 3, 4, Array(4), 3, 5, Array(4), 4, 3, 6, 2]
//arr的值没有变化
