//函数
//函数表达式
//函数声明，特点：声明提升

if(condition){
	function f(){

	}
}else{
	function f(){

	}
}
//无效的语法，因为函数声明会提升，大多数浏览器会声明后一个函数

//递归
function fact(num){
	if(num<=1){
		return 1;
	}else{
		return num*arguments.callee(num-1);
	}
}
//以上的方法，在严格模式下不能通过脚本来访问arguments.callee
var fact = (function f(num){
	if(num<=1){
		return 1;
	}else{
		return num*f(num-1);
	}
});//括号可以省略

//闭包！！！
//自己的理解就是函数的变量对象中包括了不是声明在自身的作用域中的变量

function F(name){
	return function(){
		console.log(name);
	}
}
//一般而言，函数执行完后，其变量对象会被销毁，作用域链会被销毁
//闭包的情况：
//匿名函数的作用域链任然引用外部函数的变凉对象，因此这个变量对象任然在内存中
//直到匿名函数执行完毕后，才会销毁自身的变量对象中以及外部函数的变量对象
//1.闭包会携带其他函数的作用域，因此会占用更多内存
//2.闭包会包含的外部函数变量对象的最终结果，即在外部函数执行完后的结果
function createFunction(){
	var result = new Array();
	for(var i=0;i<10;i++){
		result[i] = (function(num){
			return function(){
				console.log(num);
			}
		})(i);
	}
}
//对于内部匿名函数
//this的情况已经在this.js中说明，它始终引用属性或方法所在的对象（变量对象、作用域）
//类似的，arguments和this相似，引用当前所在函数的参数对象
//3.变量销毁的问题
//
function assignHandler(){
	var element = document.getElementById('ele');
	element.onclick = function(){
		console(element.id);
	}
}
//element引用的对象永远都无法被回收，因为匿名函数一直在啊！！
function assignHandler(){
	var element = document.getElementById('ele');
	var id = element.id;
	element.onclick = function(){
		console.log(id);
	};
	element = null;//解除了对DOM对象的引用
}

//通过函数执行后其变量对象会被销毁的特征，可以模仿块级作用域
(function(){

})();
//括号不能省略，因为function代表了函数声明的开始，而函数声明后面不能直接加括号
//可以减少过多的全局变量
//
(function(){
	var now = new Date();
	console.log(now.getMonth()+1+'.'+now.getDate());
})();
alert(now);//Uncaught ReferenceError: now is not defined

//实现私有变量
function MyObject(){
	var privateVariable = 10;
	function privateFunction(){
		return false;
	}
	this.publicMethod = function(){
		privateVariable++;
		console.log(privateVariable);
		return privateFunction();
	}
}
var o1 = new MyObject();
o1.publicMethod();//11
var o2 = new MyObject();
o2.publicMethod();//11
//privateVaraible是每个对象的私有变量
//不是属性！！属性都是共有的，在全局环境也可以随意访问读写的
//和C++不一样
//公共属性：属性
//私有属性：私有变量

function Person(){
	this.getName = function(){
		return name；
	}
	this.setName = function(n){
		name = n;
	}
}
//两个函数是可以访问私有变量的特权方法
//作为闭包通过作用域链可以访问到name

(function(){
	var name='';
	Person = function(v){
		name = v;
	};
	Person.prototype.getName = function(){
		return name;
	};
	Person.prototype.setName = function(n){
		name = n;
	}
})();
var p1 = new Person('Alice');
var p2 = new Person('Bob');
console.log(p1.getName());//Bob
console.log(p2.getName());//Bob
//两个对象的Name变量都改变的原因是
//调用的方法是原型上的，构造函数中的name来源只有一个，就是匿名函数的name。
//setName方法是原型上的，因此name是同一个name，调用它也会反映在每一个对象上

//而在MyObject函数中，构造函数被调用了两次，在两个作用域的变量对象内，都有privateVariable,
//所以在不同对象中，这个私有变量是独立的
//

var p1 = function(){
	var hobby = new Array();
	hobby.push(new H());
	return {
		getHobby:function(){
			return hobby.length;
		},
		addHobby:function(HH){
			if(HH instanceof H){
				hobby.push(HH);
			}
		}
	}
}();
//这样既可以保证添加新的内容，也可以读取私有变量的情况
//